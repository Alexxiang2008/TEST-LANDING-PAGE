import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Industrial Vacuum Cleaner OEM/ODM Manufacturer | LiyyouVac - ISO 9001 Certified",
  description: "LiyyouVac: Leading industrial vacuum OEM/ODM manufacturer with 12+ years experience. CE, UL, ISO 9001 certified. Custom cleaning solutions for global brands. 8 production lines, Belt & Road specialist.",
  keywords: ["industrial vacuum OEM", "industrial vacuum ODM", "vacuum cleaner manufacturer", "OEM vacuum cleaner", "ODM vacuum manufacturer", "custom vacuum solutions", "industrial cleaning equipment", "ISO 9001 manufacturer", "CE certified vacuum", "Belt and Road supplier"],
  authors: [{ name: "LiyyouVac" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.liyyouvac.com/",
    siteName: "LiyyouVac",
    title: "Industrial Vacuum Cleaner OEM/ODM Manufacturer | LiyyouVac",
    description: "Professional industrial vacuum OEM/ODM manufacturer with 12+ years experience. ISO 9001 certified. Serving global brands with custom cleaning solutions.",
    images: [
      {
        url: "https://www.liyyouvac.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LiyyouVac Industrial Vacuum Manufacturing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industrial Vacuum Cleaner OEM/ODM Manufacturer | LiyyouVac",
    description: "Professional industrial vacuum OEM/ODM manufacturer with 12+ years experience. ISO 9001 certified. Custom cleaning solutions for global brands.",
    images: ["https://www.liyyouvac.com/images/twitter-card.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://www.liyyouvac.com/" />
        <link rel="alternate" hrefLang="en" href="https://www.liyyouvac.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.liyyouvac.com/" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
