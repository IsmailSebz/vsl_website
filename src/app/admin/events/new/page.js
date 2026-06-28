'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Save, Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
const MediaUploader = dynamic(() => import('@/components/admin/MediaUploader'), { ssr: false })

export default function NewEventPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '', description: '', location: '',
    start_date: '', end_date: '', status: 'upcoming', cover_image_url: '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) { setError('Title required.'); return }
    setSaving(true)
    const supabase = createClient()
    const { error: err } = await supabase.from('events').insert({
      ...form,
      start_date: form.start_date || null,
      end_date: form.end_date || null,
      cover_image_url: form.cover_image_url || null,
    })
    if (err) { setError(err.message); setSaving(false); return }
    router.push('/admin/events')
    router.refresh()
  }

  return (
    <div className="max-w-2xl">
      <h2 className="font-heading font-bold text-2xl text-gray-800 mb-6">Add Event</h2>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-5">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
        <div>
          <label className="form-label">Event Title *</label>
          <input value={form.title} onChange={(e) => set('title', e.target.value)} className="form-input" placeholder="e.g. Annual Outgrower Farmers Day" required />
        </div>
        <div>
          <label className="form-label">Description</label>
          <textarea value={form.description} onChange={(e) => set('description', e.target.value)} className="form-input resize-none" rows={4} placeholder="Event details…" />
        </div>
        <div>
          <label className="form-label">Location</label>
          <input value={form.location} onChange={(e) => set('location', e.target.value)} className="form-input" placeholder="Kakira, Jinja" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Start Date</label>
            <input type="date" value={form.start_date} onChange={(e) => set('start_date', e.target.value)} className="form-input" />
          </div>
          <div>
            <label className="form-label">End Date</label>
            <input type="date" value={form.end_date} onChange={(e) => set('end_date', e.target.value)} className="form-input" />
          </div>
        </div>
        <div>
          <label className="form-label">Status</label>
          <select value={form.status} onChange={(e) => set('status', e.target.value)} className="form-input">
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="form-label">Cover Image</label>
          {form.cover_image_url ? (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
              <img src={form.cover_image_url} alt="" className="w-full h-full object-cover" />
              <button type="button" onClick={() => set('cover_image_url', '')}
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70">✕</button>
            </div>
          ) : (
            <MediaUploader accept="image/*" folder="images" onUploadComplete={(url) => set('cover_image_url', url)} />
          )}
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center gap-2">
            {saving ? <><Loader2 size={16} className="animate-spin" /> Saving…</> : <><Save size={16} /> Add Event</>}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-secondary flex-1 justify-center">Cancel</button>
        </div>
      </form>
    </div>
  )
}

