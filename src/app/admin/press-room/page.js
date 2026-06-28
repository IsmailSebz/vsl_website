import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { format } from 'date-fns'
import DeleteRowButton from '@/components/admin/DeleteRowButton'

export const metadata = { title: 'Press Room' }
export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export default async function AdminPressRoomPage() {
  const supabase = createClient()
  const { data: releases } = await supabase
    .from('press_releases')
    .select('*')
    .order('release_date', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-bold text-2xl text-gray-800">Press Room</h2>
          <p className="text-gray-500 text-sm mt-0.5">{releases?.length ?? 0} press releases</p>
        </div>
        <Link href="/admin/press-room/new" className="btn-primary flex items-center gap-2 text-sm px-4 py-2">
          <Plus size={16} /> New Release
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {!releases?.length ? (
          <div className="text-center py-16 text-gray-400">
            <p className="mb-3">No press releases yet</p>
            <Link href="/admin/press-room/new" className="btn-primary text-sm px-4 py-2">Create first release</Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Title</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Date</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {releases.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800 text-sm">{r.title}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {r.release_date ? format(new Date(r.release_date), 'dd MMM yyyy') : '—'}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      r.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>{r.status}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <DeleteRowButton table="press_releases" id={r.id} label={r.title} />
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
