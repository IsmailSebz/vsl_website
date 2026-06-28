'use client'
import { useState, useEffect } from 'react'
import { X, Send, CheckCircle, Loader2 } from 'lucide-react'

const inquiryTypes = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'bulk_order', label: 'Bulk / Industrial Order' },
  { value: 'export', label: 'Export Inquiry' },
  { value: 'outgrower', label: 'Outgrower Programme' },
  { value: 'career', label: 'Careers' },
  { value: 'tender', label: 'Tenders & Procurement' },
]

const initialForm = {
  name: '', email: '', phone: '', subject: '', message: '', inquiryType: 'general',
}

export default function InquiryModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const open = () => setIsOpen(true)
    window.addEventListener('open-inquiry-modal', open)
    return () => window.removeEventListener('open-inquiry-modal', open)
  }, [])

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setStatus('success')
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => setStatus('idle'), 300)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-green-700 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="font-heading font-bold text-lg">Send an Inquiry</h2>
            <p className="text-green-200 text-sm">We'll respond within 24 hours</p>
          </div>
          <button onClick={handleClose} className="p-1.5 hover:bg-green-600 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-10">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="font-heading font-bold text-xl text-green-800 mb-2">Inquiry Sent!</h3>
              <p className="text-gray-500 mb-6">
                Thank you, <strong>{form.name || 'there'}</strong>. We've received your message and will
                get back to you at <strong>{form.email}</strong> within 24 hours.
              </p>
              <button onClick={handleClose} className="btn-primary">Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Inquiry type */}
              <div>
                <label className="form-label">Inquiry Type</label>
                <select name="inquiryType" value={form.inquiryType} onChange={handleChange} className="form-input">
                  {inquiryTypes.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Full Name *</label>
                  <input
                    name="name" value={form.name} onChange={handleChange}
                    required placeholder="Your full name"
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange}
                    required placeholder="your@email.com"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Phone + Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Phone Number</label>
                  <input
                    name="phone" value={form.phone} onChange={handleChange}
                    placeholder="+256 700 000 000"
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Subject</label>
                  <input
                    name="subject" value={form.subject} onChange={handleChange}
                    placeholder="Brief subject"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="form-label">Message *</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  required rows={5} placeholder="Tell us about your inquiry..."
                  className="form-input resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full justify-center"
              >
                {status === 'loading' ? (
                  <><Loader2 size={18} className="animate-spin" /> Sending...</>
                ) : (
                  <><Send size={18} /> Send Inquiry</>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center">
                Your inquiry will be emailed to info@victoriasugar.com
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
