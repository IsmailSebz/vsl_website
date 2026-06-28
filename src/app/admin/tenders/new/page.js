'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Save, Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
const MediaUploader = dynamic(() => import('@/components/admin/MediaUploader'), { ssr: false })

export default function NewTenderPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '', description: '', reference_number: '',
    closing_date: '', status: 'open', document_url: '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) { setError('Title required.'); return }
    setSaving(true)
    const supabase = createClient()
    const { error: err } = await supabase.from('tenders').insert({
      ...form,
      closing_date: form.closing_date || null,
      document_url: form.document_url || null,
    })
    if (err) { setError(err.message); setSaving(false); return }
    router.push('/admin/tenders')
    router.refresh()
  }

  return (
    <div className="max-w-2xl">
      <h2 className="font-heading font-bold text-2xl text-gray-800 mb-6">Post Tender</h2>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-5">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
        <div>
          <label className="form-label">Title *</label>
          <input value={form.title} onChange={(e) => set('title', e.target.value)} className="form-input" placeholder="Supply of laboratory equipment" required />
        </div>
        <div>
          <label className="form-label">Reference Number</label>
          <input value={form.reference_number} onChange={(e) => set('reference_number', e.target.value)} className="form-input" placeholder="VSL/PROC/2024/001" />
        </div>
        <div>
          <label className="form-label">Description</label>
          <textarea value={form.description} onChange={(e) => set('description', e.target.value)} className="form-input resize-none" rows={4} placeholder="Tender details and requirements…" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Closing Date</label>
            <input type="date" value={form.closing_date} onChange={(e) => set('closing_date', e.target.value)} className="form-input" />
          </div>
          <div>
            <label className="form-label">Status</label>
            <select value={form.status} onChange={(e) => set('status', e.target.value)} className="form-input">
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="awarded">Awarded</option>
            </select>
          </div>
        </div>

        <div>
          <label className="form-label">Tender Document (PDF)</label>
          {form.document_url ? (
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg text-sm">
              <span className="text-green-700 flex-1 truncate">✓ Document uploaded</span>
              <button type="button" onClick={() => set('document_url', '')} className="text-red-500 hover:text-red-700 text-xs">Remove</button>
            </div>
          ) : (
            <MediaUploader accept="application/pdf,image/*" folder="documents" onUploadComplete={(url) => set('document_url', url)} />
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center gap-2">
            {saving ? <><Loader2 size={16} className="animate-spin" /> Saving…</> : <><Save size={16} /> Post Tender</>}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-secondary flex-1 justify-center">Cancel</button>
        </div>
      </form>
    </div>
  )
}

