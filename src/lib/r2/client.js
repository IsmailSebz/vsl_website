/**
 * Native AWS Signature V4 implementation for Cloudflare R2 (S3-compatible).
 * Uses only Web Crypto API — works in Cloudflare Workers Edge Runtime.
 * No AWS SDK required.
 */

const enc = new TextEncoder()

async function hmac(key, msg) {
  const raw = key instanceof ArrayBuffer || ArrayBuffer.isView(key) ? key : enc.encode(key)
  const cryptoKey = await crypto.subtle.importKey(
    'raw', raw, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  )
  return crypto.subtle.sign('HMAC', cryptoKey, enc.encode(msg))
}

function hex(buf) {
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('')
}

async function sha256hex(msg) {
  return hex(await crypto.subtle.digest('SHA-256', enc.encode(msg)))
}

async function signingKey(secret, date, region, service) {
  let key = await hmac(`AWS4${secret}`, date)
  key = await hmac(key, region)
  key = await hmac(key, service)
  return hmac(key, 'aws4_request')
}

function nowStamps() {
  const d = new Date()
  const dt = d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
  return { date: dt.slice(0, 8), datetime: dt }  // e.g. "20240101", "20240101T120000Z"
}

function encodePath(key) {
  return key.split('/').map(encodeURIComponent).join('/')
}

const REGION = 'auto'
const SERVICE = 's3'

/**
 * Generate a presigned PUT URL for direct browser-to-R2 upload.
 */
export async function getPresignedUploadUrl(key, contentType, expiresIn = 900) {
  const endpoint = process.env.R2_ENDPOINT
  const bucket   = process.env.R2_BUCKET_NAME
  const accessId = process.env.R2_ACCESS_KEY_ID
  const secret   = process.env.R2_SECRET_ACCESS_KEY
  const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL

  const { date, datetime } = nowStamps()
  const host = new URL(endpoint).host
  const path = `/${bucket}/${encodePath(key)}`
  const credScope = `${date}/${REGION}/${SERVICE}/aws4_request`

  // Query string params (must be sorted lexicographically)
  const qpairs = [
    ['X-Amz-Algorithm',     'AWS4-HMAC-SHA256'],
    ['X-Amz-Content-Sha256','UNSIGNED-PAYLOAD'],
    ['X-Amz-Credential',    `${accessId}/${credScope}`],
    ['X-Amz-Date',          datetime],
    ['X-Amz-Expires',       String(expiresIn)],
    ['X-Amz-SignedHeaders',  'host'],
  ].sort(([a], [b]) => (a < b ? -1 : 1))

  const qs = qpairs.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&')

  const canonicalReq = ['PUT', path, qs, `host:${host}\n`, 'host', 'UNSIGNED-PAYLOAD'].join('\n')
  const reqHash  = await sha256hex(canonicalReq)
  const sts      = ['AWS4-HMAC-SHA256', datetime, credScope, reqHash].join('\n')
  const sk       = await signingKey(secret, date, REGION, SERVICE)
  const sig      = hex(await hmac(sk, sts))

  return {
    uploadUrl: `${endpoint}/${bucket}/${encodePath(key)}?${qs}&X-Amz-Signature=${sig}`,
    publicUrl: `${mediaUrl}/${key}`,
  }
}

/**
 * Delete an object from R2.
 */
export async function deleteObject(key) {
  const endpoint = process.env.R2_ENDPOINT
  const bucket   = process.env.R2_BUCKET_NAME
  const accessId = process.env.R2_ACCESS_KEY_ID
  const secret   = process.env.R2_SECRET_ACCESS_KEY

  const { date, datetime } = nowStamps()
  const host = new URL(endpoint).host
  const path = `/${bucket}/${encodePath(key)}`
  const emptyHash = await sha256hex('')
  const credScope = `${date}/${REGION}/${SERVICE}/aws4_request`

  const canonHeaders  = `host:${host}\nx-amz-content-sha256:${emptyHash}\nx-amz-date:${datetime}\n`
  const signedHeaders = 'host;x-amz-content-sha256;x-amz-date'
  const canonReq = ['DELETE', path, '', canonHeaders, signedHeaders, emptyHash].join('\n')

  const reqHash = await sha256hex(canonReq)
  const sts     = ['AWS4-HMAC-SHA256', datetime, credScope, reqHash].join('\n')
  const sk      = await signingKey(secret, date, REGION, SERVICE)
  const sig     = hex(await hmac(sk, sts))

  const auth = `AWS4-HMAC-SHA256 Credential=${accessId}/${credScope}, SignedHeaders=${signedHeaders}, Signature=${sig}`

  await fetch(`${endpoint}/${bucket}/${encodePath(key)}`, {
    method: 'DELETE',
    headers: {
      Authorization:           auth,
      'x-amz-content-sha256': emptyHash,
      'x-amz-date':           datetime,
    },
  })
}

/**
 * Derive the R2 key from a full media URL.
 */
export function urlToKey(url) {
  return url.replace(`${process.env.NEXT_PUBLIC_MEDIA_URL}/`, '')
}
