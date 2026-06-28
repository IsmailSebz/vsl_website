import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { format } from 'date-fns'
import DeleteRowButton from '@/components/admin/DeleteRowButton'

export const metadata = { title: 'Events' }
export const dynamic = 'force-dynamic'

export default async function AdminEventsPage() {
  const supabase = createClient()
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('start_date', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-bold text-2xl text-gray-800">Events</h2>
          <p className="text-gray-500 text-sm mt-0.5">{events?.length ?? 0} events</p>
        </div>
        <Link href="/admin/events/new" className="btn-primary flex items-center gap-2 text-sm px-4 py-2">
          <Plus size={16} /> Add Event
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {!events?.length ? (
          <div className="text-center py-16 text-gray-400">
            <p className="mb-3">No events yet</p>
            <Link href="/admin/events/new" className="btn-primary text-sm px-4 py-2">Add first event</Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Event</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Location</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Date</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {events.map((ev) => (
                <tr key={ev.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800 text-sm">{ev.title}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{ev.location || '—'}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {ev.start_date ? format(new Date(ev.start_date), 'dd MMM yyyy') : '—'}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      ev.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                      ev.status === 'ongoing' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>{ev.status}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <DeleteRowButton table="events" id={ev.id} label={ev.title} />
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
