"use client"

// ============================================================================
// PASUL 0 — de ce ai nevoie?
// Alegerea de aici ramifică tot restul fluxului.
// ============================================================================

import { ArrowRight } from "lucide-react"
import type { Branch } from "@/lib/pricing"
import { APP_PRICES, AUTOMATION_PRICES, SITE_PRICES, formatLei } from "@/lib/pricing"
import { BranchArt } from "../ui/branch-art"

interface BranchOption {
  value: Branch
  name: string
  desc: string
  meta: string
}

const BRANCHES: BranchOption[] = [
  {
    value: "site",
    name: "Site",
    desc: "Landing page, site de prezentare sau site cu mai multe pagini — construit ca să aducă cereri, nu doar ca să existe.",
    meta: `de la ${formatLei(SITE_PRICES.landing)}`,
  },
  {
    value: "automation",
    name: "Automatizare",
    desc: "Preluăm munca repetitivă: mesaje, programări, facturi, follow-up. Tu rămâi cu partea care chiar cere om.",
    meta: `de la ${formatLei(AUTOMATION_PRICES.perProcess)} / proces`,
  },
  {
    value: "app",
    name: "Aplicație",
    desc: "DaviX Dental, DaviX Cafe sau o aplicație construită de la zero, exact pe procesul afacerii tale.",
    meta: `de la ${formatLei(APP_PRICES.cafe.setup)}`,
  },
]

interface BranchStepProps {
  value?: Branch
  onSelect: (branch: Branch) => void
}

export function BranchStep({ value, onSelect }: BranchStepProps) {
  return (
    <div className="dvx-branches" role="radiogroup" aria-label="De ce ai nevoie?">
      {BRANCHES.map((branch) => {
        const isSelected = value === branch.value
        return (
          <button
            key={branch.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            className="dvx-branch dvx-rise"
            onClick={() => onSelect(branch.value)}
          >
            <span className="dvx-branch__art" aria-hidden="true">
              <BranchArt branch={branch.value} />
            </span>
            <h3 className="dvx-branch__name">{branch.name}</h3>
            <p className="dvx-branch__desc">{branch.desc}</p>
            <span className="dvx-branch__meta">
              <span>{branch.meta}</span>
              <ArrowRight aria-hidden="true" width={14} height={14} />
            </span>
          </button>
        )
      })}
    </div>
  )
}
