import type React from "react"
import type { Metadata } from "next"
import { Manrope, Inter } from "next/font/google"

import { Analytics } from "@vercel/analytics/next"
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

export const metadata: Metadata = {
  title: "DaviX AI — Aplicații, site-uri și automatizări AI pentru afaceri",
  description:
    "Construim aplicații web custom, site-uri moderne și automatizări AI (SMS, email, WhatsApp, CRM) pentru afaceri locale care vor mai mulți clienți. Programează un audit gratuit.",
  keywords: [
    "aplicații web",
    "site-uri web",
    "automatizări AI",
    "automatizări SMS",
    "automatizări email",
    "chatbot WhatsApp",
    "CRM stomatologic",
    "software clinică dentară",
    "Davix Dental",
    "DaviX AI",
  ],
  openGraph: {
    title: "DaviX AI — Aplicații, site-uri și automatizări AI pentru afaceri",
    description:
      "Aplicații web custom, site-uri și automatizări (SMS, email, WhatsApp, CRM) pentru afaceri locale. Programează un audit gratuit.",
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
    title: "DaviX AI — Aplicații, site-uri și automatizări AI",
    description:
      "Aplicații web, site-uri și automatizări AI pentru afaceri care vor mai mulți clienți.",
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
      <body className={`${manrope.variable} ${inter.variable} font-sans antialiased bg-transparent text-zinc-900`}>
        <SiteBackground />
        <div className="noise-overlay" aria-hidden="true" />
        <DavixDentalToast />
        <FloatingCta />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
