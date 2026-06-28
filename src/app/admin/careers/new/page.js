'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Save, Loader2 } from 'lucide-react'

const DEPARTMENTS = ['Operations', 'Finance', 'HR', 'Engineering', 'IT', 'Marketing', 'Agricultural', 'Security', 'Administration']
const TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship']

export default function NewCareerPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '', department: DEPARTMENTS[0], employment_type: TYPES[0],
    location: 'Kakira, Jinja', description: '', requirements: '',
    deadline: '', status: 'active',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) { setError('Title required.'); return }
    setSaving(true)
    const supabase = createClient()
    const { error: err } = await supabase.from('careers').insert({
      ...form,
      deadline: form.deadline || null,
    })
    if (err) { setError(err.message); setSaving(false); return }
    router.push('/admin/careers')
    router.refresh()
  }

  return (
    <div className="max-w-2xl">
      <h2 className="font-heading font-bold text-2xl text-gray-800 mb-6">Post Job Opening</h2>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-5">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
        <div>
          <label className="form-label">Job Title *</label>
          <input value={form.title} onChange={(e) => set('title', e.target.value)} className="form-input" placeholder="e.g. Senior Chemical Engineer" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Department</label>
            <select value={form.department} onChange={(e) => set('department', e.target.value)} className="form-input">
              {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="form-label">Employment Type</label>
            <select value={form.employment_type} onChange={(e) => set('employment_type', e.target.value)} className="form-input">
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Location</label>
            <input value={form.location} onChange={(e) => set('location', e.target.value)} className="form-input" />
          </div>
          <div>
            <label className="form-label">Application Deadline</label>
            <input type="date" value={form.deadline} onChange={(e) => set('deadline', e.target.value)} className="form-input" />
          </div>
        </div>
        <div>
          <label className="form-label">Job Description</label>
          <textarea value={form.description} onChange={(e) => set('description', e.target.value)} className="form-input resize-none" rows={5} placeholder="Describe responsibilities and role…" />
        </div>
        <div>
          <label className="form-label">Requirements</label>
          <textarea value={form.requirements} onChange={(e) => set('requirements', e.target.value)} className="form-input resize-none" rows={4} placeholder="Qualifications, experience, skills…" />
        </div>
        <div>
          <label className="form-label">Status</label>
          <select value={form.status} onChange={(e) => set('status', e.target.value)} className="form-input">
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center gap-2">
            {saving ? <><Loader2 size={16} className="animate-spin" /> Saving…</> : <><Save size={16} /> Post Job</>}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-secondary flex-1 justify-center">Cancel</button>
        </div>
      </form>
    </div>
  )
}
