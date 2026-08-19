"use client"

// ============================================================================
// PASUL FINAL — sumarul, comun tuturor ramurilor.
// ============================================================================

import { useState } from "react"
import {
  ArrowRight,
  Check,
  Download,
  Info,
  Printer,
  RotateCcw,
  Save,
  Share2,
} from "lucide-react"
import { CURRENCY, type Answers, type Estimate, formatLei } from "@/lib/pricing"
import type { DescribedAnswer } from "../describe"
import { buildPlainSummary, printEstimate, saveLocally, shareEstimate } from "../export-utils"
import { AnimatedNumber } from "../ui/animated-number"

interface SummaryStepProps {
  answers: Answers
  estimate: Estimate
  selections: DescribedAnswer[]
  stepIndex: number
  onRequestOffer: () => void
  onRestart: () => void
}

const nf = new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 })
const asInt = (value: number) => nf.format(Math.round(value))

export function SummaryStep({
  answers,
  estimate,
  selections,
  stepIndex,
  onRequestOffer,
  onRestart,
}: SummaryStepProps) {
  const [toast, setToast] = useState<string | null>(null)

  const flash = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(null), 3200)
  }

  const hasPrice = estimate.oneTime.max > 0

  const handleShare = async () => {
    const result = await shareEstimate(buildPlainSummary(answers, estimate))
    if (result === "copied") flash("Estimarea a fost copiată în clipboard.")
    if (result === "mail") flash("Am deschis clientul de email cu estimarea pregătită.")
  }

  const handleSave = () => {
    flash(
      saveLocally(answers, stepIndex)
        ? "Salvat în acest browser. Când revii, continui de unde ai rămas."
        : "Nu am putut salva local — browserul blochează stocarea.",
    )
  }

  return (
    <div>
      {/* Prețul, mare */}
      <div className="dvx-summary__hero">
        <p className="dvx-summary__label">Investiție unică estimată</p>
        <p className="dvx-summary__price">
          {hasPrice ? (
            <>
              <AnimatedNumber value={estimate.oneTime.min} format={asInt} />
              {" – "}
              <AnimatedNumber value={estimate.oneTime.max} format={asInt} />
              <span className="dvx-summary__price-unit">{CURRENCY}</span>
            </>
          ) : (
            <>
              —<span className="dvx-summary__price-unit">{CURRENCY}</span>
            </>
          )}
        </p>
        {estimate.note ? <p className="dvx-summary__pending">{estimate.note}</p> : null}
      </div>

      {/* Cifrele-cheie */}
      <div className="dvx-summary__facts">
        <div className="dvx-fact">
          <span className="dvx-fact__key">Cost lunar recurent</span>
          <span className="dvx-fact__value">
            {estimate.monthly.max > 0 ? `${formatLei(estimate.monthly.total)}/lună` : "fără"}
          </span>
        </div>
        <div className="dvx-fact">
          <span className="dvx-fact__key">Termen estimat de livrare</span>
          <span className="dvx-fact__value">{estimate.timeline.label}</span>
        </div>
        {estimate.savings ? (
          <>
            <div className="dvx-fact">
              <span className="dvx-fact__key">Ore economisite lunar</span>
              <span className="dvx-fact__value">{estimate.savings.hoursPerMonth} h</span>
            </div>
            <div className="dvx-fact">
              <span className="dvx-fact__key">Echivalent în bani</span>
              <span className="dvx-fact__value">
                {formatLei(estimate.savings.moneyPerMonth)}/lună
              </span>
            </div>
          </>
        ) : null}
      </div>

      {/* Ce a ales */}
      <h3 className="dvx-section-title">Ce ai ales</h3>
      <ul className="dvx-list">
        {selections.map((item) => (
          <li key={item.id} className="dvx-list__row">
            <span className="dvx-list__key">{item.label}</span>
            <span className="dvx-list__value">{item.value}</span>
          </li>
        ))}
      </ul>

      {/* Ce include livrarea */}
      {estimate.deliverables.length > 0 ? (
        <>
          <h3 className="dvx-section-title">Ce include livrarea</h3>
          <ul className="dvx-list dvx-list--two">
            {estimate.deliverables.map((item) => (
              <li key={item} className="dvx-list__check">
                <Check aria-hidden="true" strokeWidth={3} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {/* Disclaimer vizibil */}
      <p className="dvx-disclaimer">
        <Info aria-hidden="true" />
        <span>
          <strong>Estimare orientativă.</strong> Prețul final se stabilește după o discuție de 15
          minute despre proiectul tău.
        </span>
      </p>

      {/* CTA principal */}
      <div style={{ marginTop: "1.5rem" }}>
        <button
          type="button"
          className="dvx-btn dvx-btn--primary dvx-btn--lg"
          onClick={onRequestOffer}
        >
          Solicită oferta personalizată
          <ArrowRight aria-hidden="true" width={18} height={18} />
        </button>
      </div>

      {/* Acțiuni secundare */}
      <div className="dvx-summary__actions">
        <button
          type="button"
          className="dvx-btn dvx-btn--ghost dvx-btn--sm"
          onClick={() => printEstimate(answers, estimate)}
        >
          <Download aria-hidden="true" width={15} height={15} />
          Descarcă PDF
        </button>
        <button
          type="button"
          className="dvx-btn dvx-btn--ghost dvx-btn--sm"
          onClick={() => printEstimate(answers, estimate)}
        >
          <Printer aria-hidden="true" width={15} height={15} />
          Printează
        </button>
        <button type="button" className="dvx-btn dvx-btn--ghost dvx-btn--sm" onClick={handleShare}>
          <Share2 aria-hidden="true" width={15} height={15} />
          Trimite
        </button>
        <button type="button" className="dvx-btn dvx-btn--ghost dvx-btn--sm" onClick={handleSave}>
          <Save aria-hidden="true" width={15} height={15} />
          Salvează local
        </button>
        <button type="button" className="dvx-btn dvx-btn--quiet dvx-btn--sm" onClick={onRestart}>
          <RotateCcw aria-hidden="true" width={15} height={15} />
          Ia-o de la capăt
        </button>
      </div>

      {/* Confirmări scurte pentru acțiunile secundare */}
      <p aria-live="polite" className="dvx-field__hint" style={{ marginTop: "0.75rem" }}>
        {toast ?? ""}
      </p>
    </div>
  )
}
