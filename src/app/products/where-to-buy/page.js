import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'

export const metadata = { title: 'Where to Buy' }

const distributors = [
  { region: 'Central Uganda', areas: 'Kampala, Wakiso, Mukono, Mpigi', contact: '+256 700 000 001' },
  { region: 'Eastern Uganda', areas: 'Jinja, Mbale, Tororo, Iganga', contact: '+256 700 000 002' },
  { region: 'Western Uganda', areas: 'Mbarara, Fort Portal, Kasese, Kabale', contact: '+256 700 000 003' },
  { region: 'Northern Uganda', areas: 'Gulu, Lira, Arua, Kitgum', contact: '+256 700 000 004' },
  { region: 'Export Markets', areas: 'Kenya, Tanzania, Rwanda, DRC, South Sudan', contact: 'export@victoriasugar.com' },
]

export default function WhereToBuyPage() {
  return (
    <PublicLayout>
      <PageHero title="Where to Buy" subtitle="Find Victoria Sugar products near you through our nationwide distribution network." breadcrumb="Home / Products / Where to Buy" />
      <section className="section bg-white">
        <div className="container-main">
          <p className="text-gray-600 max-w-2xl mb-10">
            Victoria Sugar products are available through our network of authorised distributors across Uganda and in selected
            export markets. Contact your nearest regional distributor below.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {distributors.map((d) => (
              <div key={d.region} className="card p-6">
                <h3 className="font-heading font-bold text-green-800 text-lg mb-2">{d.region}</h3>
                <p className="text-gray-500 text-sm mb-3">{d.areas}</p>
                <p className="text-green-600 text-sm font-medium">{d.contact}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-green-50 rounded-2xl p-8 text-center">
            <h3 className="font-heading font-bold text-green-800 text-xl mb-3">Become an Authorised Distributor</h3>
            <p className="text-gray-500 mb-5">Interested in distributing Victoria Sugar products in your area?</p>
            <button onClick={() => window.dispatchEvent(new CustomEvent('open-inquiry-modal'))} className="btn-primary">
              Send an Inquiry
            </button>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
