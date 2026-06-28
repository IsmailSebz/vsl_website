'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function MarkReadButton({ id }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const mark = async () => {
    setLoading(true)
    const supabase = createClient()
    await supabase.from('inquiries').update({ is_read: true }).eq('id', id)
    router.refresh()
    setLoading(false)
  }

  return (
    <button onClick={mark} disabled={loading}
      className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1">
      {loading ? <Loader2 size={12} className="animate-spin" /> : '✓'} Mark read
    </button>
  )
}
