import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'

export const metadata = { title: 'Leadership Team' }

const team = [
  { name: 'Mr. John Mukasa', title: 'Chief Executive Officer', bio: 'Over 25 years of experience in agro-industrial management across East Africa. Leads the company\'s strategic direction and operational excellence.' },
  { name: 'Ms. Grace Namukasa', title: 'Chief Financial Officer', bio: 'A seasoned financial executive with expertise in corporate finance, investment strategy, and risk management in the agricultural sector.' },
  { name: 'Dr. Peter Ochieng', title: 'Chief Operations Officer', bio: 'Expert in sugarcane agronomy and industrial processing. Oversees all production, factory operations, and quality assurance systems.' },
  { name: 'Ms. Sarah Apio', title: 'Director of Human Resources', bio: 'Leads talent acquisition, employee development, and organisational culture across a workforce of over 3,000 employees.' },
  { name: 'Mr. David Nkurunziza', title: 'Director of Sales & Marketing', bio: 'Drives domestic and export sales strategies for all four product lines, managing relationships with key institutional buyers.' },
  { name: 'Eng. Robert Ssemanda', title: 'Director of Engineering', bio: 'Manages the maintenance and development of the company\'s large-scale industrial plant and infrastructure.' },
]

export default function LeadershipPage() {
  return (
    <PublicLayout>
      <PageHero
        title="Leadership Team"
        subtitle="Experienced leaders guiding Victoria Sugar Limited towards sustainable growth and excellence."
        image="https://media.victoriasugar.ug/images/DJI_20251217161456_0929_D.jpg"
        breadcrumb="Home / About / Leadership Team"
      />
      <section className="section bg-white">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="section-label">Meet the Team</p>
            <h2 className="section-title mx-auto">Executive Leadership</h2>
            <p className="section-subtitle mx-auto text-center">
              Our leadership team brings decades of combined experience in agro-industry, finance, and sustainable development.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((person) => (
              <div key={person.name} className="card p-8 text-center group">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-700 font-bold text-2xl">{person.name.split(' ')[1][0]}</span>
                </div>
                <h3 className="font-heading font-bold text-green-800 text-lg">{person.name}</h3>
                <p className="text-gold-500 text-sm font-medium mb-3">{person.title}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
