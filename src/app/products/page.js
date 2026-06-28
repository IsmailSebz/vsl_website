import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = { title: 'Our Products' }

const products = [
  { name: 'Sugar', href: '/products/sugar', emoji: '🍬', desc: 'Premium refined and raw sugar for household, commercial and industrial use, available in multiple grades.' },
  { name: 'Extra Natural Alcohol', href: '/products/alcohol', emoji: '🧪', desc: 'High-purity extra neutral alcohol for beverage, pharmaceutical and industrial applications.' },
  { name: 'Ethanol', href: '/products/ethanol', emoji: '⚗️', desc: 'Fuel-grade ethanol from sugarcane molasses — a clean, renewable energy source for blending.' },
  { name: 'Electricity', href: '/products/electricity', emoji: '⚡', desc: 'Green electricity co-generated from bagasse, powering our estate and feeding the national grid.' },
]

export default function ProductsPage() {
  return (
    <PublicLayout>
      <PageHero
        title="Our Products"
        subtitle="From sugarcane to shelf — four world-class products serving Uganda and the region."
        image="https://media.victoriasugar.ug/images/DJI_20251217161734_0934_D.jpg"
        breadcrumb="Home / Our Products"
      />
      <section className="section bg-white">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="section-label">What We Make</p>
            <h2 className="section-title mx-auto">A Fully Integrated Product Range</h2>
            <p className="section-subtitle mx-auto text-center">
              Every part of the sugarcane plant is put to use. Our integrated approach means zero waste
              and maximum value from each tonne of cane we process.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((p) => (
              <Link key={p.name} href={p.href} className="card group p-8 flex items-start gap-6">
                <div className="text-5xl">{p.emoji}</div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-2xl text-green-800 mb-2">{p.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex items-center gap-1.5 text-green-600 font-semibold text-sm group-hover:gap-3 transition-all">
                    Learn more <ArrowRight size={15} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section-sm bg-green-50">
        <div className="container-main text-center">
          <h3 className="font-heading font-bold text-2xl text-green-800 mb-4">Looking to Buy in Bulk?</h3>
          <p className="text-gray-500 mb-6">We supply industrial quantities to manufacturers, distributors, and export buyers.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/bulk-orders" className="btn-primary">Bulk Orders <ArrowRight size={18} /></Link>
            <Link href="/export" className="btn-secondary">Export Enquiries</Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
