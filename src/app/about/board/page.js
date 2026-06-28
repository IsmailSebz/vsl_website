import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'

export const metadata = { title: 'Board of Directors' }

const board = [
  { name: 'Hon. James Wamala', title: 'Board Chairman', background: 'Former Minister of Agriculture with extensive public sector and agribusiness expertise.' },
  { name: 'Mrs. Florence Nakigozi', title: 'Non-Executive Director', background: 'Accomplished business leader and investor with a portfolio spanning manufacturing and real estate.' },
  { name: 'Mr. Rajesh Patel', title: 'Non-Executive Director', background: 'International agro-industry expert with over 30 years of experience in sugar production across three continents.' },
  { name: 'Dr. Emmanuel Tumwine', title: 'Independent Director', background: 'Renowned economist and academic specialising in East African trade, policy, and development finance.' },
  { name: 'Ms. Christine Akello', title: 'Independent Director', background: 'Legal practitioner and corporate governance specialist. Chairs the Board Audit & Risk Committee.' },
]

export default function BoardPage() {
  return (
    <PublicLayout>
      <PageHero
        title="Board of Directors"
        subtitle="Our Board provides strategic oversight and ensures the highest standards of corporate governance."
        breadcrumb="Home / About / Board of Directors"
      />
      <section className="section bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {board.map((member) => (
              <div key={member.name} className="card p-8 flex items-start gap-5">
                <div className="w-16 h-16 bg-green-700 text-white rounded-xl flex items-center justify-center flex-shrink-0 text-xl font-bold">
                  {member.name.split(' ')[1][0]}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-green-800 text-lg">{member.name}</h3>
                  <p className="text-gold-500 text-sm font-medium mb-2">{member.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{member.background}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
