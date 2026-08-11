// ============================================================================
// components/calculator/export-utils.ts
// Acțiunile secundare din sumar: PDF, printare, trimitere, salvare locală.
//
// PDF-ul și printarea folosesc același document curat, randat într-un iframe
// ascuns, ca să nu depindem de o bibliotecă grea și ca ce iese la print să nu
// conțină restul paginii. „Descarcă PDF" = dialogul de printare din care
// utilizatorul alege „Salvează ca PDF".
// ============================================================================

import type { Answers, Estimate } from "@/lib/pricing"
import { formatLei, formatRange } from "@/lib/pricing"
import { describeAnswers } from "./describe"

export const STORAGE_KEY = "davix-calculator-v1"

// ----------------------------------------------------------------------------
// Text simplu — pentru clipboard, email și câmpul ascuns din formular
// ----------------------------------------------------------------------------
export function buildPlainSummary(answers: Answers, estimate: Estimate): string {
  const lines: string[] = ["ESTIMARE DAVIX AI", ""]

  for (const item of describeAnswers(answers)) {
    lines.push(`${item.label}: ${item.value}`)
  }

  lines.push("", `Investiție unică: ${formatRange(estimate.oneTime.min, estimate.oneTime.max)}`)
  if (estimate.monthly.max > 0) {
    lines.push(`Recurent lunar: ${formatLei(estimate.monthly.total)}/lună`)
  }
  if (estimate.savings) {
    lines.push(
      `Ore economisite lunar: ${estimate.savings.hoursPerMonth} h (≈ ${formatLei(estimate.savings.moneyPerMonth)}/lună)`,
    )
  }
  lines.push(`Termen estimat: ${estimate.timeline.label}`)
  lines.push("", "Estimare orientativă. Prețul final se stabilește după o discuție de 15 minute.")

  return lines.join("\n")
}

// ----------------------------------------------------------------------------
// Documentul de print / PDF
// ----------------------------------------------------------------------------
const escapeHtml = (value: string) =>
  value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]!,
  )

function buildPrintHtml(answers: Answers, estimate: Estimate): string {
  const rows = describeAnswers(answers)
    .map(
      (item) =>
        `<tr><th>${escapeHtml(item.label)}</th><td>${escapeHtml(item.value)}</td></tr>`,
    )
    .join("")

  const deliverables = estimate.deliverables
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("")

  const monthlyRow =
    estimate.monthly.max > 0
      ? `<tr><th>Recurent lunar</th><td><strong>${formatLei(estimate.monthly.total)}/lună</strong></td></tr>`
      : ""

  const savingsRow = estimate.savings
    ? `<tr><th>Economie estimată</th><td>${estimate.savings.hoursPerMonth} h/lună · ${formatLei(estimate.savings.moneyPerMonth)}/lună</td></tr>`
    : ""

  const today = new Date().toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return `<!doctype html>
<html lang="ro"><head><meta charset="utf-8"><title>Estimare DaviX AI</title>
<style>
  @page { margin: 18mm; }
  * { box-sizing: border-box; }
  body { font-family: -apple-system, "Segoe UI", Roboto, sans-serif; color: #111827; margin: 0; }
  h1 { font-size: 22px; letter-spacing: -0.02em; margin: 0 0 4px; }
  .meta { color: #6b7280; font-size: 12px; margin: 0 0 24px; }
  h2 { font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: #6b7280;
       border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; margin: 28px 0 12px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th { text-align: left; color: #6b7280; font-weight: 500; width: 42%; padding: 6px 0; vertical-align: top; }
  td { padding: 6px 0; vertical-align: top; }
  .price { font-size: 26px; font-weight: 700; letter-spacing: -0.03em; margin: 0; }
  ul { margin: 0; padding-left: 18px; font-size: 13px; line-height: 1.7; }
  .note { margin-top: 28px; padding: 12px 14px; border: 1px solid #fcd34d; background: #fffbeb;
          font-size: 12px; line-height: 1.6; border-radius: 8px; }
  footer { margin-top: 28px; font-size: 11px; color: #6b7280; }
</style></head>
<body>
  <h1>Estimare DaviX AI</h1>
  <p class="meta">Generată pe ${today} · davixai.website</p>

  <h2>Ce ai ales</h2>
  <table>${rows}</table>

  <h2>Preț estimat</h2>
  <p class="price">${formatRange(estimate.oneTime.min, estimate.oneTime.max)}</p>
  <table>
    ${monthlyRow}
    ${savingsRow}
    <tr><th>Termen estimat</th><td>${escapeHtml(estimate.timeline.label)}</td></tr>
  </table>

  <h2>Ce include livrarea</h2>
  <ul>${deliverables}</ul>

  <p class="note"><strong>Estimare orientativă.</strong> Prețul final se stabilește după o discuție
  de 15 minute despre proiectul tău.</p>

  <footer>DaviX AI · 0729 369 094 · contact@davixai.website</footer>
</body></html>`
}

/**
 * Deschide dialogul de printare pentru un document curat, într-un iframe
 * ascuns, ca restul paginii să nu ajungă în PDF.
 */
export function printEstimate(answers: Answers, estimate: Estimate) {
  const iframe = document.createElement("iframe")
  iframe.setAttribute("aria-hidden", "true")
  iframe.style.position = "fixed"
  iframe.style.right = "0"
  iframe.style.bottom = "0"
  iframe.style.width = "0"
  iframe.style.height = "0"
  iframe.style.border = "0"
  document.body.appendChild(iframe)

  const doc = iframe.contentDocument
  if (!doc) {
    document.body.removeChild(iframe)
    return
  }

  doc.open()
  doc.write(buildPrintHtml(answers, estimate))
  doc.close()

  const cleanup = () => {
    // Lăsăm dialogul să se închidă înainte să eliberăm iframe-ul.
    window.setTimeout(() => {
      if (iframe.parentNode) iframe.parentNode.removeChild(iframe)
    }, 800)
  }

  iframe.onload = () => {
    iframe.contentWindow?.focus()
    iframe.contentWindow?.print()
    cleanup()
  }
}

// ----------------------------------------------------------------------------
// Trimitere (Web Share → clipboard → mailto)
// ----------------------------------------------------------------------------
export async function shareEstimate(text: string): Promise<"shared" | "copied" | "mail"> {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title: "Estimare DaviX AI", text })
      return "shared"
    } catch {
      // Utilizatorul a anulat sau API-ul a refuzat — mergem mai departe.
    }
  }

  if (typeof navigator !== "undefined" && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text)
      return "copied"
    } catch {
      // Fără permisiune de clipboard — rămâne varianta email.
    }
  }

  window.location.href = `mailto:?subject=${encodeURIComponent("Estimare DaviX AI")}&body=${encodeURIComponent(text)}`
  return "mail"
}

// ----------------------------------------------------------------------------
// Salvare locală
// ----------------------------------------------------------------------------
export function saveLocally(answers: Answers, stepIndex: number): boolean {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ answers, stepIndex, savedAt: Date.now() }),
    )
    return true
  } catch {
    return false
  }
}

export function loadLocally(): { answers: Answers; stepIndex: number } | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { answers?: Answers; stepIndex?: number }
    if (!parsed?.answers || typeof parsed.answers !== "object") return null
    return { answers: parsed.answers, stepIndex: Number(parsed.stepIndex) || 0 }
  } catch {
    return null
  }
}

export function clearLocally() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Stocarea poate fi blocată (mod privat) — ignorăm în liniște.
  }
}
