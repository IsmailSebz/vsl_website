import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
import { createClient } from '@/lib/supabase/server'
import { Calendar, MapPin, Briefcase } from 'lucide-react'
import { format } from 'date-fns'

export const metadata = { title: 'Careers' }

export default async function CareersPage() {
  const supabase = createClient()
  const { data: jobs } = await supabase.from('careers').select('*').eq('is_active', true).order('created_at', { ascending: false })

  return (
    <PublicLayout>
      <PageHero title="Careers" subtitle="Join one of Uganda's most dynamic agro-industrial companies." image="https://media.victoriasugar.ug/images/DJI_20251217161456_0929_D.jpg" breadcrumb="Home / Careers" />
      <section className="section bg-white">
        <div className="container-main">
          <div className="max-w-2xl mb-12">
            <p className="section-label">Work With Us</p>
            <h2 className="section-title">Build Your Career at Victoria Sugar</h2>
            <p className="text-gray-600 leading-relaxed">We offer competitive remuneration, professional development, and the opportunity to make a real impact in Uganda's agro-industrial sector. Browse our current openings below.</p>
          </div>

          {!jobs?.length ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl text-gray-400">
              <div className="text-4xl mb-3">💼</div>
              <p>No open positions at this time. Send your CV to careers@victoriasugar.com for future consideration.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {jobs.map((job) => (
                <details key={job.id} className="card group">
                  <summary className="p-6 cursor-pointer flex items-start justify-between gap-4 list-none">
                    <div>
                      <h3 className="font-heading font-bold text-green-800 text-lg">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        {job.department && <span className="flex items-center gap-1 text-gray-400 text-xs"><Briefcase size={12} /> {job.department}</span>}
                        {job.location && <span className="flex items-center gap-1 text-gray-400 text-xs"><MapPin size={12} /> {job.location}</span>}
                        {job.deadline && <span className="flex items-center gap-1 text-gray-400 text-xs"><Calendar size={12} /> Deadline: {format(new Date(job.deadline), 'dd MMM yyyy')}</span>}
                      </div>
                    </div>
                    <span className="text-green-600 text-sm font-medium flex-shrink-0">View Details ↓</span>
                  </summary>
                  <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                    <p className="text-gray-600 text-sm whitespace-pre-line mb-4">{job.description}</p>
                    {job.requirements && <div className="mb-4"><h4 className="font-semibold text-gray-700 text-sm mb-2">Requirements</h4><p className="text-gray-500 text-sm">{job.requirements}</p></div>}
                    {job.how_to_apply && <div className="bg-green-50 rounded-xl p-4"><h4 className="font-semibold text-green-700 text-sm mb-1">How to Apply</h4><p className="text-gray-600 text-sm">{job.how_to_apply}</p></div>}
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  )
}
