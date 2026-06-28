import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Newspaper, Image, FileText, Briefcase, Calendar, Download, Mail, Users } from 'lucide-react'

export const metadata = { title: 'Dashboard' }

export default async function AdminDashboard() {
  const supabase = createClient()
  const { data: stats } = await supabase.from('admin_dashboard_stats').select('*').single()

  const cards = [
    { icon: Newspaper, label: 'Published News', value: stats?.published_news ?? '–', sub: `${stats?.draft_news ?? 0} drafts`, href: '/admin/news', color: 'bg-blue-50 text-blue-600' },
    { icon: Image, label: 'Gallery Items', value: stats?.gallery_items ?? '–', sub: `${stats?.gallery_albums ?? 0} albums`, href: '/admin/gallery', color: 'bg-purple-50 text-purple-600' },
    { icon: FileText, label: 'Active Tenders', value: stats?.active_tenders ?? '–', sub: 'Open for bids', href: '/admin/tenders', color: 'bg-amber-50 text-amber-600' },
    { icon: Briefcase, label: 'Active Jobs', value: stats?.active_jobs ?? '–', sub: 'Open positions', href: '/admin/careers', color: 'bg-green-50 text-green-600' },
    { icon: Calendar, label: 'Upcoming Events', value: stats?.upcoming_events ?? '–', sub: 'Scheduled', href: '/admin/events', color: 'bg-rose-50 text-rose-600' },
    { icon: Mail, label: 'Unread Inquiries', value: stats?.unread_inquiries ?? '–', sub: `${stats?.total_inquiries ?? 0} total`, href: '/admin/inquiries', color: 'bg-red-50 text-red-600' },
    { icon: Download, label: 'Downloads', value: stats?.downloads ?? '–', sub: 'Files available', href: '/admin/downloads', color: 'bg-gray-50 text-gray-600' },
    { icon: Users, label: 'Newsletter', value: stats?.subscribers ?? '–', sub: 'Subscribers', href: '/admin/newsletter', color: 'bg-teal-50 text-teal-600' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-heading font-bold text-2xl text-gray-800">Dashboard</h2>
        <p className="text-gray-500 text-sm mt-1">Overview of all website content</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map(({ icon: Icon, label, value, sub, href, color }) => (
          <Link key={label} href={href} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow group">
            <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center mb-3`}>
              <Icon size={18} />
            </div>
            <div className="font-heading font-bold text-2xl text-gray-800">{value}</div>
            <div className="font-medium text-gray-700 text-sm mt-0.5">{label}</div>
            <div className="text-gray-400 text-xs mt-0.5">{sub}</div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-heading font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/news/new" className="btn-primary text-sm px-4 py-2">+ New Article</Link>
          <Link href="/admin/gallery" className="btn-secondary text-sm px-4 py-2">+ Upload Media</Link>
          <Link href="/admin/tenders/new" className="btn-secondary text-sm px-4 py-2">+ Post Tender</Link>
          <Link href="/admin/careers/new" className="btn-secondary text-sm px-4 py-2">+ Post Job</Link>
          <Link href="/admin/events/new" className="btn-secondary text-sm px-4 py-2">+ Add Event</Link>
        </div>
      </div>
    </div>
  )
}
