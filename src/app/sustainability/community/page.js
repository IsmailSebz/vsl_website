import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
export const metadata = { title: 'Community Development' }
export default function CommunityPage() {
  return (
    <PublicLayout>
      <PageHero title="Community Development" subtitle="Transforming lives and building stronger communities around our operations." breadcrumb="Home / Sustainability / Community Development" />
      <section className="section bg-white">
        <div className="container-main max-w-3xl">
          <p className="section-label">Our Impact</p>
          <h2 className="section-title">Stronger Communities, Shared Prosperity</h2>
          <p className="text-gray-600 leading-relaxed mb-6">Victoria Sugar employs over 3,000 people and indirectly supports the livelihoods of more than 25,000 people through our outgrower programme and supply chain. We believe that the growth of our business must translate into tangible improvements in the lives of our neighbours.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[{ n: '25,000+', l: 'Livelihoods Supported' }, { n: 'UGX 2B+', l: 'Annual CSR Investment' }, { n: '12', l: 'Schools Supported' }, { n: '8', l: 'Water Boreholes Drilled' }].map(({ n, l }) => (
              <div key={l} className="card p-6 text-center">
                <div className="font-heading font-bold text-3xl text-green-700">{n}</div>
                <div className="text-gray-500 text-sm mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
