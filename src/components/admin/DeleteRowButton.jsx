'use client'
import { useState } from 'react'
import { Trash2, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function DeleteRowButton({ table, id, label }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`Delete "${label}"? This cannot be undone.`)) return
    setLoading(true)
    const supabase = createClient()
    await supabase.from(table).delete().eq('id', id)
    router.refresh()
    setLoading(false)
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
      title="Delete"
    >
      {loading ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
    </button>
  )
}
