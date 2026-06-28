import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Calendar } from 'lucide-react'
import { format } from 'date-fns'

export const metadata = { title: 'Press Room' }

export default async function PressRoomPage() {
  const supabase = createClient()
  const { data: releases } = await supabase.from('press_releases').select('*').eq('is_published', true).order('published_date', { ascending: false })

  return (
    <PublicLayout>
      <PageHero title="Press Room" subtitle="Official press releases and statements from Victoria Sugar Limited." breadcrumb="Home / Press Room" />
      <section className="section bg-white">
        <div className="container-main">
          <div className="mb-8 p-5 bg-green-50 rounded-xl">
            <p className="text-gray-600 text-sm"><strong>Media Enquiries:</strong> media@victoriasugar.com | +256 781 989 621</p>
          </div>
          {!releases?.length ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl text-gray-400">No press releases published yet.</div>
          ) : (
            <div className="space-y-6">
              {releases.map((r) => (
                <div key={r.id} className="card p-6">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                    <Calendar size={12} /> {format(new Date(r.published_date), 'dd MMMM yyyy')}
                  </div>
                  <h3 className="font-heading font-bold text-green-800 text-xl mb-3">{r.title}</h3>
                  <div className="prose-vsl text-sm line-clamp-3" dangerouslySetInnerHTML={{ __html: r.body_html }} />
                  <Link href={`/press-room/${r.id}`} className="text-green-600 text-sm font-semibold mt-3 inline-flex items-center gap-1 hover:underline">
                    Read Full Release →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  )
}
