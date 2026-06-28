'use client'
import { useEffect, useState } from 'react'
import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
import { createClient } from '@/lib/supabase/client'
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function GalleryPage() {
  const [albums, setAlbums] = useState([])
  const [items, setItems] = useState([])
  const [activeAlbum, setActiveAlbum] = useState('all')
  const [lightbox, setLightbox] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from('gallery_albums').select('*').eq('is_published', true).order('sort_order'),
      supabase.from('gallery_items').select('*, gallery_albums(title)').order('sort_order'),
    ]).then(([{ data: a }, { data: i }]) => {
      setAlbums(a || [])
      setItems(i || [])
    })
  }, [])

  const filtered = activeAlbum === 'all' ? items : items.filter((i) => i.album_id === activeAlbum)

  const openLightbox = (item) => {
    const idx = filtered.indexOf(item)
    setLightboxIndex(idx)
    setLightbox(item)
  }

  const prev = () => {
    const idx = (lightboxIndex - 1 + filtered.length) % filtered.length
    setLightboxIndex(idx)
    setLightbox(filtered[idx])
  }

  const next = () => {
    const idx = (lightboxIndex + 1) % filtered.length
    setLightboxIndex(idx)
    setLightbox(filtered[idx])
  }

  return (
    <PublicLayout>
      <PageHero
        title="Gallery"
        subtitle="Explore our estate, production facilities, and community programmes through photos and videos."
        image="https://media.victoriasugar.ug/images/DJI_20251217122121_0858_D.jpg"
        breadcrumb="Home / Gallery"
      />

      <section className="section bg-white">
        <div className="container-main">
          {/* Album filter tabs */}
          <div className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={() => setActiveAlbum('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeAlbum === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-green-50'}`}
            >
              All ({items.length})
            </button>
            {albums.map((album) => (
              <button
                key={album.id}
                onClick={() => setActiveAlbum(album.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeAlbum === album.id ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-green-50'}`}
              >
                {album.title} ({items.filter((i) => i.album_id === album.id).length})
              </button>
            ))}
          </div>

          {/* Grid */}
          {!filtered.length ? (
            <div className="text-center py-20 text-gray-400">No media items yet.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => openLightbox(item)}
                  className="relative aspect-square rounded-xl overflow-hidden group"
                >
                  <img
                    src={item.thumbnail_url || item.url}
                    alt={item.title || ''}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play size={20} className="text-green-700 ml-0.5" />
                      </div>
                    </div>
                  )}
                  {item.title && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs font-medium truncate">{item.title}</p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white/70 hover:text-white z-10"><X size={32} /></button>
          <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-4 text-white/70 hover:text-white z-10"><ChevronLeft size={40} /></button>
          <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-14 text-white/70 hover:text-white z-10"><ChevronRight size={40} /></button>

          <div className="max-w-5xl w-full px-16" onClick={(e) => e.stopPropagation()}>
            {lightbox.type === 'video'
              ? <video src={lightbox.url} controls autoPlay className="w-full rounded-xl max-h-[80vh]" />
              : <img src={lightbox.url} alt={lightbox.title} className="w-full rounded-xl max-h-[85vh] object-contain" />
            }
            {lightbox.title && <p className="text-white text-center mt-3">{lightbox.title}</p>}
            <p className="text-gray-500 text-center text-sm mt-1">{lightboxIndex + 1} / {filtered.length}</p>
          </div>
        </div>
      )}
    </PublicLayout>
  )
}
