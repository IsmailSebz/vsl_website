import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
import { createClient } from '@/lib/supabase/server'
import { Calendar, Download } from 'lucide-react'
import { format } from 'date-fns'

export const metadata = { title: 'Tenders & Procurement' }

export default async function TendersPage() {
  const supabase = createClient()
  const { data: tenders } = await supabase.from('tenders').select('*').eq('is_active', true).order('created_at', { ascending: false })

  return (
    <PublicLayout>
      <PageHero title="Tenders & Procurement" subtitle="Current tender notices and procurement opportunities with Victoria Sugar Limited." breadcrumb="Home / Tenders & Procurement" />
      <section className="section bg-white">
        <div className="container-main">
          <p className="text-gray-600 max-w-2xl mb-10">Victoria Sugar Limited invites bids from eligible suppliers and contractors for the opportunities listed below. All tenders are subject to our standard procurement terms and conditions.</p>
          {!tenders?.length ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl text-gray-400">
              <div className="text-4xl mb-3">📋</div>
              <p>No active tenders at this time. Please check back later.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {tenders.map((t) => (
                <div key={t.id} className="card p-6">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                      {t.reference_number && <span className="text-xs font-mono bg-green-100 text-green-700 px-2 py-0.5 rounded mb-2 inline-block">{t.reference_number}</span>}
                      <h3 className="font-heading font-bold text-green-800 text-lg mt-1">{t.title}</h3>
                      {t.description && <p className="text-gray-500 text-sm mt-2">{t.description}</p>}
                      {t.deadline && (
                        <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-3">
                          <Calendar size={12} /> Deadline: {format(new Date(t.deadline), 'dd MMMM yyyy')}
                        </div>
                      )}
                    </div>
                    {t.file_url && (
                      <a href={t.file_url} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm px-4 py-2 flex items-center gap-1.5 flex-shrink-0">
                        <Download size={15} /> Download
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-10 bg-green-50 rounded-2xl p-8">
            <h3 className="font-heading font-bold text-green-800 text-lg mb-2">Questions about a Tender?</h3>
            <p className="text-gray-500 text-sm mb-4">Contact our Procurement Office for clarifications or additional information.</p>
            <p className="text-green-600 text-sm font-medium">procurement@victoriasugar.com | +256 781 989 621</p>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
