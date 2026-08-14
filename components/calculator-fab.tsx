"use client"

// ============================================================================
// Buton plutitor, dreapta sus, care trimite direct în calculatorul de estimare.
//
// Reguli de conviețuire cu restul elementelor fixe:
//  · stă SUB bara de navigație (care e fixă, top-4, z-50), ca să nu o acopere;
//  · apare doar după ce utilizatorul a derulat de pe hero, ca să nu concureze
//    cu CTA-ul principal;
//  · dispare când calculatorul e deja pe ecran — aceeași convenție folosită de
//    secțiune pentru celelalte elemente plutitoare (`body[data-dvx-visible]`).
// ============================================================================

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Calculator } from "lucide-react"

/** Cât se derulează până apare butonul (aprox. sub fold-ul de pe hero). */
const REVEAL_AFTER = 320

export function CalculatorFab() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => {
      const scrolledPastHero = window.scrollY > REVEAL_AFTER
      const calculatorOnScreen = document.body.dataset.dvxVisible === "1"
      setVisible(scrolledPastHero && !calculatorOnScreen)
    }

    update()
    window.addEventListener("scroll", update, { passive: true })

    // Secțiunea de calculator pune/scoate `data-dvx-visible` pe <body>.
    const observer = new MutationObserver(update)
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-dvx-visible"],
    })

    return () => {
      window.removeEventListener("scroll", update)
      observer.disconnect()
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-[5.5rem] right-3 sm:top-[6.75rem] sm:right-6 z-40"
        >
          <a
            href="/#calculator"
            className="group flex items-center gap-2.5 rounded-full py-2 pl-2 pr-4 sm:pr-5
                       bg-zinc-950/90 backdrop-blur-md border border-emerald-400/30
                       text-white text-[13px] sm:text-sm font-semibold whitespace-nowrap
                       shadow-[0_1px_2px_rgba(0,0,0,0.3),0_12px_32px_-14px_rgba(16,185,129,0.65)]
                       hover:border-emerald-400/60 hover:-translate-y-0.5
                       hover:shadow-[0_1px_2px_rgba(0,0,0,0.35),0_18px_44px_-14px_rgba(16,185,129,0.85)]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400
                       focus-visible:ring-offset-2 focus-visible:ring-offset-white
                       active:translate-y-0 active:scale-[0.97]
                       transition-[transform,border-color,box-shadow] duration-300 ease-out"
          >
            <span
              className="flex w-7 h-7 sm:w-8 sm:h-8 shrink-0 items-center justify-center rounded-full
                         bg-emerald-500 text-zinc-950
                         shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]
                         transition-transform duration-300 ease-out group-hover:scale-105"
              aria-hidden="true"
            >
              <Calculator className="w-4 h-4" strokeWidth={2.2} />
            </span>
            Cât te-ar costa?
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
