import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { format } from 'date-fns'
import DeleteRowButton from '@/components/admin/DeleteRowButton'

export const metadata = { title: 'Tenders' }
export const dynamic = 'force-dynamic'

export default async function AdminTendersPage() {
  const supabase = createClient()
  const { data: tenders } = await supabase
    .from('tenders')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-bold text-2xl text-gray-800">Tenders</h2>
          <p className="text-gray-500 text-sm mt-0.5">{tenders?.length ?? 0} tenders</p>
        </div>
        <Link href="/admin/tenders/new" className="btn-primary flex items-center gap-2 text-sm px-4 py-2">
          <Plus size={16} /> Post Tender
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {!tenders?.length ? (
          <div className="text-center py-16 text-gray-400">
            <p className="mb-3">No tenders posted yet</p>
            <Link href="/admin/tenders/new" className="btn-primary text-sm px-4 py-2">Post first tender</Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Title</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Reference</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Deadline</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {tenders.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800 text-sm">{t.title}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{t.reference_number || '—'}</td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      t.status === 'open' ? 'bg-green-100 text-green-700' :
                      t.status === 'closed' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                    }`}>{t.status}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {t.closing_date ? format(new Date(t.closing_date), 'dd MMM yyyy') : '—'}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <DeleteRowButton table="tenders" id={t.id} label={t.title} />
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
