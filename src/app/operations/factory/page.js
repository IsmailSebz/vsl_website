import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'

export const metadata = { title: 'Our Factory' }

const steps = [
  { step: '01', title: 'Cane Reception', desc: 'Sugarcane is received from the nucleus estate and outgrower farmers, weighed, and sampled for juice quality.' },
  { step: '02', title: 'Milling', desc: 'Cane is shredded and crushed through a series of mills to extract the juice. Bagasse is collected for energy generation.' },
  { step: '03', title: 'Juice Clarification', desc: 'The extracted juice is heated, limed, and clarified to remove impurities before evaporation.' },
  { step: '04', title: 'Evaporation & Crystallisation', desc: 'Clarified juice is evaporated to form syrup, then crystallised in vacuum pans to produce raw sugar crystals.' },
  { step: '05', title: 'Centrifugation', desc: 'Crystals are separated from molasses in centrifuges. Molasses is collected for ethanol and alcohol production.' },
  { step: '06', title: 'Refining & Packaging', desc: 'Raw sugar is refined to produce white sugar, then packed in various consumer and industrial pack sizes.' },
]

export default function FactoryPage() {
  return (
    <PublicLayout>
      <PageHero title="Our Factory" subtitle="State-of-the-art sugar processing and co-generation facilities at the heart of our operations." image="https://media.victoriasugar.ug/images/DJI_20251217161456_0929_D.jpg" breadcrumb="Home / Operations / Our Factory" />
      <section className="section bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <p className="section-label">Our Facility</p>
              <h2 className="section-title">6,500 TCD Processing Capacity</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our factory is one of the most modern sugar processing facilities in East Africa, with a crushing capacity of
                6,500 tonnes of cane per day (TCD). The plant is fully integrated, processing cane into sugar, ethanol, alcohol, and electricity
                within a single site.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Crushing Capacity', value: '6,500 TCD' },
                  { label: 'Sugar Recovery', value: '11.5% of cane' },
                  { label: 'Ethanol Capacity', value: '40,000 L/day' },
                  { label: 'Power Generation', value: '50 MW' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-green-50 rounded-xl p-4">
                    <div className="text-gray-500 text-xs">{label}</div>
                    <div className="font-bold text-green-800 text-sm mt-1">{value}</div>
                  </div>
                ))}
              </div>
            </div>
            <img src="https://media.victoriasugar.ug/images/DJI_20251217161734_0934_D.jpg" alt="Factory" className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover" />
          </div>

          <h3 className="font-heading font-bold text-2xl text-green-800 mb-8 text-center">The Production Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="card p-6">
                <div className="text-4xl font-heading font-bold text-green-100 mb-2">{step}</div>
                <h4 className="font-heading font-bold text-green-800 mb-2">{title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
