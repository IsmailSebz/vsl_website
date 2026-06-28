'use client'
import { useState, useEffect, useRef } from 'react'
import { Plus, Trash2, Loader2, X, FileDown } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import MediaUploader from '@/components/admin/MediaUploader'

const CATEGORIES = ['Annual Reports', 'Product Specifications', 'Certificates', 'Brochures', 'Forms', 'Sustainability Reports', 'Other']

export default function AdminDownloadsPage() {
  const [downloads, setDownloads] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', category: CATEGORIES[0], description: '', file_url: '' })
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(null)

  const supabaseRef = useRef(null)

  useEffect(() => { supabaseRef.current = createClient(); fetchDownloads() }, [])

  const fetchDownloads = async () => {
    setLoading(true)
    const { data } = await supabaseRef.current.from('downloads').select('*').order('created_at', { ascending: false })
    setDownloads(data || [])
    setLoading(false)
  }

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.file_url) return
    setSaving(true)
    await supabaseRef.current.from('downloads').insert(form)
    setForm({ title: '', category: CATEGORIES[0], description: '', file_url: '' })
    setShowForm(false)
    setSaving(false)
    fetchDownloads()
  }

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return
    setDeleting(id)
    await supabaseRef.current.from('downloads').delete().eq('id', id)
    setDeleting(null)
    fetchDownloads()
  }

  const grouped = downloads.reduce((acc, d) => {
    ;(acc[d.category] = acc[d.category] || []).push(d)
    return acc
  }, {})

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-bold text-2xl text-gray-800">Downloads</h2>
          <p className="text-gray-500 text-sm mt-0.5">{downloads.length} files</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2 text-sm px-4 py-2">
          <Plus size={16} /> Add File
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Add Download</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label text-sm">Title *</label>
                <input value={form.title} onChange={(e) => set('title', e.target.value)} className="form-input text-sm" placeholder="2024 Annual Report" required />
              </div>
              <div>
                <label className="form-label text-sm">Category</label>
                <select value={form.category} onChange={(e) => set('category', e.target.value)} className="form-input text-sm">
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="form-label text-sm">Description</label>
              <input value={form.description} onChange={(e) => set('description', e.target.value)} className="form-input text-sm" placeholder="Optional description" />
            </div>
            <div>
              <label className="form-label text-sm">File *</label>
              {form.file_url ? (
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg text-sm">
                  <span className="text-green-700 flex-1">✓ File uploaded</span>
                  <button type="button" onClick={() => set('file_url', '')} className="text-red-500 text-xs">Remove</button>
                </div>
              ) : (
                <MediaUploader accept="application/pdf,image/*,.doc,.docx,.xls,.xlsx" folder="documents" onUploadComplete={(url) => set('file_url', url)} />
              )}
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving || !form.file_url} className="btn-primary text-sm px-4 py-2 gap-2">
                {saving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : 'Add Download'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm px-4 py-2">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 size={28} className="animate-spin text-green-500" /></div>
      ) : downloads.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm text-center py-16 text-gray-400">
          <FileDown size={32} className="mx-auto mb-3 opacity-50" />
          <p>No files added yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-100 px-6 py-3">
                <h3 className="font-semibold text-gray-700 text-sm">{category}</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {items.map((d) => (
                  <div key={d.id} className="flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors">
                    <FileDown size={16} className="text-gray-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm">{d.title}</p>
                      {d.description && <p className="text-gray-400 text-xs truncate">{d.description}</p>}
                    </div>
                    <a href={d.file_url} target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 hover:underline">View</a>
                    <button onClick={() => handleDelete(d.id, d.title)} disabled={deleting === d.id}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1">
                      {deleting === d.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
