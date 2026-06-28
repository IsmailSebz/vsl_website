import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
import { Leaf, Droplets, Sun, Recycle } from 'lucide-react'

export const metadata = { title: 'Sustainability' }

const pillars = [
  { icon: Leaf, title: 'Responsible Farming', desc: 'We promote soil health, reduce chemical inputs, and practise crop rotation to maintain long-term land productivity.' },
  { icon: Droplets, title: 'Water Conservation', desc: 'Advanced drip and furrow irrigation systems reduce water use by 40% compared to traditional methods.' },
  { icon: Sun, title: 'Renewable Energy', desc: 'Our bagasse-powered co-generation plant produces 50 MW of clean electricity, reducing reliance on fossil fuels.' },
  { icon: Recycle, title: 'Waste to Value', desc: 'Filter cake, vinasse, and bagasse are all repurposed — as fertiliser, soil conditioner, and fuel respectively.' },
]

export default function SustainabilityPage() {
  return (
    <PublicLayout>
      <PageHero title="Sustainability" subtitle="Building a business that protects the environment and benefits communities for generations." image="https://media.victoriasugar.ug/images/DJI_20251217122314_0861_D.JPG" breadcrumb="Home / Sustainability" />
      <section className="section bg-white">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="section-label">Our Commitment</p>
            <h2 className="section-title mx-auto">Sustainability is in Our DNA</h2>
            <p className="section-subtitle mx-auto text-center">We believe that responsible business creates long-term value — for shareholders, communities, and the planet.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {pillars.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-8 flex items-start gap-5">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-green-800 mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-green-700 text-white rounded-2xl p-8 md:p-12 text-center">
            <h3 className="font-heading font-bold text-2xl mb-4">2030 Sustainability Goals</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[{ g: '30%', l: 'Reduction in water use per tonne of sugar' }, { g: 'Net Zero', l: 'Carbon emissions from estate operations' }, { g: '100%', l: 'Zero-waste factory by 2030' }].map(({ g, l }) => (
                <div key={l}>
                  <div className="text-gold-400 font-heading font-bold text-3xl mb-1">{g}</div>
                  <div className="text-green-200 text-sm">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
