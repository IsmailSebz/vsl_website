'use client'
import { useState } from 'react'
import { Mail, CheckCircle, Loader2 } from 'lucide-react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section-sm bg-green-700">
      <div className="container-main text-center">
        <div className="max-w-lg mx-auto">
          <Mail size={36} className="text-gold-400 mx-auto mb-4" />
          <h2 className="font-heading font-bold text-white text-2xl md:text-3xl mb-3">
            Stay Informed
          </h2>
          <p className="text-green-200 mb-8">
            Subscribe to our newsletter for the latest news, product updates, and insights from Victoria Sugar Limited.
          </p>

          {status === 'success' ? (
            <div className="flex items-center justify-center gap-2 text-gold-400 font-semibold">
              <CheckCircle size={20} /> Thank you for subscribing!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-gold px-6 py-3 justify-center whitespace-nowrap"
              >
                {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : 'Subscribe'}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p className="text-red-300 text-sm mt-3">Something went wrong. Please try again.</p>
          )}
        </div>
      </div>
    </section>
  )
}
