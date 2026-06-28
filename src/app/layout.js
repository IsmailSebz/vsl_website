import './globals.css'

export const metadata = {
  title: {
    default: 'Victoria Sugar Limited',
    template: '%s | Victoria Sugar Limited',
  },
  description:
    'Victoria Sugar Limited — Sweetening Uganda, Powering Africa. Producers of premium sugar, ethanol, extra natural alcohol and electricity.',
  keywords: ['Victoria Sugar', 'Uganda sugar', 'ethanol', 'sugarcane', 'Kakira'],
  openGraph: {
    type: 'website',
    locale: 'en_UG',
    url: 'https://victoriasugar.ug',
    siteName: 'Victoria Sugar Limited',
    images: [
      {
        url: 'https://media.victoriasugar.ug/images/DJI_20251217161456_0929_D.jpg',
        width: 1200,
        height: 630,
        alt: 'Victoria Sugar Limited Estate',
      },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
