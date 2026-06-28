'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => setLoaded(true), [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://media.victoriasugar.ug/images/DJI_20251217161456_0929_D.jpg"
          alt="Victoria Sugar Estate"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/60 via-green-900/50 to-green-900/80" />
      </div>

      {/* Content */}
      <div className={`relative z-10 container-main text-center text-white transition-all duration-1000 ${
        loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gold-400/20 border border-gold-400/40 text-gold-300
                        text-sm font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse" />
          Uganda's Premier Sugar Producer
        </div>

        <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
          Sweetening Uganda,{' '}
          <span className="text-gold-400">Powering Africa</span>
        </h1>

        <p className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Victoria Sugar Limited is a leading agro-industrial company producing premium sugar,
          ethanol, extra natural alcohol, and electricity from sugarcane.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/products" className="btn-gold text-base px-8 py-3.5">
            Explore Our Products
          </Link>
          <Link href="/about" className="btn-outline-white text-base px-8 py-3.5">
            Our Story
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
        <ChevronDown size={28} />
      </div>
    </section>
  )
}
