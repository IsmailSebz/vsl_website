'use client'
import Link from 'next/link'
import { ExternalLink, Bell } from 'lucide-react'

export default function AdminHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div>
        <h1 className="font-heading font-bold text-gray-800">Content Management</h1>
        <p className="text-gray-400 text-xs">Victoria Sugar Limited</p>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="https://victoriasugar.ug"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-green-600 text-sm font-medium hover:underline"
        >
          <ExternalLink size={14} /> View Website
        </a>
        <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
          A
        </div>
      </div>
    </header>
  )
}
