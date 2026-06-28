'use client'
import { useState } from 'react'
import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
import { Phone, Mail, MapPin, Clock, Send, Loader2, CheckCircle } from 'lucide-react'

const inquiryTypes = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'bulk_order', label: 'Bulk / Industrial Order' },
  { value: 'export', label: 'Export Inquiry' },
  { value: 'outgrower', label: 'Outgrower Programme' },
  { value: 'career', label: 'Careers' },
  { value: 'tender', label: 'Tenders & Procurement' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '', inquiryType: 'general' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', phone: '', subject: '', message: '', inquiryType: 'general' })
    } catch { setStatus('error') }
  }

  return (
    <PublicLayout>
      <PageHero title="Contact Us" subtitle="We'd love to hear from you. Reach out through any of our contact channels." breadcrumb="Home / Contact Us" />

      <section className="section bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <p className="section-label">Get in Touch</p>
                <h2 className="section-title">We're Here to Help</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Whether you have a product inquiry, business opportunity, or general question — our team is ready to assist.
                </p>
              </div>

              {[
                { icon: MapPin, label: 'Head Office', value: 'P.O. Box 1, Kakira, Jinja, Uganda' },
                { icon: Phone, label: 'Phone', value: '+256 781 989 621' },
                { icon: Mail, label: 'Email', value: 'info@victoriasugar.com' },
                { icon: Clock, label: 'Office Hours', value: 'Monday – Friday: 8:00 AM – 5:00 PM' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</div>
                    <div className="text-gray-700 text-sm mt-0.5">{value}</div>
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/256781989621"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366] text-white rounded-xl px-5 py-4 font-semibold hover:bg-[#20b858] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              <div className="card p-8">
                <h3 className="font-heading font-bold text-xl text-green-800 mb-6">Send Us a Message</h3>

                {status === 'success' ? (
                  <div className="text-center py-10">
                    <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
                    <h4 className="font-heading font-bold text-xl text-green-800 mb-2">Message Sent!</h4>
                    <p className="text-gray-500">Thank you. We'll get back to you within 24 hours.</p>
                    <button onClick={() => setStatus('idle')} className="btn-secondary mt-6">Send Another Message</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="form-label">Inquiry Type</label>
                      <select name="inquiryType" value={form.inquiryType} onChange={handleChange} className="form-input">
                        {inquiryTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Full Name *</label>
                        <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className="form-input" />
                      </div>
                      <div>
                        <label className="form-label">Email *</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className="form-input" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Phone</label>
                        <input name="phone" value={form.phone} onChange={handleChange} placeholder="+256 700 000 000" className="form-input" />
                      </div>
                      <div>
                        <label className="form-label">Subject</label>
                        <input name="subject" value={form.subject} onChange={handleChange} placeholder="Brief subject" className="form-input" />
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Message *</label>
                      <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us more..." className="form-input resize-none" />
                    </div>
                    {status === 'error' && <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>}
                    <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center">
                      {status === 'loading' ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : <><Send size={18} /> Send Message</>}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
