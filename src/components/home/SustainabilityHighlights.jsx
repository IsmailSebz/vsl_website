import Link from 'next/link'
import { Leaf, Heart, Zap, ArrowRight } from 'lucide-react'

const pillars = [
  {
    icon: Leaf,
    title: 'Sustainable Farming',
    description: 'We practise responsible land management, water conservation, and integrated pest management to protect Uganda\'s natural resources.',
    href: '/sustainability',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Heart,
    title: 'Community Development',
    description: 'From schools and health facilities to road infrastructure — we invest in the communities where we operate.',
    href: '/sustainability/community',
    color: 'bg-rose-100 text-rose-600',
  },
  {
    icon: Zap,
    title: 'Renewable Energy',
    description: 'Our co-generation plant converts sugarcane bagasse into clean electricity, powering our estate and selling surplus to the national grid.',
    href: '/products/electricity',
    color: 'bg-amber-100 text-amber-600',
  },
]

export default function SustainabilityHighlights() {
  return (
    <section className="section bg-white">
      <div className="container-main">
        <div className="text-center mb-12">
          <p className="section-label">Our Commitment</p>
          <h2 className="section-title mx-auto">Sustainability at Our Core</h2>
          <p className="section-subtitle mx-auto text-center">
            We believe that business success and environmental stewardship go hand in hand.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map(({ icon: Icon, title, description, href, color }) => (
            <div key={title} className="card p-8 text-center group hover:scale-[1.02] transition-transform duration-300">
              <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                <Icon size={28} />
              </div>
              <h3 className="font-heading font-bold text-green-800 text-xl mb-3">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">{description}</p>
              <Link href={href} className="text-green-600 text-sm font-semibold flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                Learn more <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/sustainability" className="btn-secondary">
            Our Sustainability Report <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
