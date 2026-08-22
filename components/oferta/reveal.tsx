"use client"

// ============================================================================
// Reveal la intrare, fără framer-motion.
// ----------------------------------------------------------------------------
// Pagina se deschide în browserul din WhatsApp, pe Android mediu, pe 4G.
// Un IntersectionObserver + o clasă CSS costă ~0 kB; framer-motion ar adăuga
// zeci de kB de JS pentru exact același efect.
//
// Elementul e vizibil din start pentru cine are JS oprit sau reduced-motion:
// clasa `.ofr-reveal` doar îl coboară 14px, iar CSS-ul îl readuce la normal
// când `prefers-reduced-motion` e activ.
// ============================================================================

import type React from "react"
import { useEffect, useRef, type ElementType, type ReactNode } from "react"

type RevealProps = {
  children: ReactNode
  /** Întârziere în ms, pentru efectul de stagger într-o listă. */
  delay?: number
  as?: ElementType
  className?: string
}

export function Reveal({ children, delay = 0, as: Tag = "div", className }: RevealProps) {
  // `Tag` e dinamic (div, li, section…), așa că ref-ul e generic pe HTMLElement.
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Fără suport de observer, arătăm conținutul imediat.
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.in = "1"
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          el.dataset.in = "1"
          observer.disconnect()
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={className ? `ofr-reveal ${className}` : "ofr-reveal"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
