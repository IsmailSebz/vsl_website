'use client'
import { useEffect, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { format } from 'date-fns'

export default function NewsCarousel() {
  const [news, setNews] = useState([])
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 10000, stopOnInteraction: false })]
  )

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('news')
      .select('id, title, excerpt, cover_image_url, published_date')
      .eq('is_published', true)
      .order('published_date', { ascending: false })
      .limit(6)
      .then(({ data }) => setNews(data || []))
  }, [])

  if (!news.length) return null

  return (
    <section className="section bg-white">
      <div className="container-main">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label">Latest Updates</p>
            <h2 className="section-title mb-0">News & Media</h2>
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
          <div className="embla__container gap-6">
            {news.map((article) => (
              <div key={article.id} className="embla__slide" style={{ flex: '0 0 calc(33.333% - 16px)', minWidth: '280px' }}>
                <Link href={`/news/${article.id}`} className="card block group h-full">
                  <div className="relative overflow-hidden aspect-video">
                    {article.cover_image_url ? (
                      <img
                        src={article.cover_image_url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-300 text-4xl">📰</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
                      <Calendar size={12} />
                      {article.published_date && format(new Date(article.published_date), 'dd MMM yyyy')}
                    </div>
                    <h3 className="font-heading font-bold text-green-800 text-base leading-snug mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-gray-500 text-sm line-clamp-2">{article.excerpt}</p>
                    )}
                    <div className="flex items-center gap-1 text-green-600 text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                      Read more <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link href="/news" className="btn-secondary">
            All News & Media <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
