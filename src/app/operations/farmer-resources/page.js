import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
import { Download } from 'lucide-react'

export const metadata = { title: 'Farmer Resources' }

const resources = [
  { title: 'Sugarcane Planting Guide', desc: 'Step-by-step guide for new outgrower farmers on land preparation, planting, and early crop management.', type: 'PDF Guide' },
  { title: 'Fertiliser Application Calendar', desc: 'Recommended fertiliser schedule for each growth stage of sugarcane production.', type: 'PDF Guide' },
  { title: 'Pest & Disease Management', desc: 'Identification and management guide for common sugarcane pests and diseases in Uganda.', type: 'PDF Guide' },
  { title: 'Harvesting Best Practices', desc: 'Guidelines for optimum harvest timing, cutting techniques, and post-harvest handling.', type: 'PDF Guide' },
  { title: 'Water Management Guide', desc: 'Irrigation scheduling and water conservation practices for sugarcane farming.', type: 'PDF Guide' },
]

export default function FarmerResourcesPage() {
  return (
    <PublicLayout>
      <PageHero title="Farmer Resources" subtitle="Tools, guides, and information to help outgrower farmers grow better cane." breadcrumb="Home / Operations / Farmer Resources" />
      <section className="section bg-white">
        <div className="container-main">
          <p className="text-gray-600 max-w-2xl mb-10">Download our technical guides and resources developed by our agronomy team to help you achieve maximum yields from your sugarcane farm.</p>
          <div className="space-y-4">
            {resources.map((r) => (
              <div key={r.title} className="card p-6 flex items-center gap-5">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">📄</div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-green-800">{r.title}</h3>
                  <p className="text-gray-500 text-sm">{r.desc}</p>
                </div>
                <button className="flex items-center gap-1.5 text-green-600 text-sm font-semibold flex-shrink-0">
                  <Download size={15} /> {r.type}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
