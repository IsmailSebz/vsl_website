import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { format } from 'date-fns'
import { Plus, Pencil, Trash2, Eye } from 'lucide-react'
import DeleteNewsButton from './DeleteNewsButton'

export const metadata = { title: 'News' }
export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export default async function AdminNewsPage() {
  const supabase = createClient()
  const { data: articles } = await supabase
    .from('news')
    .select('id, title, status, category, published_at, cover_image_url')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-bold text-2xl text-gray-800">News Articles</h2>
          <p className="text-gray-500 text-sm mt-0.5">{articles?.length ?? 0} articles total</p>
        </div>
        <Link href="/admin/news/new" className="btn-primary flex items-center gap-2 text-sm px-4 py-2">
          <Plus size={16} /> New Article
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {!articles?.length ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg font-medium mb-2">No articles yet</p>
            <Link href="/admin/news/new" className="btn-primary text-sm px-4 py-2">Create your first article</Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Article</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Category</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Published</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {article.cover_image_url ? (
                        <img src={article.cover_image_url} alt="" className="w-12 h-9 rounded object-cover flex-shrink-0" />
                      ) : (
                        <div className="w-12 h-9 rounded bg-gray-100 flex-shrink-0" />
                      )}
                      <span className="font-medium text-gray-800 text-sm line-clamp-2">{article.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                      {article.category || 'General'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      article.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {article.published_at ? format(new Date(article.published_at), 'dd MMM yyyy') : '—'}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      {article.status === 'published' && (
                        <a href={`/news/${article.id}`} target="_blank" rel="noopener noreferrer"
                          className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors" title="View on site">
                          <Eye size={15} />
                        </a>
                      )}
                      <Link href={`/admin/news/${article.id}/edit`}
                        className="p-1.5 text-gray-400 hover:text-green-600 transition-colors" title="Edit">
                        <Pencil size={15} />
                      </Link>
                      <DeleteNewsButton id={article.id} title={article.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
