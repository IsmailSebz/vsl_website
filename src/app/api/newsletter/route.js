export const runtime = 'edge'
import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request) {
  try {
    const { email } = await request.json()
    if (!email) return NextResponse.json({ error: 'Email is required.' }, { status: 400 })

    const supabase = createServiceClient()
    const { error } = await supabase.from('newsletter_subscribers').insert({ email })

    if (error?.code === '23505') {
      return NextResponse.json({ success: true, existing: true })
    }
    if (error) throw new Error(error.message)

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
