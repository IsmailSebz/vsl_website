import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'

export const metadata = { title: 'Sitemap' }

const sections = [
  { title: 'Company', links: [{ l: 'Home', h: '/' }, { l: 'About Us', h: '/about' }, { l: 'Leadership Team', h: '/about/leadership' }, { l: 'Board of Directors', h: '/about/board' }, { l: 'Corporate Governance', h: '/about/governance' }, { l: 'Annual Reports', h: '/about/annual-reports' }, { l: 'Awards & Certifications', h: '/about/awards' }, { l: 'Investor Relations', h: '/about/investors' }] },
  { title: 'Products', links: [{ l: 'All Products', h: '/products' }, { l: 'Sugar', h: '/products/sugar' }, { l: 'Extra Natural Alcohol', h: '/products/alcohol' }, { l: 'Ethanol', h: '/products/ethanol' }, { l: 'Electricity', h: '/products/electricity' }, { l: 'Specifications', h: '/products/specifications' }, { l: 'Where to Buy', h: '/products/where-to-buy' }] },
  { title: 'Operations', links: [{ l: 'Our Factory', h: '/operations/factory' }, { l: 'Quality Assurance', h: '/operations/quality' }, { l: 'Distribution Network', h: '/operations/distribution' }, { l: 'Outgrower Programme', h: '/operations/outgrower' }, { l: 'Nucleus Estate', h: '/operations/nucleus-estate' }, { l: 'Farmer Resources', h: '/operations/farmer-resources' }] },
  { title: 'Sustainability', links: [{ l: 'Sustainability', h: '/sustainability' }, { l: 'CSR', h: '/sustainability/csr' }, { l: 'Community Development', h: '/sustainability/community' }, { l: 'Health & Safety', h: '/sustainability/health-safety' }, { l: 'Education Initiatives', h: '/sustainability/education' }] },
  { title: 'Media', links: [{ l: 'News & Media', h: '/news' }, { l: 'Gallery', h: '/gallery' }, { l: 'Press Room', h: '/press-room' }, { l: 'Video Tour', h: '/video-tour' }, { l: 'Downloads', h: '/downloads' }, { l: 'Events', h: '/events' }] },
  { title: 'Business', links: [{ l: 'Tenders & Procurement', h: '/tenders' }, { l: 'Careers', h: '/careers' }, { l: 'Bulk Orders', h: '/bulk-orders' }, { l: 'Export Markets', h: '/export' }, { l: 'FAQs', h: '/faqs' }, { l: 'Feedback', h: '/feedback' }, { l: 'Contact Us', h: '/contact' }] },
]

export default function SitemapPage() {
  return (
    <PublicLayout>
      <PageHero title="Sitemap" subtitle="Complete directory of all pages on victoriasugar.ug" breadcrumb="Home / Sitemap" />
      <section className="section bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {sections.map((s) => (
              <div key={s.title}>
                <h3 className="font-heading font-bold text-green-700 text-sm uppercase tracking-wider mb-3 border-b border-green-100 pb-2">{s.title}</h3>
                <ul className="space-y-1.5">{s.links.map(({ l, h }) => (<li key={h}><Link href={h} className="text-gray-600 hover:text-green-600 text-sm transition-colors">{l}</Link></li>))}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
