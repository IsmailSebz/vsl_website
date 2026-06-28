import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
import { Shield, Eye, Scale, Users } from 'lucide-react'

export const metadata = { title: 'Corporate Governance' }

const principles = [
  { icon: Shield, title: 'Accountability', description: 'We maintain clear lines of accountability at every level of our organisation, from the Board to operational staff.' },
  { icon: Eye, title: 'Transparency', description: 'We publish regular reports and maintain open communication with stakeholders about our performance and conduct.' },
  { icon: Scale, title: 'Ethical Conduct', description: 'Our Code of Ethics governs every aspect of how we do business — with integrity and respect for all parties.' },
  { icon: Users, title: 'Stakeholder Inclusion', description: 'We actively engage farmers, employees, regulators, and communities in decisions that affect them.' },
]

export default function GovernancePage() {
  return (
    <PublicLayout>
      <PageHero title="Corporate Governance" subtitle="Governing with integrity, transparency, and accountability." breadcrumb="Home / About / Corporate Governance" />
      <section className="section bg-white">
        <div className="container-main">
          <div className="max-w-3xl mb-12">
            <p className="section-label">How We Operate</p>
            <h2 className="section-title">Our Governance Framework</h2>
            <p className="text-gray-600 leading-relaxed">
              Victoria Sugar Limited is committed to the highest standards of corporate governance.
              Our governance framework is designed to protect the interests of shareholders, employees,
              farmers, and the broader public, while enabling strategic decision-making that drives sustainable growth.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
            {principles.map(({ icon: Icon, title, description }) => (
              <div key={title} className="card p-8 flex items-start gap-5">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-green-800 mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-green-50 rounded-2xl p-8">
            <h3 className="font-heading font-bold text-green-800 text-xl mb-4">Board Committees</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Audit & Risk Committee', 'Remuneration Committee', 'Sustainability & CSR Committee'].map((c) => (
                <div key={c} className="bg-white rounded-xl p-5 border border-green-100 shadow-sm">
                  <h4 className="font-semibold text-green-700 text-sm">{c}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
