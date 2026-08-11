// ============================================================================
// components/calculator/types.ts
// Tipurile de interfață ale calculatorului. Modelul de date (răspunsuri,
// prețuri, estimare) stă în `lib/pricing.ts`.
// ============================================================================

import type { Answers } from "@/lib/pricing"

/** Cheile de răspuns pe care le poate scrie un câmp. */
export type FieldId = keyof Answers

/** O opțiune dintr-un câmp cu alegere unică sau multiplă. */
export interface Option {
  value: string
  label: string
  /** Text explicativ sub etichetă. */
  desc?: string
  /** Etichetă mică în colț: „DISPONIBIL", „ÎN LUCRU", „+500 lei". */
  badge?: string
  /** Ton vizual pentru badge. */
  badgeTone?: "accent" | "live" | "wip" | "muted"
  /** Preț afișat cu font mono, în dreapta opțiunii. */
  price?: string
  /** Puncte concrete afișate sub opțiune (ex. ce include un pachet de mentenanță). */
  includes?: string[]
  /**
   * Opțiune „explică-mi": nu setează un răspuns, ci deschide un panou scurt
   * cu explicația, după care utilizatorul revine la alegere.
   */
  info?: string
  /** Când opțiunea e selectată, cere și un text liber legat de ea. */
  textField?: { id: FieldId; placeholder: string }
}

interface BaseField {
  id: FieldId
  label: string
  /** Microtext sub etichetă, care încurajează un răspuns mai bun. */
  hint?: string
  /** Câmpurile opționale nu blochează trecerea la pasul următor. */
  optional?: boolean
}

export interface SingleField extends BaseField {
  kind: "single"
  options: Option[]
  /** Numărul de coloane pe desktop. Implicit 2. */
  columns?: 1 | 2
}

export interface MultiField extends BaseField {
  kind: "multi"
  options: Option[]
  columns?: 1 | 2
}

export interface TextField extends BaseField {
  kind: "text"
  placeholder: string
  multiline?: boolean
}

export type Field = SingleField | MultiField | TextField

/**
 * Un pas al calculatorului. Toți pașii „de întrebări" folosesc același tip
 * `fields`, ca să existe un singur randator, fără cod duplicat.
 */
export type Step =
  | { kind: "branch"; id: "branch"; eyebrow: string; title: string; subtitle?: string }
  | {
      kind: "fields"
      id: string
      eyebrow: string
      title: string
      subtitle?: string
      fields: Field[]
    }
  | { kind: "summary"; id: "summary"; eyebrow: string; title: string; subtitle?: string }

/** Starea unei cereri trimise către /api/lead. */
export type SubmitState = "idle" | "sending" | "success" | "error"
