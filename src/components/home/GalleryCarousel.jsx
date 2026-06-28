'use client'
import { useEffect, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import { ArrowRight, Play, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function GalleryCarousel() {
  const [items, setItems] = useState([])
  const [lightbox, setLightbox] = useState(null)
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 10000, stopOnInteraction: false })]
  )

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('gallery_items')
      .select('id, type, url, thumbnail_url, title, album_id, gallery_albums(title)')
      .order('created_at', { ascending: false })
      .limit(8)
      .then(({ data }) => setItems(data || []))
  }, [])

  if (!items.length) return null

  return (
    <section className="section bg-gray-50">
      <div className="container-main">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label">Visual Stories</p>
            <h2 className="section-title mb-0">Gallery</h2>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={scrollPrev} className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all">
              <ChevronLeft size={18} />
            </button>
            <button onClick={scrollNext} className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container gap-4">
            {items.map((item) => (
              <div key={item.id} className="embla__slide" style={{ flex: '0 0 calc(25% - 12px)', minWidth: '220px' }}>
                <button
                  onClick={() => setLightbox(item)}
                  className="relative block w-full aspect-square rounded-xl overflow-hidden group"
                >
                  <img
                    src={item.thumbnail_url || item.url}
                    alt={item.title || 'Gallery'}
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
                  {item.gallery_albums?.title && (
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs font-medium truncate">{item.title || item.gallery_albums.title}</p>
                    </div>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link href="/gallery" className="btn-secondary">
            View Full Gallery <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white/70 hover:text-white">
            <X size={32} />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            {lightbox.type === 'video' ? (
              <video src={lightbox.url} controls autoPlay className="w-full rounded-xl max-h-[80vh]" />
            ) : (
              <img src={lightbox.url} alt={lightbox.title} className="w-full rounded-xl max-h-[80vh] object-contain" />
            )}
            {lightbox.title && (
              <p className="text-white text-center mt-3 font-medium">{lightbox.title}</p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
