"use client"

// ============================================================================
// Pasul de întrebări — randează câmpurile definite în `flow.ts`.
// Dacă un pas ajunge fără câmpuri (ramură incompletă, stare neprevăzută),
// afișează o stare goală EXPLICITĂ, cu explicație și buton de ieșire.
// Nu există scenariu în care ecranul rămâne gol.
// ============================================================================

import { Compass } from "lucide-react"
import type { Answers } from "@/lib/pricing"
import type { Step } from "../types"
import { FieldView, type AnswerValue } from "../ui/field-view"
import type { FieldId } from "../types"

interface FieldsStepProps {
  step: Extract<Step, { kind: "fields" }>
  answers: Answers
  onChange: (id: FieldId, value: AnswerValue) => void
  showErrors: boolean
  onReset: () => void
}

export function FieldsStep({ step, answers, onChange, showErrors, onReset }: FieldsStepProps) {
  if (!step.fields.length) {
    return (
      <div className="dvx-fallback" style={{ borderColor: "var(--dvx-line-2)", background: "var(--dvx-surface)" }}>
        <div className="dvx-success__ring" style={{ borderColor: "var(--dvx-line-2)", background: "var(--dvx-surface-2)", color: "var(--dvx-steel)" }}>
          <Compass aria-hidden="true" width={24} height={24} />
        </div>
        <h3 className="dvx-fallback__title">Nu avem întrebări pentru varianta asta</h3>
        <p className="dvx-fallback__text">
          Cazul tău iese din tiparele pe care le acoperă calculatorul. Ia-o de la capăt cu altă
          direcție sau scrie-ne direct — răspundem cu o estimare făcută de om.
        </p>
        <div className="dvx-fallback__actions">
          <button type="button" className="dvx-btn dvx-btn--primary dvx-btn--sm" onClick={onReset}>
            Alege altă direcție
          </button>
          <a className="dvx-btn dvx-btn--quiet dvx-btn--sm" href="https://wa.me/40729369094" target="_blank" rel="noopener noreferrer">
            Scrie pe WhatsApp
          </a>
        </div>
      </div>
    )
  }

  const normalize = (value: string) => value.trim().toLowerCase().replace(/[?.!]+$/, "")

  return (
    <div className="dvx-step__body">
      {step.fields.map((field) => (
        <FieldView
          key={String(field.id)}
          field={field}
          answers={answers}
          onChange={onChange}
          showErrors={showErrors}
          // Titlul pasului spune deja aceeași întrebare → nu o repetăm.
          hideLabel={normalize(field.label) === normalize(step.title)}
        />
      ))}
    </div>
  )
}
