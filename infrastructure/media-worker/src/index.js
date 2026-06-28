/**
 * Victoria Sugar Limited — Media Worker
 * Sits in front of the vsl-media R2 bucket at media.victoriasugar.ug
 *
 * Responsibilities:
 *  - CORS preflight + response headers for cross-origin image/video embedding
 *  - Range request support for video streaming (seek without full download)
 *  - Aggressive cache headers (images/videos are immutable once uploaded)
 *  - Content-Type inference from file extension
 *  - 404 passthrough for missing assets
 *  - Extensible: add image resizing via Cloudflare Images API in future
 */

// Origins allowed to embed or upload media cross-origin
const ALLOWED_ORIGINS = new Set([
  "https://victoriasugar.ug",
  "https://www.victoriasugar.ug",
  "https://admin.victoriasugar.ug",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
]);

// Map file extensions to MIME types
const MIME_TYPES = {
  // Images
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  JPG: "image/jpeg",
  JPEG: "image/jpeg",
  png: "image/png",
  PNG: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
  avif: "image/avif",
  // Videos
  mp4: "video/mp4",
  MP4: "video/mp4",
  mov: "video/quicktime",
  MOV: "video/quicktime",
  webm: "video/webm",
  avi: "video/x-msvideo",
  // Documents
  pdf: "application/pdf",
  // Default
  default: "application/octet-stream",
};

/**
 * Build CORS headers.
 * Always returns the headers object; Access-Control-Allow-Origin is set
 * only when the request origin is in the allow-list (or for same-origin).
 */
function buildCorsHeaders(requestOrigin) {
  const headers = {
    "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
    "Access-Control-Allow-Headers": "Range, Content-Type, Authorization",
    "Access-Control-Expose-Headers":
      "Content-Length, Content-Range, Accept-Ranges, ETag, Last-Modified",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };

  if (requestOrigin && ALLOWED_ORIGINS.has(requestOrigin)) {
    headers["Access-Control-Allow-Origin"] = requestOrigin;
  } else if (!requestOrigin) {
    // Same-origin or direct browser navigation — open read access
    headers["Access-Control-Allow-Origin"] = "*";
  }
  // Unknown origin: no ACAO header — browser blocks the cross-origin read

  return headers;
}

/**
 * Infer MIME type from the file path extension.
 */
function getMimeType(key) {
  const ext = key.split(".").pop() || "";
  return MIME_TYPES[ext] || MIME_TYPES.default;
}

/**
 * Determine if the asset is a video (needs range support + different caching).
 */
function isVideo(key) {
  const ext = (key.split(".").pop() || "").toLowerCase();
  return ["mp4", "mov", "webm", "avi", "mkv"].includes(ext);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");
    const corsHeaders = buildCorsHeaders(origin);

    // ── 1. CORS preflight ────────────────────────────────────────────────────
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    // ── 2. Only GET and HEAD are allowed for media ───────────────────────────
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { ...corsHeaders, Allow: "GET, HEAD, OPTIONS" },
      });
    }

    // ── 3. Build R2 object key from URL path ─────────────────────────────────
    // Strip leading slash: /images/photo.jpg → images/photo.jpg
    const key = url.pathname.replace(/^\//, "");

    if (!key) {
      return new Response("Not Found", { status: 404, headers: corsHeaders });
    }

    // ── 4. Fetch object from R2, passing Range header for video streaming ─────
    const rangeHeader = request.headers.get("Range");
    let object;

    try {
      if (rangeHeader) {
        // Parse the Range header so R2 returns only the requested byte range
        object = await env.MEDIA_BUCKET.get(key, {
          range: request.headers,
        });
      } else {
        object = await env.MEDIA_BUCKET.get(key);
      }
    } catch (err) {
      console.error(`R2 fetch error for key "${key}":`, err);
      return new Response("Internal Server Error", {
        status: 500,
        headers: corsHeaders,
      });
    }

    if (!object) {
      return new Response("Not Found", { status: 404, headers: corsHeaders });
    }

    // ── 5. Build response headers ────────────────────────────────────────────
    const responseHeaders = new Headers(corsHeaders);

    // Write R2 metadata (ETag, Last-Modified, custom metadata)
    object.writeHttpMetadata(responseHeaders);

    // Content-Type: prefer R2-stored type, fall back to extension inference
    if (!responseHeaders.has("Content-Type")) {
      responseHeaders.set("Content-Type", getMimeType(key));
    }

    // ETag for conditional requests
    responseHeaders.set("ETag", object.httpEtag);

    // Accept-Ranges: always advertise so video players know they can seek
    responseHeaders.set("Accept-Ranges", "bytes");

    // Cache strategy:
    //  - Images/videos are content-addressed (name changes on re-upload),
    //    so we cache aggressively with immutable.
    //  - Cloudflare edge cache TTL: 1 year
    //  - Browser cache TTL: 1 year
    if (isVideo(key)) {
      // Videos: immutable, but allow stale-while-revalidate for edge
      responseHeaders.set(
        "Cache-Control",
        "public, max-age=31536000, immutable, stale-while-revalidate=86400"
      );
    } else {
      // Images and documents
      responseHeaders.set(
        "Cache-Control",
        "public, max-age=31536000, immutable"
      );
    }

    // Content-Range and Content-Length for range responses
    if (object.range) {
      const { offset = 0, length } = object.range;
      const total = object.size;
      const end = offset + length - 1;
      responseHeaders.set("Content-Range", `bytes ${offset}-${end}/${total}`);
      responseHeaders.set("Content-Length", String(length));
    } else {
      responseHeaders.set("Content-Length", String(object.size));
    }

    // ── 6. Return response ───────────────────────────────────────────────────
    const status = object.range ? 206 : 200;

    // HEAD requests: no body
    if (request.method === "HEAD") {
      return new Response(null, { status, headers: responseHeaders });
    }

    return new Response(object.body, { status, headers: responseHeaders });
  },
};
