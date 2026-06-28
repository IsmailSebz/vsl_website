import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
import { Download } from 'lucide-react'

export const metadata = { title: 'Product Specifications' }

const specs = [
  { product: 'Premium Refined White Sugar', params: [['ICUMSA', '≤ 45 IU'], ['Moisture', '≤ 0.04%'], ['Ash Content', '≤ 0.04%'], ['Polarisation', '≥ 99.8°Z']] },
  { product: 'Extra Natural Alcohol (ENA)', params: [['Purity', '≥ 96.5% v/v'], ['Methanol', '≤ 5 mg/100 mL'], ['Acidity', '≤ 20 mg/L'], ['Colour', 'Clear, colourless']] },
  { product: 'Anhydrous Ethanol', params: [['Purity', '≥ 99.9% v/v'], ['Water Content', '≤ 0.1%'], ['Standard', 'ASTM D4806'], ['Colour', 'Clear']] },
]

export default function SpecificationsPage() {
  return (
    <PublicLayout>
      <PageHero title="Product Specifications" subtitle="Detailed technical specifications for all Victoria Sugar products." breadcrumb="Home / Products / Specifications" />
      <section className="section bg-white">
        <div className="container-main">
          <div className="space-y-10">
            {specs.map((s) => (
              <div key={s.product} className="card overflow-hidden">
                <div className="bg-green-700 text-white px-6 py-4 flex items-center justify-between">
                  <h3 className="font-heading font-bold">{s.product}</h3>
                  <button className="flex items-center gap-1.5 text-green-200 hover:text-white text-sm">
                    <Download size={15} /> Spec Sheet
                  </button>
                </div>
                <table className="w-full">
                  <thead className="bg-green-50">
                    <tr>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Parameter</th>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Specification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {s.params.map(([param, value], i) => (
                      <tr key={param} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-3 text-sm text-gray-700">{param}</td>
                        <td className="px-6 py-3 text-sm font-medium text-green-700">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
