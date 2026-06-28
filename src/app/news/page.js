import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'

export const metadata = { title: 'News & Media' }
export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export default async function NewsPage() {
  const supabase = createClient()
  const { data: news } = await supabase
    .from('news')
    .select('id, title, excerpt, cover_image_url, published_date')
    .eq('is_published', true)
    .order('published_date', { ascending: false })

  return (
    <PublicLayout>
      <PageHero
        title="News & Media"
        subtitle="Stay up to date with the latest news, announcements, and stories from Victoria Sugar Limited."
        image="https://media.victoriasugar.ug/images/DJI_20251217122121_0858_D.jpg"
        breadcrumb="Home / News & Media"
      />
      <section className="section bg-white">
        <div className="container-main">
          {!news?.length ? (
            <div className="text-center py-20 text-gray-400">No news articles published yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((article) => (
                <Link key={article.id} href={`/news/${article.id}`} className="card group block">
                  <div className="relative overflow-hidden aspect-video">
                    {article.cover_image_url ? (
                      <img src={article.cover_image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-green-50 flex items-center justify-center text-4xl">📰</div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
                      <Calendar size={12} />
                      {article.published_date && format(new Date(article.published_date), 'dd MMMM yyyy')}
                    </div>
                    <h2 className="font-heading font-bold text-green-800 text-lg leading-snug mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">{article.title}</h2>
                    {article.excerpt && <p className="text-gray-500 text-sm line-clamp-3">{article.excerpt}</p>}
                    <div className="flex items-center gap-1.5 text-green-600 text-sm font-semibold mt-4 group-hover:gap-3 transition-all">
                      Read full article <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  )
}
