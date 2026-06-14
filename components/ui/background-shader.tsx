"use client"

import { useEffect, useState } from "react"
import { MeshGradient } from "@paper-design/shaders-react"
import { CosmicParallaxBg } from "@/components/ui/parallax-cosmic-background"

type BgMode = "mesh" | "cosmic"

/**
 * Site-wide animated background. Switchable via the `?bg=` query param so the
 * two looks can be compared live:
 *   - default / ?bg=mesh   → subtle emerald mesh gradient (light theme)
 *   - ?bg=cosmic           → cosmic star field (dark theme)
 * Respects prefers-reduced-motion.
 */
export function SiteBackground() {
  const [mode, setMode] = useState<BgMode>("mesh")
  const [reducedMotion, setReducedMotion] = useState(false)
  const [scrolling, setScrolling] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const next: BgMode = params.get("bg") === "cosmic" ? "cosmic" : "mesh"
    setMode(next)
    if (next === "cosmic") {
      document.documentElement.dataset.theme = "cosmic"
    } else {
      delete document.documentElement.dataset.theme
    }
  }, [])

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  // Pause the (GPU-heavy) shader while the user is actively scrolling so it
  // never competes with Lenis smooth scroll. Resumes shortly after idle.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const onScroll = () => {
      setScrolling(true)
      clearTimeout(timer)
      timer = setTimeout(() => setScrolling(false), 180)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      clearTimeout(timer)
    }
  }, [])

  if (mode === "cosmic") {
    return <CosmicParallaxBg showText={false} loop={!reducedMotion} />
  }

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <MeshGradient
        style={{ height: "100%", width: "100%" }}
        distortion={0.6}
        swirl={0.08}
        offsetX={0}
        offsetY={0}
        scale={1.1}
        rotation={0}
        speed={reducedMotion || scrolling ? 0 : 0.45}
        colors={[
          "hsl(158, 64%, 42%)", // emerald-600 (brand)
          "hsl(150, 55%, 58%)", // soft green
          "hsl(172, 50%, 55%)", // teal-green
          "hsl(140, 45%, 88%)", // pale mint
        ]}
      />
      {/* White veil keeps the gradient subtle and content readable */}
      <div className="absolute inset-0 bg-white/78" />
    </div>
  )
}
