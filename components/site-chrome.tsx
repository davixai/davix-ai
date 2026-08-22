"use client"

// ============================================================================
// Elementele globale ale site-ului: fundal animat, chatbot, buton de calculator
// și toastul Davix Dental.
// ----------------------------------------------------------------------------
// Sunt grupate aici ca să existe un singur loc care decide UNDE apar.
//
// Pe /oferta nu apare niciunul: pagina se trimite pe WhatsApp și se deschide
// pe telefon, unde trei butoane flotante peste conținut + un shader GPU
// înseamnă exact ce nu vrem — frecare și încărcare lentă. Acolo singurul
// element fix e bara proprie de WhatsApp.
// ============================================================================

import { usePathname } from "next/navigation"

import { Chatbot } from "@/components/chatbot"
import { CalculatorFab } from "@/components/calculator-fab"
import { DavixDentalToast } from "@/components/davix-dental-toast"
import { SiteBackground } from "@/components/ui/background-shader"

/** Rute care își aduc propriul fundal și propriile CTA-uri. */
const BARE_PATHS = ["/oferta"]

export function SiteChrome() {
  const pathname = usePathname()

  if (BARE_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return null
  }

  return (
    <>
      <SiteBackground />
      <div className="noise-overlay" aria-hidden="true" />
      <DavixDentalToast />
      <CalculatorFab />
      <Chatbot />
    </>
  )
}
