import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'

export const metadata = { title: 'Bulk & Industrial Orders' }
export default function BulkOrdersPage() {
  return (
    <PublicLayout>
      <PageHero title="Bulk & Industrial Orders" subtitle="Supply agreements for manufacturers, food processors, and industrial buyers." breadcrumb="Home / Bulk & Industrial Orders" />
      <section className="section bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="section-label">For Business</p>
              <h2 className="section-title">Industrial-Scale Supply</h2>
              <p className="text-gray-600 leading-relaxed mb-6">Victoria Sugar supplies industrial quantities of sugar, ethanol, and extra natural alcohol to food and beverage manufacturers, pharmaceutical companies, chemical processors, and fuel blenders across Uganda and the region.</p>
              <div className="space-y-3">{['Flexible minimum order quantities', 'Contract supply agreements available', 'Consistent quality with batch certification', 'Delivery to your facility or ex-factory collection', 'Dedicated account manager for industrial clients'].map((i) => (<div key={i} className="flex items-start gap-3"><span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2" /><span className="text-gray-600 text-sm">{i}</span></div>))}</div>
              <button onClick={() => window.dispatchEvent(new CustomEvent('open-inquiry-modal'))} className="btn-primary mt-8">Request a Quote</button>
            </div>
            <div className="space-y-4">
              {[{ p: 'Sugar', specs: 'ICUMSA 45, 150, 800 | Min: 1 tonne | Bags or bulk' }, { p: 'Extra Natural Alcohol', specs: '96.5%+ purity | Min: 1,000L | Drums or tanker' }, { p: 'Anhydrous Ethanol', specs: '99.9% purity | Min: 5,000L | Tanker' }].map(({ p, specs }) => (
                <div key={p} className="card p-5">
                  <h3 className="font-heading font-bold text-green-800 mb-1">{p}</h3>
                  <p className="text-gray-500 text-sm">{specs}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
