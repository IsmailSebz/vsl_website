'use client'
import { useState } from 'react'
import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
import { Send, CheckCircle, Loader2 } from 'lucide-react'

export default function FeedbackPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '', subject: 'Feedback' })
  const [status, setStatus] = useState('idle')
  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
  const handleSubmit = async (e) => {
    e.preventDefault(); setStatus('loading')
    try {
      const res = await fetch('/api/inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, inquiryType: 'general' }) })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch { setStatus('error') }
  }
  return (
    <PublicLayout>
      <PageHero title="Feedback" subtitle="Share your thoughts, suggestions, or concerns with us." breadcrumb="Home / Feedback" />
      <section className="section bg-white">
        <div className="container-main max-w-xl">
          {status === 'success' ? (
            <div className="text-center py-16"><CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" /><h3 className="font-heading font-bold text-2xl text-green-800 mb-2">Thank You!</h3><p className="text-gray-500">Your feedback has been received.</p></div>
          ) : (
            <form onSubmit={handleSubmit} className="card p-8 space-y-4">
              <div><label className="form-label">Name</label><input name="name" value={form.name} onChange={handleChange} className="form-input" placeholder="Your name" /></div>
              <div><label className="form-label">Email</label><input type="email" name="email" value={form.email} onChange={handleChange} className="form-input" placeholder="your@email.com" /></div>
              <div><label className="form-label">Your Feedback *</label><textarea name="message" value={form.message} onChange={handleChange} required rows={6} className="form-input resize-none" placeholder="Share your feedback, suggestions or concerns..." /></div>
              {status === 'error' && <p className="text-red-500 text-sm">Failed to submit. Please try again.</p>}
              <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center">
                {status === 'loading' ? <><Loader2 size={18} className="animate-spin" /> Submitting...</> : <><Send size={18} /> Submit Feedback</>}
              </button>
            </form>
          )}
        </div>
      </section>
    </PublicLayout>
  )
}
