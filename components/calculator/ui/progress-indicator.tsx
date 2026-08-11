// ============================================================================
// Indicatorul de progres.
// Numărul total de pași vine din fluxul recalculat dinamic, deci se schimbă
// singur când utilizatorul alege altă ramură. Cât timp ramura nu e aleasă,
// totalul încă nu se cunoaște și afișăm „—" în loc de o cifră falsă.
// ============================================================================

interface ProgressIndicatorProps {
  /** Indexul pasului curent, de la 0. */
  current: number
  /** Numărul total de pași din fluxul curent. */
  total: number
  /** Eticheta pasului curent, afișată în dreapta. */
  label: string
  /** false cât timp ramura nu a fost aleasă și totalul nu se poate ști. */
  known: boolean
}

/** Câte segmente desenăm ca sugestie vizuală înainte de alegerea ramurii. */
const PLACEHOLDER_TICKS = 7

export function ProgressIndicator({ current, total, label, known }: ProgressIndicatorProps) {
  const safeTotal = Math.max(total, 1)
  const ratio = known ? Math.min(1, (current + 1) / safeTotal) : 1 / PLACEHOLDER_TICKS
  const tickCount = known ? safeTotal : PLACEHOLDER_TICKS

  return (
    <div className="dvx__progress">
      <div className="dvx__progress-meta">
        <span>
          Pasul <strong>{String(current + 1).padStart(2, "0")}</strong> din{" "}
          <strong>{known ? String(safeTotal).padStart(2, "0") : "—"}</strong>
        </span>
        <span>{label}</span>
      </div>

      <div
        className="dvx__progress-track"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={known ? safeTotal : undefined}
        aria-valuenow={known ? current + 1 : undefined}
        aria-valuetext={
          known
            ? `Pasul ${current + 1} din ${safeTotal}: ${label}`
            : `Pasul ${current + 1}: ${label}. Numărul total de pași depinde de ce alegi.`
        }
      >
        {/* transform, nu width — animăm doar proprietăți ieftine */}
        <div className="dvx__progress-fill" style={{ transform: `scaleX(${ratio})` }} />
      </div>

      <div className="dvx__progress-ticks" aria-hidden="true">
        {Array.from({ length: tickCount }, (_, index) => (
          <span
            key={index}
            className="dvx__tick"
            data-done={known && index < current}
            data-current={known ? index === current : index === 0}
          />
        ))}
      </div>
    </div>
  )
}
