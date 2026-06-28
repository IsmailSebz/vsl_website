import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = { title: 'Sugar' }

const grades = [
  { name: 'Premium Refined White Sugar', spec: 'ICUMSA 45', use: 'Household, confectionery, beverages' },
  { name: 'Raw Cane Sugar', spec: 'ICUMSA 800-1200', use: 'Industrial processing, brewing' },
  { name: 'Brown Sugar', spec: 'ICUMSA 600-800', use: 'Baking, specialty food production' },
  { name: 'Industrial Grade Sugar', spec: 'ICUMSA 150', use: 'Pharmaceutical, chemical processing' },
]

export default function SugarPage() {
  return (
    <PublicLayout>
      <PageHero title="Sugar" subtitle="Premium quality sugar produced to international standards for household, commercial and industrial use." breadcrumb="Home / Products / Sugar" />
      <section className="section bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <p className="section-label">Our Core Product</p>
              <h2 className="section-title">World-Class Sugar Production</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Victoria Sugar Limited produces a range of sugar grades from our state-of-the-art milling and refinery.
                Our sugar is processed under strict quality controls certified by the Uganda National Bureau of Standards (UNBS)
                and meets international ICUMSA standards.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                We supply sugar across Uganda, East Africa, and select international markets through a robust
                distribution network of over 200 registered distributors.
              </p>
              <Link href="/products/where-to-buy" className="btn-primary">Where to Buy <ArrowRight size={18} /></Link>
            </div>
            <img src="https://media.victoriasugar.ug/images/DJI_20251217161456_0929_D.jpg" alt="Sugar production" className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover" />
          </div>
          <h3 className="font-heading font-bold text-2xl text-green-800 mb-6">Available Grades</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {grades.map((g) => (
              <div key={g.name} className="card p-6">
                <h4 className="font-heading font-bold text-green-700 mb-1">{g.name}</h4>
                <p className="text-gold-500 text-sm font-medium mb-1">ICUMSA: {g.spec}</p>
                <p className="text-gray-500 text-sm">Uses: {g.use}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
