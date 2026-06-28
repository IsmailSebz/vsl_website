import Link from 'next/link'
import { ArrowRight, Users, TrendingUp, Leaf } from 'lucide-react'

const benefits = [
  { icon: TrendingUp, text: 'Guaranteed market price for your sugarcane harvest' },
  { icon: Users, text: 'Technical support and training from our agronomists' },
  { icon: Leaf, text: 'Access to subsidised inputs and irrigation support' },
]

export default function OutgrowerCTA() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://media.victoriasugar.ug/images/DJI_20251217122314_0861_D.JPG"
          alt="Sugarcane fields"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-900/80" />
      </div>
      <div className="relative z-10 container-main text-center text-white">
        <p className="section-label">For Farmers</p>
        <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mt-2 mb-4">
          Grow With Us
        </h2>
        <p className="text-green-100 text-lg max-w-2xl mx-auto mb-10">
          Join over 5,000 outgrower farmers partnering with Victoria Sugar Limited.
          We provide everything you need to grow profitable sugarcane on your land.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
          {benefits.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 max-w-xs">
              <Icon size={20} className="text-gold-400 flex-shrink-0" />
              <span className="text-sm text-green-100 text-left">{text}</span>
            </div>
          ))}
        </div>
        <Link href="/operations/outgrower" className="btn-gold text-base px-8 py-4">
          Join the Programme <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  )
}
