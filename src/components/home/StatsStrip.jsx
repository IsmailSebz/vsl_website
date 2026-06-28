'use client'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 25, suffix: '+', label: 'Years of Excellence' },
  { value: 150000, suffix: '+', label: 'Tonnes Produced Annually' },
  { value: 5000, suffix: '+', label: 'Outgrower Farmers' },
  { value: 3000, suffix: '+', label: 'Employees' },
  { value: 10, suffix: '+', label: 'Export Markets' },
]

function useCountUp(target, duration = 2000, started = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let start = 0
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, started])
  return count
}

function StatItem({ value, suffix, label, started }) {
  const count = useCountUp(value, 2000, started)
  return (
    <div className="text-center">
      <div className="font-heading font-bold text-3xl md:text-4xl text-gold-400">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-green-200 text-sm mt-1">{label}</div>
    </div>
  )
}

export default function StatsStrip() {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-green-800 py-12">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} started={started} />
          ))}
        </div>
      </div>
    </section>
  )
}
