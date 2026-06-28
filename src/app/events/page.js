import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
import { createClient } from '@/lib/supabase/server'
import { Calendar, MapPin } from 'lucide-react'
import { format } from 'date-fns'

export const metadata = { title: 'Events' }
export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export default async function EventsPage() {
  const supabase = createClient()
  const { data: events } = await supabase.from('events').select('*').eq('is_active', true).order('event_date', { ascending: true })

  return (
    <PublicLayout>
      <PageHero title="Events" subtitle="Upcoming events, exhibitions, and community activities from Victoria Sugar Limited." breadcrumb="Home / Events" />
      <section className="section bg-white">
        <div className="container-main">
          {!events?.length ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl text-gray-400"><div className="text-4xl mb-3">📅</div><p>No upcoming events. Check back soon.</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((event) => (
                <div key={event.id} className="card overflow-hidden">
                  {event.image_url && <img src={event.image_url} alt={event.title} className="w-full aspect-video object-cover" />}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-3 mb-3">
                      <span className="flex items-center gap-1.5 text-green-600 text-xs font-semibold bg-green-50 px-3 py-1 rounded-full">
                        <Calendar size={12} /> {format(new Date(event.event_date), 'dd MMM yyyy')}
                        {event.event_end_date && ` – ${format(new Date(event.event_end_date), 'dd MMM yyyy')}`}
                      </span>
                      {event.location && <span className="flex items-center gap-1.5 text-gray-400 text-xs"><MapPin size={12} />{event.location}</span>}
                    </div>
                    <h3 className="font-heading font-bold text-green-800 text-xl mb-2">{event.title}</h3>
                    {event.description && <p className="text-gray-500 text-sm leading-relaxed">{event.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  )
}
