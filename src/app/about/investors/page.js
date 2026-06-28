import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'
import { ArrowRight, TrendingUp, BarChart2, FileText } from 'lucide-react'

export const metadata = { title: 'Investor Relations' }

export default function InvestorsPage() {
  return (
    <PublicLayout>
      <PageHero title="Investor Relations" subtitle="Transparent financial information for our shareholders and investment partners." breadcrumb="Home / About / Investor Relations" />
      <section className="section bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {[
              { icon: TrendingUp, label: 'Revenue Growth', value: '18%', sub: 'Year-on-year 2025' },
              { icon: BarChart2, label: 'Production Capacity', value: '6,500 TCD', sub: 'Tonnes Crushed Per Day' },
              { icon: FileText, label: 'Export Revenue', value: '$12M+', sub: 'Annual 2025' },
            ].map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className="card p-8 text-center">
                <Icon size={28} className="text-green-600 mx-auto mb-3" />
                <div className="font-heading font-bold text-3xl text-green-800 mb-1">{value}</div>
                <div className="font-semibold text-gray-700 text-sm">{label}</div>
                <div className="text-gray-400 text-xs mt-1">{sub}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-heading font-bold text-2xl text-green-800 mb-4">Investment Highlights</h2>
              <ul className="space-y-3 text-gray-600 text-sm">
                {[
                  'Diversified product portfolio — sugar, ethanol, alcohol, electricity',
                  'Strategic location with abundant sugarcane catchment area',
                  'Strong outgrower base providing raw material security',
                  'Growing regional and export market presence',
                  'Experienced management team with a proven track record',
                  'Commitment to ESG principles and sustainable practices',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-gold-400 rounded-full flex-shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-heading font-bold text-2xl text-green-800 mb-4">Contact Investor Relations</h2>
              <p className="text-gray-600 text-sm mb-6">
                For shareholder enquiries, financial reports, or investment information,
                please contact our Investor Relations office.
              </p>
              <div className="bg-green-50 rounded-xl p-5 text-sm text-gray-600 space-y-2">
                <p><strong>Email:</strong> investors@victoriasugar.com</p>
                <p><strong>Phone:</strong> +256 781 989 621</p>
                <p><strong>Address:</strong> P.O. Box 1, Kakira, Jinja, Uganda</p>
              </div>
              <Link href="/about/annual-reports" className="btn-primary mt-6">
                View Annual Reports <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
