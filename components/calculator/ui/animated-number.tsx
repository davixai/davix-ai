"use client"

// ============================================================================
// Cifre care se actualizează animat.
// Framer Motion e folosit AICI pentru ce trebuie: o interacțiune (tranziția
// unei valori), nu pentru a face conținutul vizibil. La prima randare
// (inclusiv pe server) se afișează direct valoarea finală.
// ============================================================================

import { useEffect, useRef, useState } from "react"
import { animate, useReducedMotion } from "framer-motion"

interface AnimatedNumberProps {
  value: number
  /** Formatarea valorii intermediare. Implicit: număr rotunjit. */
  format?: (value: number) => string
  /** Durata tranziției, în secunde. */
  duration?: number
}

export function AnimatedNumber({ value, format, duration = 0.55 }: AnimatedNumberProps) {
  const prefersReduced = useReducedMotion()
  const [display, setDisplay] = useState(value)
  const latest = useRef(value)

  useEffect(() => {
    if (prefersReduced) {
      latest.current = value
      setDisplay(value)
      return
    }

    const controls = animate(latest.current, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (current) => {
        latest.current = current
        setDisplay(current)
      },
    })

    return () => controls.stop()
  }, [value, duration, prefersReduced])

  return <>{format ? format(display) : Math.round(display).toString()}</>
}
