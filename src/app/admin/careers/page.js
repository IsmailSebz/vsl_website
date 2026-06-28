import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { format } from 'date-fns'
import DeleteRowButton from '@/components/admin/DeleteRowButton'

export const metadata = { title: 'Careers' }
export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export default async function AdminCareersPage() {
  const supabase = createClient()
  const { data: jobs } = await supabase
    .from('careers')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-bold text-2xl text-gray-800">Careers</h2>
          <p className="text-gray-500 text-sm mt-0.5">{jobs?.length ?? 0} postings</p>
        </div>
        <Link href="/admin/careers/new" className="btn-primary flex items-center gap-2 text-sm px-4 py-2">
          <Plus size={16} /> Post Job
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {!jobs?.length ? (
          <div className="text-center py-16 text-gray-400">
            <p className="mb-3">No job postings yet</p>
            <Link href="/admin/careers/new" className="btn-primary text-sm px-4 py-2">Post a job</Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Position</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Department</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Type</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Deadline</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {jobs.map((j) => (
                <tr key={j.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800 text-sm">{j.title}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{j.department || '—'}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{j.employment_type || '—'}</td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      j.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>{j.status}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {j.deadline ? format(new Date(j.deadline), 'dd MMM yyyy') : '—'}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <DeleteRowButton table="careers" id={j.id} label={j.title} />
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
