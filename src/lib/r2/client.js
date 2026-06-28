import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
})

const BUCKET = process.env.R2_BUCKET_NAME
const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL

/**
 * Generate a presigned PUT URL for direct browser-to-R2 upload.
 * @param {string} key  - e.g. "images/photo.jpg" or "videos/clip.mp4"
 * @param {string} contentType - MIME type
 * @param {number} expiresIn - seconds (default 15 min)
 */
export async function getPresignedUploadUrl(key, contentType, expiresIn = 900) {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
  })
  const url = await getSignedUrl(r2Client, command, { expiresIn })
  return { uploadUrl: url, publicUrl: `${MEDIA_URL}/${key}` }
}

/**
 * Delete an object from R2.
 * @param {string} key - e.g. "images/photo.jpg"
 */
export async function deleteObject(key) {
  await r2Client.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }))
}

/**
 * Derive the R2 key from a full media URL.
 * "https://media.victoriasugar.ug/images/photo.jpg" → "images/photo.jpg"
 */
export function urlToKey(url) {
  return url.replace(`${MEDIA_URL}/`, '')
}

export { r2Client }
