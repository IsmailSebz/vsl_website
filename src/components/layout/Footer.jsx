import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react'

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Products', href: '/products' },
  { label: 'Outgrower Programme', href: '/operations/outgrower' },
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'News & Media', href: '/news' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Tenders', href: '/tenders' },
  { label: 'Careers', href: '/careers' },
]

const productLinks = [
  { label: 'Sugar', href: '/products/sugar' },
  { label: 'Extra Natural Alcohol', href: '/products/alcohol' },
  { label: 'Ethanol', href: '/products/ethanol' },
  { label: 'Electricity', href: '/products/electricity' },
  { label: 'Bulk Orders', href: '/bulk-orders' },
  { label: 'Export Markets', href: '/export' },
]

export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '256781989621'

  return (
    <footer className="bg-green-900 text-white">
      {/* Main footer */}
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1 — Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12 bg-white rounded-lg p-1">
                <Image src="/logo.jpg" alt="Victoria Sugar Limited" fill className="object-contain p-0.5" />
              </div>
              <div>
                <div className="font-heading font-bold text-white text-lg leading-tight">Victoria Sugar</div>
                <div className="text-gold-400 text-xs">Limited</div>
              </div>
            </div>
            <p className="text-green-200 text-sm leading-relaxed mb-6">
              Sweetening Uganda, Powering Africa. A leading producer of sugar, ethanol, alcohol and electricity,
              committed to sustainable growth and community development.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="w-9 h-9 flex items-center justify-center rounded-full bg-green-700 hover:bg-gold-400 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 flex items-center justify-center rounded-full bg-green-700 hover:bg-gold-400 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 flex items-center justify-center rounded-full bg-green-700 hover:bg-gold-400 transition-colors">
                <Linkedin size={16} />
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 flex items-center justify-center rounded-full bg-green-700 hover:bg-gold-400 transition-colors">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-gold-400 text-sm uppercase tracking-wider mb-5">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-green-200 hover:text-gold-400 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold-400 flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Products */}
          <div>
            <h3 className="font-heading font-semibold text-gold-400 text-sm uppercase tracking-wider mb-5">Our Products</h3>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-green-200 hover:text-gold-400 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold-400 flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h3 className="font-heading font-semibold text-gold-400 text-sm uppercase tracking-wider mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold-400 flex-shrink-0 mt-0.5" />
                <span className="text-green-200 text-sm">P.O. Box 1, Kakira, Jinja, Uganda</span>
              </li>
              <li>
                <a href="tel:+256781989621" className="flex items-center gap-3 text-green-200 hover:text-gold-400 text-sm transition-colors">
                  <Phone size={16} className="text-gold-400 flex-shrink-0" />
                  +256 781 989 621
                </a>
              </li>
              <li>
                <a href="mailto:info@victoriasugar.com" className="flex items-center gap-3 text-green-200 hover:text-gold-400 text-sm transition-colors">
                  <Mail size={16} className="text-gold-400 flex-shrink-0" />
                  info@victoriasugar.com
                </a>
              </li>
            </ul>

            {/* Footer CTAs */}
            <div className="mt-6 space-y-2">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] hover:bg-[#20b858] text-white text-sm font-semibold rounded-lg transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Chat on WhatsApp
              </a>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-inquiry-modal'))}
                className="w-full py-2.5 border border-green-500 hover:border-gold-400 text-green-200 hover:text-gold-400 text-sm font-semibold rounded-lg transition-colors"
              >
                Send an Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-green-800">
        <div className="container-main py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-green-400 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Victoria Sugar Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/sitemap" className="text-green-400 hover:text-gold-400 text-xs transition-colors">Sitemap</Link>
            <Link href="/faqs" className="text-green-400 hover:text-gold-400 text-xs transition-colors">FAQs</Link>
            <Link href="/contact" className="text-green-400 hover:text-gold-400 text-xs transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
