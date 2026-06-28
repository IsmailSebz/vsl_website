import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const products = [
  {
    name: 'Sugar',
    href: '/products/sugar',
    description: 'Premium refined and raw sugar for household, commercial and industrial use. Available in multiple grades and packaging options.',
    icon: '🍬',
    color: 'from-amber-50 to-amber-100',
    border: 'border-amber-200',
    tag: 'Core Product',
  },
  {
    name: 'Extra Natural Alcohol',
    href: '/products/alcohol',
    description: 'High-purity extra neutral alcohol distilled from molasses, suitable for beverage, pharmaceutical and industrial applications.',
    icon: '🧪',
    color: 'from-blue-50 to-blue-100',
    border: 'border-blue-200',
    tag: 'By-Product',
  },
  {
    name: 'Ethanol',
    href: '/products/ethanol',
    description: 'Fuel-grade ethanol produced from sugarcane molasses — a clean, renewable energy source for blending and industrial use.',
    icon: '⚗️',
    color: 'from-purple-50 to-purple-100',
    border: 'border-purple-200',
    tag: 'By-Product',
  },
  {
    name: 'Electricity',
    href: '/products/electricity',
    description: 'Green electricity co-generated from bagasse — sugarcane fibre — powering our operations and feeding surplus into the national grid.',
    icon: '⚡',
    color: 'from-green-50 to-green-100',
    border: 'border-green-200',
    tag: 'Co-generation',
  },
]

export default function ProductsSection() {
  return (
    <section className="section bg-gray-50">
      <div className="container-main">
        <div className="text-center mb-12">
          <p className="section-label">What We Produce</p>
          <h2 className="section-title mx-auto">Our Products</h2>
          <p className="section-subtitle mx-auto text-center">
            From sugarcane to shelf — we produce four key products that serve households,
            industry, and the energy sector across Uganda and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.name} href={product.href} className="group card hover:scale-[1.02] transition-transform duration-300">
              <div className={`bg-gradient-to-br ${product.color} p-6 border-b ${product.border}`}>
                <div className="text-4xl mb-3">{product.icon}</div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{product.tag}</span>
                <h3 className="font-heading font-bold text-xl text-green-800 mt-1">{product.name}</h3>
              </div>
              <div className="p-5">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{product.description}</p>
                <div className="flex items-center gap-1.5 text-green-600 text-sm font-semibold group-hover:gap-2.5 transition-all">
                  Learn more <ArrowRight size={15} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/products" className="btn-secondary">
            View All Products <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
