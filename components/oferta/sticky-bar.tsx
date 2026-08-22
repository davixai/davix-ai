"use client"

// ============================================================================
// Bara fixă de jos: WhatsApp + apel.
// ----------------------------------------------------------------------------
// Apare după ce omul a derulat de pe primul ecran, ca să nu concureze cu
// CTA-ul din hero, și rămâne acolo. Pe /oferta e SINGURUL element flotant —
// chatbotul, calculatorul și toastul sunt scoase din layout, ca să nu se
// bată trei butoane pe un ecran de 390px.
// ============================================================================

import { useEffect, useState } from "react"
import { PhoneIcon, WhatsAppIcon } from "./icons"
import { PHONE_TEL, WA_GENERAL } from "./data"

const REVEAL_AFTER = 520

export function StickyBar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const update = () => setShow(window.scrollY > REVEAL_AFTER)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <div className="ofr-bar" data-show={show ? "1" : "0"} aria-hidden={!show}>
      <a
        className="ofr-btn ofr-btn--wa"
        href={WA_GENERAL}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={show ? 0 : -1}
      >
        <WhatsAppIcon />
        Scrie pe WhatsApp
      </a>
      <a
        className="ofr-btn ofr-btn--ghost ofr-bar-call"
        href={`tel:${PHONE_TEL}`}
        aria-label="Sună-mă"
        tabIndex={show ? 0 : -1}
      >
        <PhoneIcon />
      </a>
    </div>
  )
}
