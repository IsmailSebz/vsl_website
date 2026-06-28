export const runtime = 'edge'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getPresignedUploadUrl } from '@/lib/r2/client'

export async function POST(request) {
  // Verify admin session
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { key, contentType } = await request.json()
  if (!key || !contentType) {
    return NextResponse.json({ error: 'Missing key or contentType' }, { status: 400 })
  }

  // Scope allowed keys to safe prefixes
  const allowed = ['images/', 'videos/', 'documents/', 'covers/']
  if (!allowed.some((p) => key.startsWith(p))) {
    return NextResponse.json({ error: 'Invalid key prefix' }, { status: 400 })
  }

  const { uploadUrl, publicUrl } = await getPresignedUploadUrl(key, contentType)
  return NextResponse.json({ uploadUrl, publicUrl })
}
