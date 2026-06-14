"use client"

import React, { useEffect, useState } from "react"

interface CosmicParallaxBgProps {
  /** Main heading text (large, centered). Only shown when showText is true. */
  head?: string
  /** Comma-separated subtitle parts. Only shown when showText is true. */
  text?: string
  /** Whether the star animation loops. @default true */
  loop?: boolean
  /** Show the centered title/subtitle (hero mode) or just the scene (background mode). @default true */
  showText?: boolean
  /** Custom class name for additional styling */
  className?: string
}

/** Generate a random star field as a box-shadow string. */
const generateStarBoxShadow = (count: number): string => {
  const shadows: string[] = []
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000)
    const y = Math.floor(Math.random() * 2000)
    shadows.push(`${x}px ${y}px #FFF`)
  }
  return shadows.join(", ")
}

/**
 * A cosmic parallax background with animated star layers, a brand-tinted
 * horizon glow and an optional centered title/subtitle.
 */
const CosmicParallaxBg: React.FC<CosmicParallaxBgProps> = ({
  head = "",
  text = "",
  loop = true,
  showText = true,
  className = "",
}) => {
  const [smallStars, setSmallStars] = useState<string>("")
  const [mediumStars, setMediumStars] = useState<string>("")
  const [bigStars, setBigStars] = useState<string>("")

  const textParts = text.split(",").map((p) => p.trim()).filter(Boolean)

  useEffect(() => {
    setSmallStars(generateStarBoxShadow(700))
    setMediumStars(generateStarBoxShadow(200))
    setBigStars(generateStarBoxShadow(100))
    document.documentElement.style.setProperty(
      "--animation-iteration",
      loop ? "infinite" : "1",
    )
  }, [loop])

  return (
    <div className={`cosmic-parallax-container ${className}`}>
      <div style={{ boxShadow: smallStars }} className="cosmic-stars" />
      <div style={{ boxShadow: mediumStars }} className="cosmic-stars-medium" />
      <div style={{ boxShadow: bigStars }} className="cosmic-stars-large" />

      <div className="cosmic-horizon">
        <div className="cosmic-glow" />
      </div>
      <div className="cosmic-earth" />

      {showText && head && <div className="cosmic-title">{head.toUpperCase()}</div>}
      {showText && textParts.length > 0 && (
        <div className="cosmic-subtitle">
          {textParts.map((part, index) => (
            <React.Fragment key={index}>
              <span className={`subtitle-part-${index + 1}`}>{part.toUpperCase()}</span>
              {index < textParts.length - 1 && " "}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  )
}

export { CosmicParallaxBg }
