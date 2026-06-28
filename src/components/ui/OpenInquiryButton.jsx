'use client'
export default function OpenInquiryButton({ label, className = 'btn-primary', children }) {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('open-inquiry-modal'))}
      className={className}
    >
      {children ?? label}
    </button>
  )
}
