import type React from "react"
import type { Metadata } from "next"
import { Manrope, Inter } from "next/font/google"

import { Analytics } from "@vercel/analytics/next"
import { FloatingCta } from "@/components/floating-cta"
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
  title: "Davix AI - Automatizari AI pentru Afacerea Ta",
  description: "De la site-uri de prezentare moderne pana la roboti care iti gestioneaza clientii 24/7. Construim orice tip de automatizare custom pentru afacerea ta.",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ro" className="dark">
      <body className={`${manrope.variable} ${inter.variable} font-sans antialiased`}>
        <div className="noise-overlay" aria-hidden="true" />
        <FloatingCta />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
