import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
import { createClient } from '@/lib/supabase/server'
import { Download, FileText } from 'lucide-react'

export const metadata = { title: 'Downloads' }

export default async function DownloadsPage() {
  const supabase = createClient()
  const { data: files } = await supabase.from('downloads').select('*').order('created_at', { ascending: false })

  const categories = [...new Set((files || []).map((f) => f.category).filter(Boolean))]

  return (
    <PublicLayout>
      <PageHero title="Downloads" subtitle="Brochures, product specifications, certifications and more." breadcrumb="Home / Downloads" />
      <section className="section bg-white">
        <div className="container-main">
          {!files?.length ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl text-gray-400">No downloadable files available yet.</div>
          ) : (
            <div className="space-y-10">
              {(categories.length ? categories : ['General']).map((cat) => {
                const catFiles = files.filter((f) => (f.category || 'General') === cat)
                return (
                  <div key={cat}>
                    <h3 className="font-heading font-bold text-green-800 text-xl mb-4 border-b border-gray-100 pb-3">{cat}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {catFiles.map((file) => (
                        <a key={file.id} href={file.file_url} target="_blank" rel="noopener noreferrer" className="card p-5 flex items-center gap-4 hover:shadow-lg transition-shadow">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText size={18} className="text-green-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-800 text-sm">{file.title}</div>
                            {file.file_type && <div className="text-gray-400 text-xs mt-0.5">{file.file_type}</div>}
                          </div>
                          <Download size={16} className="text-green-600 flex-shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  )
}
