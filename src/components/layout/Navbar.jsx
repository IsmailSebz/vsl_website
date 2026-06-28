'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About Us', href: '/about' },
      { label: 'Leadership Team', href: '/about/leadership' },
      { label: 'Board of Directors', href: '/about/board' },
      { label: 'Corporate Governance', href: '/about/governance' },
      { label: 'Awards & Certifications', href: '/about/awards' },
      { label: 'Annual Reports', href: '/about/annual-reports' },
      { label: 'Investor Relations', href: '/about/investors' },
    ],
  },
  {
    label: 'Our Products',
    href: '/products',
    children: [
      { label: 'All Products', href: '/products' },
      { label: 'Sugar', href: '/products/sugar' },
      { label: 'Extra Natural Alcohol', href: '/products/alcohol' },
      { label: 'Ethanol', href: '/products/ethanol' },
      { label: 'Electricity', href: '/products/electricity' },
      { label: 'Product Specifications', href: '/products/specifications' },
      { label: 'Where to Buy', href: '/products/where-to-buy' },
    ],
  },
  {
    label: 'Operations',
    href: '/operations',
    children: [
      { label: 'Our Factory', href: '/operations/factory' },
      { label: 'Quality Assurance', href: '/operations/quality' },
      { label: 'Distribution Network', href: '/operations/distribution' },
      { label: 'Outgrower Programme', href: '/operations/outgrower' },
      { label: 'Nucleus Estate', href: '/operations/nucleus-estate' },
      { label: 'Farmer Resources', href: '/operations/farmer-resources' },
    ],
  },
  {
    label: 'Sustainability',
    href: '/sustainability',
    children: [
      { label: 'Sustainability', href: '/sustainability' },
      { label: 'Corporate Social Responsibility', href: '/sustainability/csr' },
      { label: 'Community Development', href: '/sustainability/community' },
      { label: 'Health & Safety', href: '/sustainability/health-safety' },
      { label: 'Education Initiatives', href: '/sustainability/education' },
    ],
  },
  {
    label: 'Media',
    href: '/news',
    children: [
      { label: 'News & Media', href: '/news' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Press Room', href: '/press-room' },
      { label: 'Video Tour', href: '/video-tour' },
      { label: 'Downloads', href: '/downloads' },
      { label: 'Events', href: '/events' },
    ],
  },
  {
    label: 'Business',
    href: '/tenders',
    children: [
      { label: 'Tenders & Procurement', href: '/tenders' },
      { label: 'Careers', href: '/careers' },
      { label: 'Bulk & Industrial Orders', href: '/bulk-orders' },
      { label: 'Export Markets', href: '/export' },
      { label: 'FAQs', href: '/faqs' },
    ],
  },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '256781989621'

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:block bg-green-900 text-white text-sm py-2">
        <div className="container-main flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:+256781989621" className="flex items-center gap-1.5 hover:text-gold-400 transition-colors">
              <Phone size={13} /> +256 781 989 621
            </a>
            <a href="mailto:info@victoriasugar.com" className="flex items-center gap-1.5 hover:text-gold-400 transition-colors">
              <Mail size={13} /> info@victoriasugar.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer"
               className="bg-green-700 hover:bg-green-600 px-3 py-1 rounded text-xs font-medium transition-colors">
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-white shadow-sm'
      }`}>
        <div className="container-main">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="relative w-12 h-12 lg:w-14 lg:h-14">
                <Image
                  src="/logo.jpg"
                  alt="Victoria Sugar Limited"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <div className="text-green-700 font-heading font-bold text-base lg:text-lg leading-tight">
                  Victoria Sugar
                </div>
                <div className="text-gold-500 text-xs font-medium tracking-wide">Limited</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700
                               hover:text-green-600 transition-colors rounded-md hover:bg-green-50"
                  >
                    {link.label}
                    {link.children && <ChevronDown size={14} />}
                  </Link>

                  {link.children && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 w-56 bg-white border border-gray-100
                                    shadow-xl rounded-xl py-2 z-50 animate-fade-in">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50
                                     hover:text-green-600 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white text-sm font-semibold
                           rounded-lg hover:bg-[#20b858] transition-colors shadow-sm"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </a>
              <InquiryButton />
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white max-h-[75vh] overflow-y-auto">
            <div className="container-main py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      onClick={() => !link.children && setIsOpen(false)}
                      className="flex-1 py-2.5 px-3 text-gray-700 font-medium hover:text-green-600 rounded-lg hover:bg-green-50"
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                        className="p-2 text-gray-500"
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${mobileExpanded === link.label ? 'rotate-180' : ''}`}
                        />
                      </button>
                    )}
                  </div>
                  {link.children && mobileExpanded === link.label && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-green-100 pl-3">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-2 px-2 text-sm text-gray-600 hover:text-green-600 rounded"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {/* Mobile CTA */}
              <div className="pt-4 flex flex-col gap-3 border-t border-gray-100 mt-3">
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary justify-center bg-[#25D366] hover:bg-[#20b858]"
                  onClick={() => setIsOpen(false)}
                >
                  WhatsApp Us
                </a>
                <InquiryButton mobile onClick={() => setIsOpen(false)} />
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

// Inline button that opens inquiry modal
function InquiryButton({ mobile, onClick }) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('open-inquiry-modal'))
    onClick?.()
  }
  return (
    <button
      onClick={handleClick}
      className={mobile ? 'btn-secondary justify-center' : 'btn-secondary text-sm px-4 py-2'}
    >
      Send Inquiry
    </button>
  )
}
