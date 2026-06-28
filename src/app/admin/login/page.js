'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Loader2, Lock, Mail, Eye, EyeOff } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError('Invalid email or password.')
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-green-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl p-2 mb-4 shadow-xl">
            <Image src="/logo.jpg" alt="Victoria Sugar" width={64} height={64} className="object-contain" />
          </div>
          <h1 className="font-heading font-bold text-white text-2xl">Victoria Sugar Limited</h1>
          <p className="text-green-300 text-sm mt-1">Admin Panel</p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="font-heading font-bold text-xl text-green-800 mb-6">Sign In</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="form-label">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  required className="form-input pl-10" placeholder="admin@victoriasugar.com"
                />
              </div>
            </div>
            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPwd ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                  required className="form-input pl-10 pr-10" placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">{error}</div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
              {loading ? <><Loader2 size={18} className="animate-spin" /> Signing in...</> : 'Sign In to Admin Panel'}
            </button>
          </form>
        </div>

        <p className="text-center text-green-400 text-xs mt-6">
          © {new Date().getFullYear()} Victoria Sugar Limited. Authorised personnel only.
        </p>
      </div>
    </div>
  )
}
