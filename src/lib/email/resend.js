// Email sending via Resend
// Add RESEND_API_KEY to .env.local when ready

/**
 * Send the contact/inquiry form email to info@victoriasugar.com
 * and save to Supabase inquiries table.
 */
export async function sendInquiryEmail({ name, email, phone, subject, message, inquiryType }) {
  const apiKey = process.env.RESEND_API_KEY

  // If no real API key yet, log and return success (dev mode)
  if (!apiKey || apiKey.startsWith('re_placeholder')) {
    console.log('[Email dev mode] Would send inquiry email:', { name, email, subject })
    return { success: true, dev: true }
  }

  const { Resend } = await import('resend')
  const resend = new Resend(apiKey)

  const { data, error } = await resend.emails.send({
    from: 'Victoria Sugar Website <noreply@victoriasugar.ug>',
    to: [process.env.CONTACT_EMAIL],
    replyTo: email,
    subject: `[Website Inquiry] ${subject || 'New Inquiry'} — ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1b5e20; padding: 20px; text-align: center;">
          <h1 style="color: #c8a84b; margin: 0;">Victoria Sugar Limited</h1>
          <p style="color: #fff; margin: 5px 0 0;">New Website Inquiry</p>
        </div>
        <div style="padding: 30px; background: #fff; border: 1px solid #e0e0e0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 120px;"><strong>Name:</strong></td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td><td style="padding: 8px 0;">${phone}</td></tr>` : ''}
            ${subject ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Subject:</strong></td><td style="padding: 8px 0;">${subject}</td></tr>` : ''}
            ${inquiryType ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Type:</strong></td><td style="padding: 8px 0; text-transform: capitalize;">${inquiryType.replace('_', ' ')}</td></tr>` : ''}
          </table>
          <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
          <h3 style="color: #1b5e20; margin-top: 0;">Message</h3>
          <p style="line-height: 1.6; color: #333;">${message.replace(/\n/g, '<br>')}</p>
        </div>
        <div style="padding: 15px; background: #f5f5f5; text-align: center; font-size: 12px; color: #999;">
          Sent from victoriasugar.ug contact form
        </div>
      </div>
    `,
  })

  if (error) throw new Error(error.message)
  return { success: true, id: data.id }
}
