import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import NewsForm from '../../NewsForm'

export const metadata = { title: 'Edit Article' }
export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export default async function EditArticlePage({ params }) {
  const supabase = createClient()
  const { data: article } = await supabase
    .from('news')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!article) notFound()

  return (
    <div>
      <h2 className="font-heading font-bold text-2xl text-gray-800 mb-6">Edit Article</h2>
      <NewsForm article={article} />
    </div>
  )
}
