'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Save, Loader2, Eye, EyeOff, CheckCircle } from 'lucide-react'

export default function AdminSettingsPage() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [show, setShow] = useState({ current: false, new: false, confirm: false })
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  const toggle = (k) => setShow((s) => ({ ...s, [k]: !s[k] }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (form.newPassword.length < 8) { setError('New password must be at least 8 characters.'); return }
    if (form.newPassword !== form.confirmPassword) { setError('New passwords do not match.'); return }

    setSaving(true)
    const supabase = createClient()

    // Re-authenticate with current password first
    const { data: { user } } = await supabase.auth.getUser()
    const { error: signInErr } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: form.currentPassword,
    })
    if (signInErr) { setError('Current password is incorrect.'); setSaving(false); return }

    const { error: updateErr } = await supabase.auth.updateUser({ password: form.newPassword })
    if (updateErr) { setError(updateErr.message); setSaving(false); return }

    setSuccess(true)
    setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setSaving(false)
  }

  const PasswordInput = ({ field, label, showKey }) => (
    <div>
      <label className="form-label">{label}</label>
      <div className="relative">
        <input
          type={show[showKey] ? 'text' : 'password'}
          value={form[field]}
          onChange={(e) => set(field, e.target.value)}
          className="form-input pr-10"
          required
        />
        <button type="button" onClick={() => toggle(showKey)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          {show[showKey] ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  )

  return (
    <div className="max-w-md">
      <h2 className="font-heading font-bold text-2xl text-gray-800 mb-6">Settings</h2>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-semibold text-gray-800 mb-5">Change Password</h3>

        {success && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm mb-5">
            <CheckCircle size={16} /> Password updated successfully.
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-5">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <PasswordInput field="currentPassword" label="Current Password" showKey="current" />
          <PasswordInput field="newPassword" label="New Password" showKey="new" />
          <PasswordInput field="confirmPassword" label="Confirm New Password" showKey="confirm" />

          <button type="submit" disabled={saving} className="btn-primary w-full justify-center gap-2 mt-2">
            {saving ? <><Loader2 size={16} className="animate-spin" /> Updating…</> : <><Save size={16} /> Update Password</>}
          </button>
        </form>
      </div>
    </div>
  )
}
