"use client"

// ============================================================================
// Panoul live — rezumatul selecțiilor și prețul care se actualizează în timp
// real. Sticky pe desktop, sub conținut pe mobil.
// ============================================================================

import { Clock, Sparkles, TrendingUp } from "lucide-react"
import { CURRENCY, type Estimate, formatLei } from "@/lib/pricing"
import type { DescribedAnswer } from "../describe"
import { AnimatedNumber } from "./animated-number"

interface LivePanelProps {
  estimate: Estimate
  selections: DescribedAnswer[]
  /** Marcaj de versiune, ca să se vadă ce build rulează. */
  version: string
  /** Ascunde panoul pe mobil (pe sumar informația e deja pe ecran). */
  hiddenOnMobile?: boolean
}

const nf = new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 })
const asInt = (value: number) => nf.format(Math.round(value))

export function LivePanel({ estimate, selections, version, hiddenOnMobile }: LivePanelProps) {
  const { oneTime, monthly, savings, ready } = estimate
  const hasPrice = ready && oneTime.max > 0

  return (
    <aside
      className={`dvx-live${hiddenOnMobile ? " dvx-live--hidden-mobile" : ""}`}
      aria-label="Estimare în timp real"
    >
      <div className="dvx-panel dvx-panel--flush">
        <div className="dvx-live__head">
          <p className="dvx-live__kicker">Estimare live</p>
          <span className="dvx-version">
            <span className="dvx-version__dot" aria-hidden="true" />
            {version}
          </span>
        </div>

        {/* Preț unic */}
        <p className="dvx-live__price" data-empty={!hasPrice} aria-live="polite">
          {hasPrice ? (
            <>
              <AnimatedNumber value={oneTime.min} format={asInt} />
              {" – "}
              <AnimatedNumber value={oneTime.max} format={asInt} />
              <span className="dvx-live__unit"> {CURRENCY}</span>
            </>
          ) : (
            <>
              —<span className="dvx-live__unit"> {CURRENCY}</span>
            </>
          )}
        </p>

        {/* Cost lunar recurent, separat */}
        {monthly.max > 0 ? (
          <div className="dvx-live__monthly">
            <span className="dvx-live__monthly-label">Recurent lunar</span>
            <span className="dvx-live__monthly-value">
              <AnimatedNumber value={monthly.total} format={asInt} /> {CURRENCY}/lună
            </span>
          </div>
        ) : null}

        {/* Economia lunară — argumentul central pe ramura de automatizare */}
        {savings ? (
          <div className="dvx-savings">
            <p className="dvx-savings__label">
              <TrendingUp aria-hidden="true" width={13} height={13} />
              Ce câștigi înapoi
            </p>
            <div className="dvx-savings__row">
              <span className="dvx-savings__key">Ore economisite lunar</span>
              <span className="dvx-savings__value">
                <AnimatedNumber value={savings.hoursPerMonth} /> h
              </span>
            </div>
            <div className="dvx-savings__row">
              <span className="dvx-savings__key">Echivalent în bani</span>
              <span className="dvx-savings__value">
                <AnimatedNumber value={savings.moneyPerMonth} format={asInt} /> {CURRENCY}
              </span>
            </div>
          </div>
        ) : null}

        {/* Rezumatul selecțiilor */}
        {selections.length > 0 ? (
          <ul className="dvx-live__list">
            {selections.map((item) => (
              <li key={item.id} className="dvx-live__item">
                <span className="dvx-live__item-key">{item.label}</span>
                <span className="dvx-live__item-value">{item.value}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="dvx-live__empty">
            Aici apar, pe rând, alegerile tale și prețul care se formează din ele. Începe cu primul
            pas.
          </p>
        )}

        <div className="dvx-live__foot">
          <span>
            <Clock
              aria-hidden="true"
              width={11}
              height={11}
              style={{ display: "inline", verticalAlign: "-1px", marginRight: 4 }}
            />
            {estimate.timeline.label}
          </span>
          <span>
            <Sparkles
              aria-hidden="true"
              width={11}
              height={11}
              style={{ display: "inline", verticalAlign: "-1px", marginRight: 4 }}
            />
            {hasPrice ? `±15% · ${formatLei(oneTime.total)} calculat` : "orientativ"}
          </span>
        </div>
      </div>
    </aside>
  )
}
