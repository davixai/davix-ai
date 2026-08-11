"use client"

// ============================================================================
// Bara fixă de jos, pe mobil: înapoi · preț live · continuă.
// Utilizatorul nu trebuie să deruleze până în josul paginii ca să navigheze.
// Zonele de atingere au minimum 44px, iar padding-ul de jos respectă
// safe-area-inset pe iPhone.
// ============================================================================

import { ArrowLeft, ArrowRight } from "lucide-react"
import { CURRENCY } from "@/lib/pricing"
import { AnimatedNumber } from "./animated-number"

interface MobileBarProps {
  canGoBack: boolean
  canGoNext: boolean
  onBack: () => void
  onNext: () => void
  priceMin: number
  priceMax: number
  hasPrice: boolean
  nextLabel: string
}

const nf = new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 })
const asInt = (value: number) => nf.format(Math.round(value))

export function MobileBar({
  canGoBack,
  canGoNext,
  onBack,
  onNext,
  priceMin,
  priceMax,
  hasPrice,
  nextLabel,
}: MobileBarProps) {
  return (
    <div className="dvx-bar">
      <button
        type="button"
        className="dvx-bar__back"
        onClick={onBack}
        disabled={!canGoBack}
        aria-label="Pasul anterior"
      >
        <ArrowLeft aria-hidden="true" width={18} height={18} />
      </button>

      <div className="dvx-bar__price">
        <span className="dvx-bar__price-label">Estimare</span>
        <span className="dvx-bar__price-value" aria-live="polite">
          {hasPrice ? (
            <>
              <AnimatedNumber value={priceMin} format={asInt} />
              {" – "}
              <AnimatedNumber value={priceMax} format={asInt} /> {CURRENCY}
            </>
          ) : (
            `— ${CURRENCY}`
          )}
        </span>
      </div>

      <button
        type="button"
        className="dvx-btn dvx-btn--primary dvx-bar__next"
        onClick={onNext}
        disabled={!canGoNext}
      >
        {nextLabel}
        <ArrowRight aria-hidden="true" width={16} height={16} />
      </button>
    </div>
  )
}
