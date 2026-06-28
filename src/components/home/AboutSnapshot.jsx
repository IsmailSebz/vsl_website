import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

const highlights = [
  'ISO-certified production facilities',
  'Sustainable sugarcane farming practices',
  'Committed to community development',
  'Supplying regional and export markets',
]

export default function AboutSnapshot() {
  return (
    <section className="section bg-white">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src="https://media.victoriasugar.ug/images/DJI_20251217122121_0858_D.jpg"
              alt="Victoria Sugar Estate"
              className="w-full rounded-2xl shadow-2xl object-cover aspect-[4/3]"
            />
            <div className="absolute -bottom-6 -right-6 bg-green-700 text-white rounded-2xl p-5 shadow-xl hidden md:block">
              <div className="font-heading font-bold text-3xl">25+</div>
              <div className="text-green-200 text-sm">Years of Excellence</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="section-label">Who We Are</p>
            <h2 className="section-title">Uganda's Leading Agro-Industrial Company</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Victoria Sugar Limited is one of Uganda's most prominent agro-industrial companies,
              located on the fertile shores of Lake Victoria. We process sugarcane into a range of
              high-quality products that power homes, fuel industry, and sweeten lives across the region.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Founded over two decades ago, we have grown from a single mill into a fully integrated
              agro-industrial complex — operating a nucleus estate, outgrower programme, and a suite of
              downstream processing plants.
            </p>

            <ul className="space-y-3 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <Link href="/about" className="btn-primary">
              Learn Our Story <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
