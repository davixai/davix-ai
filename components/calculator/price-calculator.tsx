"use client"

// ============================================================================
// CALCULATOR DE ESTIMARE — componenta principală.
//
// Se montează oriunde în pagină: <PriceCalculator />
//
// Reguli respectate aici, explicit:
//  · Conținutul e vizibil fără JavaScript — nu există `initial={{opacity:0}}`
//    pe nimic din conținut; animațiile de intrare sunt CSS.
//  · Framer Motion apare doar în `AnimatedNumber` (tranziția unei cifre).
//  · Fără AnimatePresence pe conținutul pașilor — folosim `key` pe pas plus
//    o animație CSS, deci nu există interval în care ecranul e gol.
//  · Fiecare pas e învelit într-un Error Boundary care se resetează la
//    schimbarea pasului.
// ============================================================================

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { type Answers, type Branch, estimate as computeEstimate } from "@/lib/pricing"
import { buildFlow, firstMissingField, isStepComplete } from "./flow"
import { describeAnswers } from "./describe"
import { clearLocally, loadLocally, saveLocally } from "./export-utils"
import { LeadModal } from "./lead-modal"
import { BranchStep } from "./steps/branch-step"
import { FieldsStep } from "./steps/fields-step"
import { SummaryStep } from "./steps/summary-step"
import type { FieldId } from "./types"
import { Confetti } from "./ui/confetti"
import { LivePanel } from "./ui/live-panel"
import { MobileBar } from "./ui/mobile-bar"
import { ProgressIndicator } from "./ui/progress-indicator"
import { StepErrorBoundary } from "./ui/step-error-boundary"
import type { AnswerValue } from "./ui/field-view"

import "./calculator.css"

/** Marcaj de versiune vizibil în interfață — arată ce build rulează. */
export const CALCULATOR_VERSION = "v1.0"

export function PriceCalculator() {
  const [answers, setAnswers] = useState<Answers>({})
  const [stepIndex, setStepIndex] = useState(0)
  const [showErrors, setShowErrors] = useState(false)
  const [leadOpen, setLeadOpen] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const [draft, setDraft] = useState<{ answers: Answers; stepIndex: number } | null>(null)
  const [inView, setInView] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  // — Flux, pas curent și estimare, recalculate la fiecare răspuns —
  const flow = useMemo(() => buildFlow(answers), [answers])
  const safeIndex = Math.min(stepIndex, flow.length - 1)
  const step = flow[safeIndex]
  const estimate = useMemo(() => computeEstimate(answers), [answers])
  const selections = useMemo(() => describeAnswers(answers), [answers])

  const isSummary = step.kind === "summary"
  const isLast = safeIndex === flow.length - 1
  const stepComplete = isStepComplete(step, answers)

  // — Estimare salvată anterior în acest browser —
  useEffect(() => {
    const saved = loadLocally()
    if (saved?.answers?.branch) setDraft(saved)
  }, [])

  // — Urmărim dacă secțiunea e pe ecran.
  //   Bara fixă de jos apare doar atunci, nu pe toată pagina. Cât timp e
  //   afișată, atributele de pe <body> ridică widget-ul de chat și ascund
  //   CTA-ul plutitor (care duce tot aici), ca să nu acopere opțiunile. —
  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting
        setInView(visible)
        if (visible) {
          document.body.dataset.dvxVisible = "1"
          document.body.dataset.dvxBar = "1"
        } else {
          delete document.body.dataset.dvxVisible
          delete document.body.dataset.dvxBar
        }
      },
      { threshold: 0, rootMargin: "-15% 0px -15% 0px" },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      delete document.body.dataset.dvxVisible
      delete document.body.dataset.dvxBar
    }
  }, [])

  // — Confetti la finalizare —
  useEffect(() => {
    if (!isSummary) return
    setConfetti(true)
    const timer = window.setTimeout(() => setConfetti(false), 2600)
    return () => window.clearTimeout(timer)
  }, [isSummary])

  // — Aducem pasul în câmpul vizual doar dacă a ieșit din el —
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const node = headerRef.current
    if (!node) return

    const rect = node.getBoundingClientRect()
    if (rect.top >= 0 && rect.top < window.innerHeight * 0.45) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    node.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" })
  }, [safeIndex])

  // — Mutații —
  const setAnswer = useCallback((id: FieldId, value: AnswerValue) => {
    setShowErrors(false)
    setAnswers((previous) => {
      const next = { ...previous, [id]: value } as Answers

      // Schimbarea tipului de site poate elimina pasul cu numărul de pagini;
      // curățăm răspunsul rămas ca să nu apară în sumar.
      if (id === "siteType" && value === "landing") delete next.sitePages
      return next
    })
  }, [])

  const selectBranch = useCallback((branch: Branch) => {
    // O ramură nouă înseamnă un flux nou — nu păstrăm răspunsuri din alta.
    setAnswers({ branch })
    setShowErrors(false)
    setStepIndex(1)
  }, [])

  const goNext = useCallback(() => {
    if (!isStepComplete(flow[safeIndex], answers)) {
      setShowErrors(true)
      return
    }
    setShowErrors(false)
    setStepIndex((previous) => Math.min(previous + 1, flow.length - 1))
  }, [answers, flow, safeIndex])

  const goBack = useCallback(() => {
    setShowErrors(false)
    setStepIndex((previous) => Math.max(0, previous - 1))
  }, [])

  const restart = useCallback(() => {
    setAnswers({})
    setStepIndex(0)
    setShowErrors(false)
    setDraft(null)
    clearLocally()
  }, [])

  const resumeDraft = useCallback(() => {
    if (!draft) return
    setAnswers(draft.answers)
    setStepIndex(draft.stepIndex)
    setDraft(null)
  }, [draft])

  // Salvăm automat înainte de a deschide formularul, ca lead-ul să nu se piardă.
  const openLead = useCallback(() => {
    saveLocally(answers, safeIndex)
    setLeadOpen(true)
  }, [answers, safeIndex])

  const missing = showErrors ? firstMissingField(step, answers) : undefined
  const nextIsSummary = flow[safeIndex + 1]?.kind === "summary"
  const nextLabel = nextIsSummary ? "Vezi estimarea" : "Continuă"
  // Pe bara de mobil eticheta e scurtă, ca prețul live să nu fie tăiat.
  const mobileNextLabel = isSummary ? "Cere oferta" : nextIsSummary ? "Estimare" : "Continuă"

  return (
    <>
      {/* Ancoră pentru linkurile existente către #contact din tot site-ul */}
      <span id="contact" aria-hidden="true" />

      <section className="dvx" id="calculator" aria-labelledby="dvx-heading" ref={sectionRef}>
        <div className="dvx__atmos" aria-hidden="true" />

        <div className="dvx__inner">
          {/* — Antet — */}
          <header className="dvx__head">
            <span className="dvx__eyebrow">
              <span className="dvx__eyebrow-dot" aria-hidden="true" />
              Estimare în sub un minut
            </span>
            <h2 className="dvx__title" id="dvx-heading">
              Ce vrei să construim?
            </h2>
            <p className="dvx__subtitle">
              Răspunde la câteva întrebări și primești o estimare de preț în mai puțin de un minut.
            </p>
          </header>

          {/* — Progres — */}
          <ProgressIndicator
            current={safeIndex}
            total={flow.length}
            label={step.title}
            known={Boolean(answers.branch)}
          />

          {/* — Conținut — */}
          <div className="dvx__grid">
            <div>
              <div className="dvx-panel dvx-panel--flush">
                {draft ? (
                  <div className="dvx-resume">
                    <span className="dvx-resume__text">
                      Ai o estimare începută în acest browser. Vrei să continui de unde ai rămas?
                    </span>
                    <button
                      type="button"
                      className="dvx-btn dvx-btn--primary dvx-btn--sm"
                      onClick={resumeDraft}
                    >
                      Reia
                    </button>
                    <button
                      type="button"
                      className="dvx-btn dvx-btn--quiet dvx-btn--sm"
                      onClick={() => {
                        setDraft(null)
                        clearLocally()
                      }}
                    >
                      Șterge
                    </button>
                  </div>
                ) : null}

                {/* `key` pe pas + animație CSS: fără AnimatePresence, deci fără
                    interval în care conținutul dispare de pe ecran. */}
                <div className="dvx-step" key={step.id} ref={headerRef}>
                  <p className="dvx-step__eyebrow">{step.eyebrow}</p>
                  <h3 className="dvx-step__title">{step.title}</h3>
                  {step.subtitle ? <p className="dvx-step__subtitle">{step.subtitle}</p> : null}

                  <StepErrorBoundary resetKey={step.id} onReset={restart}>
                    {step.kind === "branch" ? (
                      <BranchStep value={answers.branch} onSelect={selectBranch} />
                    ) : null}

                    {step.kind === "fields" ? (
                      <FieldsStep
                        step={step}
                        answers={answers}
                        onChange={setAnswer}
                        showErrors={showErrors}
                        onReset={restart}
                      />
                    ) : null}

                    {step.kind === "summary" ? (
                      <SummaryStep
                        answers={answers}
                        estimate={estimate}
                        selections={selections}
                        stepIndex={safeIndex}
                        onRequestOffer={openLead}
                        onRestart={restart}
                      />
                    ) : null}
                  </StepErrorBoundary>

                  {/* — Navigare desktop — */}
                  {!isSummary ? (
                    <div className="dvx-nav">
                      <button
                        type="button"
                        className="dvx-btn dvx-btn--quiet"
                        onClick={goBack}
                        disabled={safeIndex === 0}
                      >
                        <ArrowLeft aria-hidden="true" width={16} height={16} />
                        Înapoi
                      </button>

                      <span className="dvx-nav__spacer" />

                      {missing ? (
                        <span className="dvx-nav__note" role="alert">
                          Completează: {missing.label}
                        </span>
                      ) : null}

                      <button
                        type="button"
                        className="dvx-btn dvx-btn--primary"
                        onClick={goNext}
                        disabled={isLast}
                        aria-disabled={!stepComplete}
                      >
                        {nextLabel}
                        <ArrowRight aria-hidden="true" width={16} height={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="dvx-nav">
                      <button type="button" className="dvx-btn dvx-btn--quiet" onClick={goBack}>
                        <ArrowLeft aria-hidden="true" width={16} height={16} />
                        Modifică răspunsurile
                      </button>
                      <span className="dvx-nav__spacer" />
                      <span className="dvx-nav__note">Estimare generată {CALCULATOR_VERSION}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* — Panoul live — */}
            <LivePanel
              estimate={estimate}
              selections={selections}
              version={CALCULATOR_VERSION}
              hiddenOnMobile={isSummary}
            />
          </div>
        </div>

        {/* — Bara fixă de jos, pe mobil, doar cât timp secțiunea e pe ecran — */}
        {inView ? (
        <MobileBar
          canGoBack={safeIndex > 0}
          canGoNext={isSummary || !isLast}
          onBack={goBack}
          onNext={isSummary ? openLead : goNext}
          priceMin={estimate.oneTime.min}
          priceMax={estimate.oneTime.max}
          hasPrice={estimate.ready && estimate.oneTime.max > 0}
          nextLabel={mobileNextLabel}
        />
        ) : null}

        <Confetti active={confetti} />
      </section>

      <LeadModal
        open={leadOpen}
        onClose={() => setLeadOpen(false)}
        answers={answers}
        estimate={estimate}
      />
    </>
  )
}
