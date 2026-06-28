import { createClient } from '@/lib/supabase/server'
import { format } from 'date-fns'

export const metadata = { title: 'Newsletter' }
export const dynamic = 'force-dynamic'

export default async function AdminNewsletterPage() {
  const supabase = createClient()
  const { data: subscribers } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-heading font-bold text-2xl text-gray-800">Newsletter Subscribers</h2>
        <p className="text-gray-500 text-sm mt-0.5">{subscribers?.length ?? 0} total subscribers</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {!subscribers?.length ? (
          <div className="text-center py-16 text-gray-400">No subscribers yet</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">#</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Email</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Subscribed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {subscribers.map((s, i) => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-sm text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{s.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      s.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>{s.status || 'active'}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {format(new Date(s.created_at), 'dd MMM yyyy')}
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
