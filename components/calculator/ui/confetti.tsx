"use client"

// ============================================================================
// Confetti pe canvas, fără dependențe externe.
// Se dezactivează automat la `prefers-reduced-motion: reduce` și rulează o
// singură dată, ~2.4 secunde, apoi eliberează canvas-ul.
// ============================================================================

import { useEffect, useRef } from "react"

const COLORS = ["#4d8bff", "#34dcff", "#f1f5ff", "#8fb4ff", "#35d39a"]
const DURATION = 2400
const COUNT = 90

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  rotation: number
  spin: number
  color: string
}

export function Confetti({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    canvas.width = width * dpr
    canvas.height = height * dpr
    context.scale(dpr, dpr)

    // Două surse laterale, ca la Stripe — nu o ploaie uniformă de sus.
    const particles: Particle[] = Array.from({ length: COUNT }, (_, index) => {
      const fromLeft = index % 2 === 0
      return {
        x: fromLeft ? width * 0.12 : width * 0.88,
        y: height * 0.62,
        vx: (fromLeft ? 1 : -1) * (2.5 + Math.random() * 5),
        vy: -(7 + Math.random() * 7),
        size: 4 + Math.random() * 5,
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.28,
        color: COLORS[index % COLORS.length],
      }
    })

    let raf = 0
    const start = performance.now()

    const frame = (now: number) => {
      const elapsed = now - start
      const life = 1 - elapsed / DURATION

      context.clearRect(0, 0, width, height)

      for (const particle of particles) {
        particle.vy += 0.28 // gravitație
        particle.vx *= 0.992 // frecare
        particle.x += particle.vx
        particle.y += particle.vy
        particle.rotation += particle.spin

        context.save()
        context.translate(particle.x, particle.y)
        context.rotate(particle.rotation)
        context.globalAlpha = Math.max(0, life)
        context.fillStyle = particle.color
        context.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size * 0.6)
        context.restore()
      }

      if (elapsed < DURATION) {
        raf = requestAnimationFrame(frame)
      } else {
        context.clearRect(0, 0, width, height)
      }
    }

    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [active])

  if (!active) return null

  return <canvas ref={canvasRef} className="dvx-confetti" aria-hidden="true" />
}
