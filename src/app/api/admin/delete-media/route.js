import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { deleteObject, urlToKey } from '@/lib/r2/client'

export async function POST(request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { url } = await request.json()
  if (!url) return NextResponse.json({ error: 'Missing url' }, { status: 400 })

  const key = urlToKey(url)
  await deleteObject(key)
  return NextResponse.json({ ok: true })
}
