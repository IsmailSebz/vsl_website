export const runtime = 'edge'
import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendInquiryEmail } from '@/lib/email/resend'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message, inquiryType } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 })
    }

    // Save to Supabase
    const supabase = createServiceClient()
    const { error: dbError } = await supabase.from('inquiries').insert({
      name, email, phone, subject, message,
      inquiry_type: inquiryType || 'general',
    })
    if (dbError) throw new Error(dbError.message)

    // Send email
    await sendInquiryEmail({ name, email, phone, subject, message, inquiryType })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Inquiry error:', err)
    return NextResponse.json({ error: err.message || 'Failed to send inquiry.' }, { status: 500 })
  }
}
