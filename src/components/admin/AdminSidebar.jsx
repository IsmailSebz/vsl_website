'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Newspaper, Image as ImageIcon, FileText, Briefcase, Calendar, Download, Settings, LogOut, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Newspaper, label: 'News', href: '/admin/news' },
  { icon: ImageIcon, label: 'Gallery', href: '/admin/gallery' },
  { icon: FileText, label: 'Tenders', href: '/admin/tenders' },
  { icon: Briefcase, label: 'Careers', href: '/admin/careers' },
  { icon: FileText, label: 'Press Room', href: '/admin/press-room' },
  { icon: Calendar, label: 'Events', href: '/admin/events' },
  { icon: Download, label: 'Downloads', href: '/admin/downloads' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <aside className="w-64 flex-shrink-0 bg-green-900 text-white flex flex-col min-h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-green-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg p-1 flex-shrink-0">
            <Image src="/logo.jpg" alt="VSL" width={36} height={36} className="object-contain" />
          </div>
          <div>
            <div className="font-heading font-bold text-sm text-white leading-tight">Victoria Sugar</div>
            <div className="text-green-400 text-xs">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`admin-nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              {label}
              {isActive && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-green-800">
        <button onClick={handleLogout} className="admin-nav-link w-full text-red-300 hover:text-red-200 hover:bg-red-900/30">
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </aside>
  )
}
