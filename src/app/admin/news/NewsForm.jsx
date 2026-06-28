'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Loader2, Upload, X } from 'lucide-react'
import dynamic from 'next/dynamic'
import MediaUploader from '@/components/admin/MediaUploader'
import { createClient } from '@/lib/supabase/client'

// Load TipTap editor client-side only (no SSR)
const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), { ssr: false })

const CATEGORIES = ['Company News', 'Sugar Industry', 'Outgrower', 'Community', 'Awards', 'Operations']

export default function NewsForm({ article }) {
  const router = useRouter()
  const isEdit = !!article

  const [form, setForm] = useState({
    title: article?.title || '',
    excerpt: article?.excerpt || '',
    category: article?.category || CATEGORIES[0],
    status: article?.status || 'draft',
    cover_image_url: article?.cover_image_url || '',
    body_html: article?.body_html || '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [showCoverUploader, setShowCoverUploader] = useState(false)

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) { setError('Title is required.'); return }
    if (!form.body_html || form.body_html === '<p></p>') { setError('Article body is required.'); return }

    setSaving(true)
    setError('')
    const supabase = createClient()

    const payload = {
      ...form,
      published_at: form.status === 'published' ? (article?.published_at || new Date().toISOString()) : null,
    }

    let err
    if (isEdit) {
      ;({ error: err } = await supabase.from('news').update(payload).eq('id', article.id))
    } else {
      ;({ error: err } = await supabase.from('news').insert(payload))
    }

    if (err) {
      setError(err.message)
      setSaving(false)
      return
    }

    router.push('/admin/news')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title */}
          <div>
            <label className="form-label">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="Enter article title"
              className="form-input text-lg font-medium"
              required
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="form-label">Excerpt <span className="text-gray-400 font-normal">(shown on listings)</span></label>
            <textarea
              value={form.excerpt}
              onChange={(e) => set('excerpt', e.target.value)}
              placeholder="Brief summary of the article…"
              rows={2}
              className="form-input resize-none"
            />
          </div>

          {/* Body */}
          <div>
            <label className="form-label">Article Body *</label>
            <RichTextEditor
              content={form.body_html}
              onChange={(html) => set('body_html', html)}
              placeholder="Write your article here…"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Status */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-3 text-sm">Publish Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="form-label text-xs">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => set('status', e.target.value)}
                  className="form-input text-sm"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div>
                <label className="form-label text-xs">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => set('category', e.target.value)}
                  className="form-input text-sm"
                >
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Cover image */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-3 text-sm">Cover Image</h3>
            {form.cover_image_url ? (
              <div className="relative">
                <img src={form.cover_image_url} alt="Cover" className="w-full aspect-video object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => { set('cover_image_url', ''); setShowCoverUploader(false) }}
                  className="absolute top-2 right-2 w-7 h-7 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <>
                {!showCoverUploader ? (
                  <button type="button" onClick={() => setShowCoverUploader(true)}
                    className="w-full border-2 border-dashed border-gray-200 rounded-lg p-6 text-center text-gray-400 hover:border-green-400 hover:text-green-500 transition-all text-sm">
                    <Upload size={20} className="mx-auto mb-2" />
                    Upload cover image
                  </button>
                ) : (
                  <MediaUploader
                    accept="image/*"
                    folder="covers"
                    onUploadComplete={(url) => {
                      set('cover_image_url', url)
                      setShowCoverUploader(false)
                    }}
                  />
                )}
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <button type="submit" disabled={saving} className="btn-primary justify-center gap-2">
              {saving ? <><Loader2 size={16} className="animate-spin" /> Saving…</> : <><Save size={16} /> {isEdit ? 'Save Changes' : 'Create Article'}</>}
            </button>
            <button type="button" onClick={() => router.back()} className="btn-secondary justify-center text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
