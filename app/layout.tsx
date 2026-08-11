import type React from "react"
import type { Metadata } from "next"
import { Manrope, Inter, Sora, JetBrains_Mono } from "next/font/google"

import { Analytics } from "@vercel/analytics/next"
import { Chatbot } from "@/components/chatbot"
import { FloatingCta } from "@/components/floating-cta"
import { DavixDentalToast } from "@/components/davix-dental-toast"
import { SiteBackground } from "@/components/ui/background-shader"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

// Fonturi folosite de calculatorul de estimare: display pentru titluri,
// mono pentru cifre, unități și etichete tehnice.
const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-sora",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "DaviX AI — Site-uri web, aplicații personalizate și chatboți AI",
  description:
    "Construim site-uri web premium, aplicații personalizate și chatboți AI pentru afaceri locale care vor să economisească timp și să primească mai multe cereri. Audit gratuit 15 minute.",
  keywords: [
    "site-uri web",
    "aplicații personalizate",
    "chatbot AI",
    "chatbot WhatsApp",
    "magazin online",
    "aplicație pentru cabinet stomatologic",
    "software clinică dentară",
    "Davix Dental",
    "DaviX AI",
  ],
  openGraph: {
    title: "DaviX AI — Site-uri web, aplicații personalizate și chatboți AI",
    description:
      "Site-uri web, aplicații personalizate și chatboți AI pentru afaceri locale. Programează un audit gratuit de 15 minute.",
    url: "https://www.davixai.website",
    siteName: "DaviX AI",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/davix-logo.png",
        width: 1200,
        height: 630,
        alt: "DaviX AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DaviX AI — Site-uri web, aplicații și chatboți AI",
    description:
      "Site-uri web, aplicații personalizate și chatboți AI pentru afaceri care vor mai mulți clienți.",
    images: ["/davix-logo.png"],
  },
  metadataBase: new URL("https://www.davixai.website"),
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ro" data-theme="cosmic">
      <body
        className={`${manrope.variable} ${inter.variable} ${sora.variable} ${jetbrainsMono.variable} font-sans antialiased bg-transparent text-zinc-900`}
      >
        <SiteBackground />
        <div className="noise-overlay" aria-hidden="true" />
        <DavixDentalToast />
        <FloatingCta />
        {children}
        <Chatbot />
        <Analytics />
      </body>
    </html>
  )
}
