// ============================================================================
// components/calculator/describe.ts
// Traduce răspunsurile brute în text citibil, o singură dată, pentru toate
// locurile care au nevoie: panoul live, sumarul final, PDF-ul și lead-ul.
//
// Etichetele NU sunt duplicate aici — se citesc direct din definiția fluxului,
// deci orice text schimbat în `flow.ts` se propagă automat peste tot.
// ============================================================================

import type { Answers } from "@/lib/pricing"
import { buildFlow } from "./flow"
import type { Field } from "./types"

export interface DescribedAnswer {
  /** Cheia răspunsului, folosită drept `key` în React. */
  id: string
  /** Întrebarea, pe scurt. */
  label: string
  /** Răspunsul, deja formatat. */
  value: string
}

const BRANCH_LABELS: Record<string, string> = {
  site: "Site",
  automation: "Automatizare",
  app: "Aplicație",
}

/** Caută eticheta unei valori în opțiunile câmpului. */
function optionLabel(field: Field, value: string): string {
  if (field.kind === "text") return value
  return field.options.find((option) => option.value === value)?.label ?? value
}

/**
 * Toate selecțiile de până acum, în ordinea în care au fost făcute.
 * Câmpurile fără răspuns sunt omise.
 */
export function describeAnswers(answers: Answers): DescribedAnswer[] {
  const described: DescribedAnswer[] = []

  if (answers.branch) {
    described.push({ id: "branch", label: "Direcție", value: BRANCH_LABELS[answers.branch] })
  }

  for (const step of buildFlow(answers)) {
    if (step.kind !== "fields") continue

    for (const field of step.fields) {
      const raw = answers[field.id]
      if (raw === undefined || raw === null) continue

      let value: string
      if (Array.isArray(raw)) {
        if (raw.length === 0) continue
        value = raw.map((item) => optionLabel(field, item)).join(", ")
      } else {
        if (String(raw).trim() === "") continue
        value = optionLabel(field, String(raw))

        // Opțiunea „Un program dedicat (specifică)" își aduce cu ea textul liber.
        if (field.kind === "single") {
          const option = field.options.find((candidate) => candidate.value === raw)
          const extra = option?.textField ? answers[option.textField.id] : undefined
          if (typeof extra === "string" && extra.trim()) {
            value = `${value}: ${extra.trim()}`
          }
        }
      }

      described.push({ id: String(field.id), label: field.label, value })
    }
  }

  return described
}

/** Varianta text simplu, pentru email, clipboard și PDF. */
export function describeAsText(answers: Answers): string {
  return describeAnswers(answers)
    .map((item) => `${item.label}: ${item.value}`)
    .join("\n")
}
