import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const metadata = { title: 'Outgrower Programme' }

const benefits = [
  'Guaranteed market price for your sugarcane harvest',
  'Technical training and agronomic support',
  'Access to subsidised agricultural inputs',
  'Irrigation support and infrastructure development',
  'Crop insurance and risk management assistance',
  'Access to government-supported financing schemes',
]

const steps = [
  { n: '1', title: 'Apply', desc: 'Submit an application through our Agricultural Extension office or this website.' },
  { n: '2', title: 'Assessment', desc: 'Our agronomy team visits your land to assess suitability and soil conditions.' },
  { n: '3', title: 'Agreement', desc: 'Sign a cane supply agreement setting out pricing, delivery terms, and support provisions.' },
  { n: '4', title: 'Plant & Grow', desc: 'Receive planting material, inputs, and technical support. Plant your first crop.' },
  { n: '5', title: 'Harvest & Earn', desc: 'Deliver your cane at agreed rates and receive payment within 30 days of delivery.' },
]

export default function OutgrowerPage() {
  return (
    <PublicLayout>
      <PageHero title="Outgrower Programme" subtitle="Partner with Victoria Sugar and earn a guaranteed income from your land." image="https://media.victoriasugar.ug/images/DJI_20251217122314_0861_D.JPG" breadcrumb="Home / Operations / Outgrower Programme" />
      <section className="section bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <p className="section-label">For Farmers</p>
              <h2 className="section-title">Grow Sugarcane. Earn More.</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our outgrower programme supports over 5,000 smallholder and medium-scale farmers who supply sugarcane
                to Victoria Sugar. We provide everything needed to grow profitable cane — from planting material and agronomic
                advice to a guaranteed buyer at harvest time.
              </p>
              <ul className="space-y-3 mb-8">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{b}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => window.dispatchEvent(new CustomEvent('open-inquiry-modal'))} className="btn-primary">
                Apply Now <ArrowRight size={18} />
              </button>
            </div>
            <img src="https://media.victoriasugar.ug/images/DJI_20251217161456_0929_D.jpg" alt="Outgrower farmers" className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover" />
          </div>

          <h3 className="font-heading font-bold text-2xl text-green-800 mb-8 text-center">How to Join</h3>
          <div className="flex flex-col md:flex-row gap-4">
            {steps.map(({ n, title, desc }) => (
              <div key={n} className="flex-1 card p-5 text-center">
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">{n}</div>
                <h4 className="font-heading font-bold text-green-800 mb-2">{title}</h4>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
