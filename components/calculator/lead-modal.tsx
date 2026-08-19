"use client"

// ============================================================================
// Modalul de cerere ofertă.
// Se deschide peste sumar, primește toate selecțiile din calculator într-un
// câmp ascuns și le trimite la /api/lead.
//
// Accesibilitate: rol dialog, focus mutat în modal la deschidere, capcană de
// focus pe Tab, Escape închide, focusul se întoarce la elementul declanșator.
// Pe mobil: panou lipit de jos, cu înălțime maximă și scroll propriu.
// ============================================================================

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { AlertCircle, Check, Loader2, Send, X } from "lucide-react"
import type { Answers, Estimate } from "@/lib/pricing"
import { buildPlainSummary } from "./export-utils"
import type { SubmitState } from "./types"

interface LeadModalProps {
  open: boolean
  onClose: () => void
  answers: Answers
  estimate: Estimate
}

interface FormValues {
  name: string
  phone: string
  email: string
  company: string
  city: string
  message: string
}

const EMPTY: FormValues = { name: "", phone: "", email: "", company: "", city: "", message: "" }

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function validate(values: FormValues): Partial<Record<keyof FormValues, string>> {
  const errors: Partial<Record<keyof FormValues, string>> = {}
  if (!values.name.trim()) errors.name = "Spune-mi cum te cheamă."
  if (!values.phone.trim()) errors.phone = "Am nevoie de un număr ca să te sun."
  else if (values.phone.replace(/\D/g, "").length < 9) errors.phone = "Numărul pare incomplet."
  if (!values.email.trim()) errors.email = "Adaugă o adresă de email."
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Adresa de email nu pare validă."
  return errors
}

export function LeadModal({ open, onClose, answers, estimate }: LeadModalProps) {
  const [values, setValues] = useState<FormValues>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({})
  const [state, setState] = useState<SubmitState>("idle")
  const [serverError, setServerError] = useState("")
  const [mounted, setMounted] = useState(false)

  const panelRef = useRef<HTMLDivElement>(null)
  const firstFieldRef = useRef<HTMLInputElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => setMounted(true), [])

  // Focus, blocare scroll pe fundal, Escape și capcană de focus.
  useEffect(() => {
    if (!open) return

    returnFocusRef.current = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 60)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== "Tab" || !panelRef.current) return

      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (!focusable.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
      window.clearTimeout(focusTimer)
      returnFocusRef.current?.focus?.()
    }
  }, [open, onClose])

  if (!open || !mounted) return null

  const set = (key: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((previous) => ({ ...previous, [key]: event.target.value }))
    setErrors((previous) => ({ ...previous, [key]: undefined }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setState("sending")
    setServerError("")

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          // Toate selecțiile din calculator, trimise automat.
          selections: answers,
          summary: buildPlainSummary(answers, estimate),
          estimate: {
            oneTimeMin: estimate.oneTime.min,
            oneTimeMax: estimate.oneTime.max,
            monthly: estimate.monthly.total,
            timeline: estimate.timeline.label,
            savings: estimate.savings ?? null,
          },
        }),
      })

      const data = (await response.json().catch(() => ({}))) as { error?: string }

      if (!response.ok) {
        setState("error")
        setServerError(data.error || "Nu am putut trimite cererea. Încearcă din nou.")
        return
      }

      setState("success")
    } catch {
      setState("error")
      setServerError("Nu am putut contacta serverul. Verifică conexiunea și încearcă din nou.")
    }
  }

  const field = (
    key: keyof FormValues,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> & { required?: boolean } = {},
  ) => {
    const id = `dvx-lead-${key}`
    const error = errors[key]
    return (
      <div>
        <label className="dvx-form__label" htmlFor={id}>
          {label}
          {props.required ? <span className="dvx-form__req"> *</span> : null}
        </label>
        <input
          {...props}
          id={id}
          ref={key === "name" ? firstFieldRef : undefined}
          className="dvx-input"
          value={values[key]}
          onChange={set(key)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {error ? (
          <p className="dvx-form__error" id={`${id}-error`}>
            {error}
          </p>
        ) : null}
      </div>
    )
  }

  return createPortal(
    <div className="dvx-scope">
      <div
        className="dvx-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dvx-lead-title"
      >
        <div className="dvx-modal__scrim" onClick={onClose} aria-hidden="true" />

        <div className="dvx-modal__panel" ref={panelRef}>
          <div className="dvx-modal__head">
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 className="dvx-modal__title" id="dvx-lead-title">
                {state === "success" ? "Cerere trimisă" : "Ofertă personalizată"}
              </h2>
              <p className="dvx-modal__sub">
                {state === "success"
                  ? "Ai primit și pe email o copie a estimării."
                  : "Estimarea ta se atașează automat. Nu trebuie să repeți nimic."}
              </p>
            </div>
            <button
              type="button"
              className="dvx-modal__close"
              onClick={onClose}
              aria-label="Închide fereastra"
            >
              <X aria-hidden="true" width={20} height={20} />
            </button>
          </div>

          {state === "success" ? (
            <div className="dvx-modal__body">
              <div className="dvx-success">
                <div className="dvx-success__ring">
                  <Check aria-hidden="true" width={28} height={28} strokeWidth={2.5} />
                </div>
                <h3 className="dvx-success__title">Am primit cererea ta</h3>
                <p className="dvx-success__text">
                  Îți răspund în <strong>maximum 24 de ore lucrătoare</strong>, pe telefon sau
                  email. Dacă e urgent, scrie-mi direct pe WhatsApp la 0729 369 094.
                </p>
              </div>
              <button type="button" className="dvx-btn dvx-btn--ghost dvx-btn--lg" onClick={onClose}>
                Închide
              </button>
            </div>
          ) : (
            <form className="dvx-modal__form" onSubmit={handleSubmit} noValidate>
              <div className="dvx-modal__body">
                <div className="dvx-form">
                  {field("name", "Nume", { required: true, autoComplete: "name", placeholder: "Numele tău" })}

                  <div className="dvx-form__pair">
                    {field("phone", "Telefon", {
                      required: true,
                      type: "tel",
                      inputMode: "tel",
                      autoComplete: "tel",
                      placeholder: "07XX XXX XXX",
                    })}
                    {field("email", "Email", {
                      required: true,
                      type: "email",
                      inputMode: "email",
                      autoComplete: "email",
                      placeholder: "email@exemplu.com",
                    })}
                  </div>

                  <div className="dvx-form__pair">
                    {field("company", "Firmă", {
                      autoComplete: "organization",
                      placeholder: "Numele firmei",
                    })}
                    {field("city", "Oraș", {
                      autoComplete: "address-level2",
                      placeholder: "Ex: Suceava",
                    })}
                  </div>

                  <div>
                    <label className="dvx-form__label" htmlFor="dvx-lead-message">
                      Mesaj
                    </label>
                    <textarea
                      id="dvx-lead-message"
                      className="dvx-textarea"
                      placeholder="Ceva ce ar trebui să știm înainte de discuție?"
                      maxLength={1500}
                      value={values.message}
                      onChange={set("message")}
                    />
                  </div>

                  {/* Selecțiile din calculator, trimise automat */}
                  <input
                    type="hidden"
                    name="selections"
                    value={buildPlainSummary(answers, estimate)}
                    readOnly
                  />

                  {state === "error" ? (
                    <div className="dvx-alert" data-tone="error" role="alert">
                      <AlertCircle aria-hidden="true" />
                      <span>{serverError}</span>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="dvx-modal__foot">
                <button
                  type="submit"
                  className="dvx-btn dvx-btn--primary dvx-btn--lg"
                  disabled={state === "sending"}
                >
                  {state === "sending" ? (
                    <>
                      <Loader2 aria-hidden="true" width={18} height={18} className="dvx-spin" />
                      Se trimite…
                    </>
                  ) : (
                    <>
                      <Send aria-hidden="true" width={17} height={17} />
                      Trimite cererea
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
