import { createClient } from '@/lib/supabase/server'
import { format } from 'date-fns'
import MarkReadButton from './MarkReadButton'

export const metadata = { title: 'Inquiries' }
export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export default async function AdminInquiriesPage() {
  const supabase = createClient()
  const { data: inquiries } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  const unread = inquiries?.filter((i) => !i.is_read).length ?? 0

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-heading font-bold text-2xl text-gray-800">Inquiries</h2>
        <p className="text-gray-500 text-sm mt-0.5">{inquiries?.length ?? 0} total · <span className="text-red-500 font-medium">{unread} unread</span></p>
      </div>

      <div className="space-y-3">
        {!inquiries?.length ? (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm text-center py-16 text-gray-400">
            <p>No inquiries yet</p>
          </div>
        ) : inquiries.map((inq) => (
          <div key={inq.id} className={`bg-white rounded-xl border shadow-sm p-5 transition-all ${!inq.is_read ? 'border-green-300 ring-1 ring-green-100' : 'border-gray-100'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  {!inq.is_read && (
                    <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  )}
                  <span className="font-semibold text-gray-800">{inq.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gold-100 text-gold-700 bg-amber-100 text-amber-700">
                    {inq.inquiry_type || 'General'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-1">{inq.email}{inq.phone ? ` · ${inq.phone}` : ''}</p>
                {inq.subject && <p className="text-sm font-medium text-gray-700 mb-2">{inq.subject}</p>}
                <p className="text-sm text-gray-600 leading-relaxed">{inq.message}</p>
              </div>
              <div className="flex-shrink-0 text-right space-y-2">
                <p className="text-xs text-gray-400">{format(new Date(inq.created_at), 'dd MMM yyyy, HH:mm')}</p>
                {!inq.is_read && <MarkReadButton id={inq.id} />}
                <a href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject || 'Your inquiry')}`}
                  className="block text-xs text-green-600 hover:underline">Reply by email ↗</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
