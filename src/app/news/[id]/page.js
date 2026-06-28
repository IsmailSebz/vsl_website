import PublicLayout from '@/components/layout/PublicLayout'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Calendar, ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'

export async function generateMetadata({ params }) {
  const supabase = createClient()
  const { data } = await supabase.from('news').select('title, excerpt').eq('id', params.id).single()
  return { title: data?.title || 'Article' }
}

export default async function NewsArticlePage({ params }) {
  const supabase = createClient()
  const { data: article } = await supabase
    .from('news')
    .select('*')
    .eq('id', params.id)
    .eq('is_published', true)
    .single()

  if (!article) notFound()

  return (
    <PublicLayout>
      {article.cover_image_url && (
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img src={article.cover_image_url} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-green-900/50" />
        </div>
      )}

      <section className="section bg-white">
        <div className="container-main max-w-4xl">
          <Link href="/news" className="flex items-center gap-2 text-green-600 text-sm font-medium mb-8 hover:underline">
            <ArrowLeft size={16} /> Back to News
          </Link>
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
            <Calendar size={14} />
            {article.published_date && format(new Date(article.published_date), 'dd MMMM yyyy')}
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-green-800 mb-8 leading-tight">{article.title}</h1>
          <div
            className="prose-vsl"
            dangerouslySetInnerHTML={{ __html: article.body_html }}
          />
        </div>
      </section>
    </PublicLayout>
  )
}
