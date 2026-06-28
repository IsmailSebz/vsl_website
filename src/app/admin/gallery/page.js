'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import { Plus, Trash2, Loader2, FolderOpen, Upload, X, Play, Pencil } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import MediaUploader from '@/components/admin/MediaUploader'

export default function AdminGalleryPage() {
  const [albums, setAlbums] = useState([])
  const [items, setItems] = useState([])
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showNewAlbum, setShowNewAlbum] = useState(false)
  const [showUploader, setShowUploader] = useState(false)
  const [newAlbumName, setNewAlbumName] = useState('')
  const [newAlbumDesc, setNewAlbumDesc] = useState('')
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState(null)

  const supabase = createClient()

  useEffect(() => {
    fetchAlbums()
  }, [])

  useEffect(() => {
    if (selectedAlbum) fetchItems(selectedAlbum)
  }, [selectedAlbum])

  const fetchAlbums = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('gallery_albums')
      .select('*, gallery_items(count)')
      .order('created_at', { ascending: false })
    setAlbums(data || [])
    if (data?.length && !selectedAlbum) setSelectedAlbum(data[0].id)
    setLoading(false)
  }

  const fetchItems = async (albumId) => {
    const { data } = await supabase
      .from('gallery_items')
      .select('*')
      .eq('album_id', albumId)
      .order('sort_order', { ascending: true })
    setItems(data || [])
  }

  const createAlbum = async (e) => {
    e.preventDefault()
    if (!newAlbumName.trim()) return
    setCreating(true)
    await supabase.from('gallery_albums').insert({ name: newAlbumName.trim(), description: newAlbumDesc.trim() })
    setNewAlbumName('')
    setNewAlbumDesc('')
    setShowNewAlbum(false)
    setCreating(false)
    await fetchAlbums()
  }

  const deleteAlbum = async (id) => {
    if (!confirm('Delete this album and all its items?')) return
    setDeleting(id)
    await supabase.from('gallery_items').delete().eq('album_id', id)
    await supabase.from('gallery_albums').delete().eq('id', id)
    setDeleting(null)
    if (selectedAlbum === id) setSelectedAlbum(null)
    await fetchAlbums()
  }

  const handleUploadComplete = async (url, type) => {
    if (!selectedAlbum) return
    await supabase.from('gallery_items').insert({
      album_id: selectedAlbum,
      media_url: url,
      media_type: type,
      title: '',
      sort_order: items.length,
    })
    fetchItems(selectedAlbum)
    setShowUploader(false)
  }

  const deleteItem = async (id) => {
    if (!confirm('Delete this item?')) return
    setDeleting(id)
    await supabase.from('gallery_items').delete().eq('id', id)
    setDeleting(null)
    fetchItems(selectedAlbum)
  }

  const currentAlbum = albums.find((a) => a.id === selectedAlbum)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-bold text-2xl text-gray-800">Gallery</h2>
          <p className="text-gray-500 text-sm mt-0.5">{albums.length} albums</p>
        </div>
        <button onClick={() => setShowNewAlbum(true)} className="btn-primary flex items-center gap-2 text-sm px-4 py-2">
          <Plus size={16} /> New Album
        </button>
      </div>

      {/* New album modal */}
      {showNewAlbum && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-lg text-gray-800">New Album</h3>
              <button onClick={() => setShowNewAlbum(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <form onSubmit={createAlbum} className="space-y-4">
              <div>
                <label className="form-label text-sm">Album Name *</label>
                <input value={newAlbumName} onChange={(e) => setNewAlbumName(e.target.value)} className="form-input" placeholder="e.g. Factory Tour 2024" required />
              </div>
              <div>
                <label className="form-label text-sm">Description</label>
                <textarea value={newAlbumDesc} onChange={(e) => setNewAlbumDesc(e.target.value)} className="form-input resize-none" rows={2} placeholder="Optional description" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={creating} className="btn-primary flex-1 justify-center gap-2">
                  {creating ? <><Loader2 size={16} className="animate-spin" /> Creating…</> : 'Create Album'}
                </button>
                <button type="button" onClick={() => setShowNewAlbum(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 size={28} className="animate-spin text-green-500" /></div>
      ) : (
        <div className="flex gap-6">
          {/* Album sidebar */}
          <div className="w-56 flex-shrink-0 space-y-1">
            {albums.map((album) => (
              <div key={album.id} className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${selectedAlbum === album.id ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100 text-gray-700'}`}
                onClick={() => setSelectedAlbum(album.id)}>
                <FolderOpen size={16} className="flex-shrink-0" />
                <span className="flex-1 text-sm font-medium truncate">{album.name}</span>
                <span className="text-xs text-gray-400">{album.gallery_items?.[0]?.count ?? 0}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); deleteAlbum(album.id) }}
                  disabled={deleting === album.id}
                  className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 p-0.5 transition-all"
                >
                  {deleting === album.id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                </button>
              </div>
            ))}
            {albums.length === 0 && (
              <p className="text-gray-400 text-sm px-3 py-2">No albums yet</p>
            )}
          </div>

          {/* Items grid */}
          <div className="flex-1">
            {selectedAlbum ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="font-medium text-gray-700">{currentAlbum?.name}</p>
                  <button onClick={() => setShowUploader(!showUploader)} className="btn-secondary flex items-center gap-2 text-sm px-3 py-1.5">
                    <Upload size={14} /> Upload Media
                  </button>
                </div>

                {showUploader && (
                  <div className="mb-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm max-w-md">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-medium text-sm text-gray-700">Upload to {currentAlbum?.name}</p>
                      <button onClick={() => setShowUploader(false)} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
                    </div>
                    <MediaUploader
                      accept="image/*,video/*"
                      folder="images"
                      onUploadComplete={handleUploadComplete}
                    />
                  </div>
                )}

                {items.length === 0 ? (
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-16 text-center text-gray-400">
                    <Upload size={32} className="mx-auto mb-3 opacity-50" />
                    <p>No media in this album yet</p>
                    <button onClick={() => setShowUploader(true)} className="btn-primary mt-3 text-sm px-4 py-2">Upload first item</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {items.map((item) => (
                      <div key={item.id} className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                        {item.media_type === 'video' ? (
                          <>
                            <video src={item.media_url} className="w-full h-full object-cover" muted />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <Play size={24} className="text-white" fill="white" />
                            </div>
                          </>
                        ) : (
                          <img src={item.media_url} alt={item.title || ''} className="w-full h-full object-cover" />
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => deleteItem(item.id)}
                            disabled={deleting === item.id}
                            className="bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600"
                          >
                            {deleting === item.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-400">
                <p>Select or create an album</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
