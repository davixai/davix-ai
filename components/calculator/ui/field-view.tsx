"use client"

// ============================================================================
// Randatorul universal de câmpuri.
// Un singur component acoperă alegerea unică, alegerea multiplă și textul
// liber — de aceea nu există cod duplicat între ramuri sau între pași.
// ============================================================================

import { useState } from "react"
import { Check, Info, X } from "lucide-react"
import type { Answers } from "@/lib/pricing"
import type { Field, FieldId, Option } from "../types"

export type AnswerValue = string | string[] | undefined

interface FieldViewProps {
  field: Field
  answers: Answers
  onChange: (id: FieldId, value: AnswerValue) => void
  /** Marchează vizual câmpurile obligatorii rămase necompletate. */
  showErrors?: boolean
  /**
   * Ascunde eticheta când titlul pasului spune deja același lucru, ca să nu
   * apară aceeași întrebare de două ori una sub alta. Rămâne accesibilă
   * pentru cititoarele de ecran.
   */
  hideLabel?: boolean
}

const MAX_NOTES = 600

// ----------------------------------------------------------------------------
// Eticheta de stare din colțul unei opțiuni
// ----------------------------------------------------------------------------
function Badge({ option }: { option: Option }) {
  if (!option.badge) return null
  return (
    <span className="dvx-badge" data-tone={option.badgeTone ?? "muted"}>
      {option.badgeTone === "live" || option.badgeTone === "wip" ? (
        <span className="dvx-badge__dot" aria-hidden="true" />
      ) : null}
      {option.badge}
    </span>
  )
}

// ----------------------------------------------------------------------------
// Alegere unică
// ----------------------------------------------------------------------------
function SingleView({ field, answers, onChange }: FieldViewProps) {
  const [openInfo, setOpenInfo] = useState<string | null>(null)

  if (field.kind !== "single") return null

  const selected = answers[field.id] as string | undefined

  return (
    <div
      className="dvx-field__options dvx-stagger"
      data-columns={field.columns ?? 2}
      role="radiogroup"
      aria-label={field.label}
    >
      {field.options.map((option) => {
        // Opțiunea „explică-mi" nu setează un răspuns, ci deschide un panou.
        if (option.info) {
          const isOpen = openInfo === option.value
          return (
            <div key={option.value}>
              <button
                type="button"
                className="dvx-option"
                aria-expanded={isOpen}
                onClick={() => setOpenInfo(isOpen ? null : option.value)}
              >
                <span className="dvx-option__mark" aria-hidden="true">
                  <Info strokeWidth={2.5} />
                </span>
                <span className="dvx-option__body">
                  <span className="dvx-option__label">{option.label}</span>
                  {option.desc ? <span className="dvx-option__desc">{option.desc}</span> : null}
                </span>
              </button>

              {isOpen ? (
                <div className="dvx-info">
                  <p className="dvx-info__title">
                    <Info aria-hidden="true" width={13} height={13} />
                    Ce face un chatbot
                  </p>
                  <p className="dvx-info__text">{option.info}</p>
                  <div className="dvx-fallback__actions">
                    <button
                      type="button"
                      className="dvx-btn dvx-btn--primary dvx-btn--sm"
                      onClick={() => {
                        onChange(field.id, "yes")
                        setOpenInfo(null)
                      }}
                    >
                      Da, îl vreau
                    </button>
                    <button
                      type="button"
                      className="dvx-btn dvx-btn--quiet dvx-btn--sm"
                      onClick={() => {
                        onChange(field.id, "no")
                        setOpenInfo(null)
                      }}
                    >
                      Nu, mulțumesc
                    </button>
                    <button
                      type="button"
                      className="dvx-btn dvx-btn--quiet dvx-btn--sm"
                      onClick={() => setOpenInfo(null)}
                    >
                      <X aria-hidden="true" width={14} height={14} />
                      Închide
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          )
        }

        const isSelected = selected === option.value
        const textField = option.textField

        return (
          <div key={option.value}>
            <button
              type="button"
              role="radio"
              aria-checked={isSelected}
              className="dvx-option"
              onClick={() => onChange(field.id, isSelected ? undefined : option.value)}
            >
              <span className="dvx-option__mark" aria-hidden="true">
                <Check strokeWidth={3} />
              </span>
              <span className="dvx-option__body">
                <Badge option={option} />
                <span className="dvx-option__label">{option.label}</span>
                {option.desc ? <span className="dvx-option__desc">{option.desc}</span> : null}
                {option.includes ? (
                  <ul className="dvx-option__includes">
                    {option.includes.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                ) : null}
              </span>
              {option.price ? <span className="dvx-option__price">{option.price}</span> : null}
            </button>

            {/* Opțiune care cere o precizare în text („Un program dedicat") */}
            {isSelected && textField ? (
              <div className="dvx-field__options">
                <label className="dvx-sr" htmlFor={`dvx-${String(textField.id)}`}>
                  {textField.placeholder}
                </label>
                <input
                  id={`dvx-${String(textField.id)}`}
                  className="dvx-input"
                  type="text"
                  autoComplete="off"
                  placeholder={textField.placeholder}
                  value={(answers[textField.id] as string | undefined) ?? ""}
                  onChange={(event) => onChange(textField.id, event.target.value)}
                />
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

// ----------------------------------------------------------------------------
// Alegere multiplă — switch-uri animate
// ----------------------------------------------------------------------------
function MultiView({ field, answers, onChange }: FieldViewProps) {
  if (field.kind !== "multi") return null

  const selected = (answers[field.id] as string[] | undefined) ?? []

  const toggle = (value: string) => {
    const next = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value]
    onChange(field.id, next.length ? next : undefined)
  }

  return (
    <div className="dvx-field__options dvx-stagger" data-columns={field.columns ?? 2}>
      {field.options.map((option) => {
        const isOn = selected.includes(option.value)
        return (
          <button
            key={option.value}
            type="button"
            className="dvx-toggle"
            aria-pressed={isOn}
            onClick={() => toggle(option.value)}
          >
            <span className="dvx-switch" aria-hidden="true">
              <span className="dvx-switch__knob" />
            </span>
            <span className="dvx-toggle__body">
              <span className="dvx-toggle__label">{option.label}</span>
              {option.desc ? <span className="dvx-option__desc">{option.desc}</span> : null}
            </span>
            {option.price ? <span className="dvx-toggle__price">{option.price}</span> : null}
          </button>
        )
      })}
    </div>
  )
}

// ----------------------------------------------------------------------------
// Text liber
// ----------------------------------------------------------------------------
function TextView({ field, answers, onChange, showErrors }: FieldViewProps) {
  if (field.kind !== "text") return null

  const value = (answers[field.id] as string | undefined) ?? ""
  const invalid = Boolean(showErrors && !field.optional && !value.trim())
  const inputId = `dvx-field-${String(field.id)}`

  return (
    <div>
      {field.multiline ? (
        <>
          <textarea
            id={inputId}
            className="dvx-textarea"
            placeholder={field.placeholder}
            maxLength={MAX_NOTES}
            aria-invalid={invalid}
            aria-describedby={`${inputId}-count`}
            value={value}
            onChange={(event) => onChange(field.id, event.target.value)}
          />
          <span className="dvx-counter" id={`${inputId}-count`}>
            {value.length} / {MAX_NOTES}
          </span>
        </>
      ) : (
        <input
          id={inputId}
          className="dvx-input"
          type="text"
          autoComplete="off"
          placeholder={field.placeholder}
          maxLength={160}
          aria-invalid={invalid}
          value={value}
          onChange={(event) => onChange(field.id, event.target.value)}
        />
      )}
    </div>
  )
}

// ----------------------------------------------------------------------------
// Punctul de intrare
// ----------------------------------------------------------------------------
export function FieldView(props: FieldViewProps) {
  const { field, hideLabel } = props
  const labelId = `dvx-label-${String(field.id)}`

  return (
    <fieldset className="dvx-fieldset">
      <legend className={hideLabel ? "dvx-sr" : "dvx-field__label"} id={labelId}>
        {field.label}
        {field.optional ? <span className="dvx-field__optional"> · opțional</span> : null}
      </legend>
      {field.hint ? <p className="dvx-field__hint">{field.hint}</p> : null}

      {field.kind === "single" ? <SingleView {...props} /> : null}
      {field.kind === "multi" ? <MultiView {...props} /> : null}
      {field.kind === "text" ? <TextView {...props} /> : null}
    </fieldset>
  )
}
