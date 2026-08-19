// ============================================================================
// components/calculator/flow.ts
// Fluxul de pași, construit DINAMIC din răspunsurile de până acum.
//
// Ca să adaugi o ramură nouă:
//   1. adaugi cheile de răspuns în `Answers` (lib/pricing.ts)
//   2. adaugi un `case` în `buildFlow`
//   3. adaugi calculul în `lib/pricing.ts`
// Nu trebuie atinsă nicio componentă vizuală.
// ============================================================================

import type { Answers } from "@/lib/pricing"
import {
  APP_MODULE_LABELS,
  APP_PRICES,
  AUTOMATION_PRICES,
  AUTOMATION_TASK_LABELS,
  CAFE_MODULE_LABELS,
  MAINTENANCE_PRICES,
  SITE_FEATURE_LABELS,
  SITE_FEATURE_PRICES,
  formatLei,
  siteRangeLabel,
} from "@/lib/pricing"
import type { Field, Option, Step } from "./types"

// ----------------------------------------------------------------------------
// Helpere de construcție
// ----------------------------------------------------------------------------

/** Transformă un dicționar de etichete în opțiuni, adăugând prețul unde există. */
function optionsFromLabels(
  labels: Record<string, string>,
  prices?: Record<string, number>,
): Option[] {
  return Object.entries(labels).map(([value, label]) => {
    const price = prices?.[value]
    return {
      value,
      label,
      price: price === undefined ? undefined : price === 0 ? "inclus" : `+${formatLei(price)}`,
    }
  })
}

// ============================================================================
// PASUL 0 — comun
// ============================================================================

const branchStep: Step = {
  kind: "branch",
  id: "branch",
  eyebrow: "Pasul 1",
  title: "De ce ai nevoie?",
  subtitle: "Alege direcția. Restul întrebărilor se adaptează la ce alegi aici.",
}

const summaryStep: Step = {
  kind: "summary",
  id: "summary",
  eyebrow: "Rezultat",
  title: "Estimarea ta",
  subtitle: "Am pus cap la cap tot ce ai ales.",
}

// ============================================================================
// RAMURA A — SITE
// ============================================================================

const siteTypeField: Field = {
  kind: "single",
  id: "siteType",
  label: "Ce fel de site?",
  columns: 1,
  options: [
    {
      value: "landing",
      label: "Landing page",
      desc: "O singură pagină, construită în jurul unei conversii.",
      price: siteRangeLabel("landing"),
    },
    {
      value: "presentation",
      label: "Site de prezentare",
      desc: "Firma, serviciile și datele de contact, structurate clar.",
      price: siteRangeLabel("presentation"),
    },
    {
      value: "multipage",
      label: "Site cu mai multe pagini",
      desc: "Servicii separate, blog, portofoliu — fiecare cu pagina lui.",
      price: siteRangeLabel("multipage"),
    },
    {
      value: "shop",
      label: "Magazin online",
      desc: "Catalog, coș, comenzi și plată online — un site nou, construit pentru vânzare.",
      price: siteRangeLabel("shop"),
    },
    {
      value: "unsure",
      label: "Nu sunt sigur, ajută-mă să aleg",
      desc: "Pornesc de la o variantă medie și o ajustez la discuție.",
    },
  ],
}

const sitePagesField: Field = {
  kind: "single",
  id: "sitePages",
  label: "Câte pagini estimezi?",
  options: [
    { value: "1", label: "1 pagină" },
    { value: "2-5", label: "2 – 5 pagini" },
    { value: "6-10", label: "6 – 10 pagini" },
    { value: "10+", label: "Peste 10 pagini" },
    { value: "unknown", label: "Nu știu încă" },
  ],
}

const siteFeaturesField: Field = {
  kind: "multi",
  id: "siteFeatures",
  label: "Ce trebuie să conțină?",
  hint: "Alege tot ce ți se potrivește. Poți schimba oricând mai târziu.",
  options: optionsFromLabels(SITE_FEATURE_LABELS, SITE_FEATURE_PRICES),
}

const siteChatbotField: Field = {
  kind: "single",
  id: "siteChatbot",
  label: "Vrei chatbot / asistent virtual pe site?",
  columns: 1,
  options: [
    {
      value: "yes",
      label: "Da, vreau să răspundă automat vizitatorilor",
      desc: "Preia întrebările frecvente și cererile de ofertă, non-stop.",
      price: `+${formatLei(500)}`,
    },
    { value: "no", label: "Nu", desc: "Rămâi la formularul clasic de contact." },
    {
      value: "info",
      label: "Explică-mi ce face, apoi decid",
      info:
        "Chatbot-ul stă pe site și răspunde în locul tău. Îl antrenez pe serviciile, prețurile și programul tău, ca să dea răspunsuri corecte, nu generice. Preia întrebările repetitive, cere datele de contact ale celor interesați și ți le trimite pe WhatsApp sau email. Când întrebarea îl depășește, predă discuția către tine, fără să piardă clientul. Practic, prinde cererile care ar veni noaptea sau când ești ocupat.",
    },
  ],
}

const siteDomainField: Field = {
  kind: "single",
  id: "siteDomain",
  label: "Ai deja domeniu și găzduire?",
  options: [
    { value: "all", label: "Da, am tot", price: `−${formatLei(100)}` },
    { value: "domain", label: "Am doar domeniu", price: `−${formatLei(100)}` },
    { value: "none", label: "Nu am nimic", desc: "Primul an este inclus în preț.", price: "inclus" },
  ],
}

const siteAssetsField: Field = {
  kind: "single",
  id: "siteAssets",
  label: "Ai materialele pregătite?",
  options: [
    { value: "all", label: "Da: logo, poze, texte" },
    { value: "partial", label: "Parțial", price: `+${formatLei(125)}` },
    { value: "none", label: "Nu am nimic încă", price: `+${formatLei(250)}` },
  ],
}

const siteMaintenanceField: Field = {
  kind: "single",
  id: "siteMaintenance",
  label: "Mentenanță lunară",
  hint: "Poți renunța sau schimba pachetul oricând, fără penalizare.",
  columns: 1,
  options: [
    {
      value: "essential",
      label: "Esențial",
      price: `${formatLei(MAINTENANCE_PRICES.essential)}/lună`,
      includes: ["Găzduire și domeniu", "Certificat SSL și securitate", "Mici corecții de text"],
    },
    {
      value: "active",
      label: "Activ",
      price: `${formatLei(MAINTENANCE_PRICES.active)}/lună`,
      includes: [
        "Tot din Esențial",
        "Modificări medii de conținut lunar",
        "Actualizări de poze și oferte",
      ],
    },
    {
      value: "complete",
      label: "Complet",
      price: `${formatLei(MAINTENANCE_PRICES.complete)}/lună`,
      includes: [
        "Tot din Activ",
        "Modificări mari și pagini noi",
        "Optimizări de viteză și Google",
      ],
    },
    {
      value: "none",
      label: "Fără mentenanță",
      desc: `Îmi asum eu administrarea. Modificările punctuale se tarifează cu ${formatLei(MAINTENANCE_PRICES.extraHourly)}/oră.`,
    },
  ],
}

function siteFlow(answers: Answers): Step[] {
  const steps: Step[] = [
    {
      kind: "fields",
      id: "site-type",
      eyebrow: "Site",
      title: "Ce fel de site?",
      fields: [siteTypeField],
    },
  ]

  // Un landing page are prin definiție o singură pagină — sărim peste A2.
  if (answers.siteType !== "landing") {
    steps.push({
      kind: "fields",
      id: "site-pages",
      eyebrow: "Site",
      title: "Cât de mare e?",
      fields: [sitePagesField],
    })
  }

  steps.push(
    {
      kind: "fields",
      id: "site-features",
      eyebrow: "Site",
      title: "Ce trebuie să conțină?",
      fields: [siteFeaturesField],
    },
    {
      kind: "fields",
      id: "site-chatbot",
      eyebrow: "Site",
      title: "Asistent virtual",
      fields: [siteChatbotField],
    },
    {
      kind: "fields",
      id: "site-setup",
      eyebrow: "Site",
      title: "Ce ai deja pregătit?",
      subtitle: "Mă ajută să știu de unde pornesc.",
      fields: [siteDomainField, siteAssetsField],
    },
    {
      kind: "fields",
      id: "site-maintenance",
      eyebrow: "Site",
      title: "După lansare",
      subtitle: "Un site lăsat nesupravegheat se strică. Alege cum îl ținem în viață.",
      fields: [siteMaintenanceField],
    },
  )

  return steps
}

// ============================================================================
// RAMURA B — AUTOMATIZARE
// ============================================================================

const autoIndustryField: Field = {
  kind: "single",
  id: "autoIndustry",
  label: "În ce domeniu lucrezi?",
  options: [
    { value: "clinic", label: "Cabinet / clinică" },
    { value: "horeca", label: "HoReCa", desc: "Cafenea, restaurant, bar" },
    { value: "construction", label: "Construcții și servicii la domiciliu" },
    { value: "retail", label: "Comerț / retail" },
    { value: "professional", label: "Servicii profesionale", desc: "Contabilitate, consultanță, juridic" },
    { value: "other", label: "Altul" },
  ],
}

const autoTasksField: Field = {
  kind: "multi",
  id: "autoTasks",
  label: "Ce îți mănâncă cel mai mult timp?",
  hint: `Fiecare bifă e un proces pe care îl pot prelua — ${formatLei(AUTOMATION_PRICES.perProcess)} implementarea unui proces.`,
  options: optionsFromLabels(AUTOMATION_TASK_LABELS),
}

const autoHoursField: Field = {
  kind: "single",
  id: "autoHours",
  label: "Câte ore pe săptămână pierzi cu astea?",
  options: [
    { value: "<5", label: "Sub 5 ore" },
    { value: "5-10", label: "5 – 10 ore" },
    { value: "10-20", label: "10 – 20 ore" },
    { value: ">20", label: "Peste 20 de ore" },
  ],
}

const autoToolsField: Field = {
  kind: "single",
  id: "autoTools",
  label: "Cu ce lucrezi acum?",
  options: [
    { value: "whatsapp", label: "WhatsApp și telefon" },
    { value: "email", label: "Email" },
    { value: "sheets", label: "Excel / Google Sheets" },
    { value: "paper", label: "Agendă pe hârtie" },
    {
      value: "software",
      label: "Un program dedicat",
      textField: { id: "autoToolsOther", placeholder: "Ce program folosești?" },
    },
    { value: "nothing", label: "Nimic organizat" },
  ],
}

const autoUsersField: Field = {
  kind: "single",
  id: "autoUsers",
  label: "Câți oameni ar folosi sistemul?",
  options: [
    { value: "1", label: "Doar eu" },
    { value: "2-5", label: "2 – 5 oameni" },
    { value: "6-15", label: "6 – 15 oameni" },
    { value: "15+", label: "Peste 15" },
  ],
}

const autoNotesField: Field = {
  kind: "text",
  id: "autoNotes",
  label: "Descrie pe scurt procesul care te încurcă cel mai tare",
  hint: "Cu cât e mai concret, cu atât estimarea e mai apropiată de realitate.",
  placeholder:
    "Ex: primesc cereri pe WhatsApp, le trec manual în agendă, apoi sun fiecare client cu o zi înainte ca să confirm...",
  multiline: true,
  optional: true,
}

function automationFlow(): Step[] {
  return [
    {
      kind: "fields",
      id: "auto-industry",
      eyebrow: "Automatizare",
      title: "Unde lucrezi?",
      fields: [autoIndustryField],
    },
    {
      kind: "fields",
      id: "auto-tasks",
      eyebrow: "Automatizare",
      title: "Unde se duce timpul?",
      fields: [autoTasksField],
    },
    {
      kind: "fields",
      id: "auto-volume",
      eyebrow: "Automatizare",
      title: "Cât de mare e pierderea?",
      subtitle: "De aici calculez cât economisești lunar.",
      fields: [autoHoursField, autoUsersField],
    },
    {
      kind: "fields",
      id: "auto-tools",
      eyebrow: "Automatizare",
      title: "Cu ce lucrezi azi?",
      fields: [autoToolsField],
    },
    {
      kind: "fields",
      id: "auto-notes",
      eyebrow: "Automatizare",
      title: "Spune-mi în cuvintele tale",
      subtitle: `Abonamentul lunar pornește de la ${formatLei(AUTOMATION_PRICES.monthlyMin)} și urcă spre ${formatLei(AUTOMATION_PRICES.monthlyMax)}, după cât de complex e sistemul.`,
      fields: [autoNotesField],
    },
  ]
}

// ============================================================================
// RAMURA C — APLICAȚIE
// ============================================================================

const appTypeField: Field = {
  kind: "single",
  id: "appType",
  label: "Ce fel de aplicație?",
  columns: 1,
  options: [
    {
      value: "dental",
      label: "DaviX Dental",
      desc: "Soluție gata, funcțională, pentru cabinete stomatologice. Implementarea e inclusă în abonament.",
      badge: "Disponibil",
      badgeTone: "live",
      price: `de la ${formatLei(APP_PRICES.dental.plans.starter)}/lună`,
    },
    {
      value: "cafe",
      label: "DaviX Cafe",
      desc: "Meniu digital prin cod QR și program de fidelizare pentru cafenele. Încă în dezvoltare — prețul se stabilește la lansare.",
      badge: "În lucru",
      badgeTone: "wip",
      price: "preț la lansare",
    },
    {
      value: "custom",
      label: "Aplicație personalizată",
      desc: "Construită de la zero, exact pe procesul tău.",
      badge: "La comandă",
      badgeTone: "accent",
      price: `de la ${formatLei(APP_PRICES.custom.setupFrom)}`,
    },
  ],
}

const dentalPlanField: Field = {
  kind: "single",
  id: "appDentalPlan",
  label: "Ce plan alegi?",
  columns: 1,
  options: [
    {
      value: "starter",
      label: "Starter",
      desc: "Aplicația completă, fără mesaje automate.",
      price: `${formatLei(APP_PRICES.dental.plans.starter)}/lună`,
      includes: [
        "Calendar, programări pe medic și rechemări",
        "Fișe pacienți, odontogramă și planuri de tratament",
        "Financiar, laborator și fișiere medicale",
      ],
    },
    {
      value: "pro",
      label: "Pro",
      desc: "Automatizări SMS active, cu mesajele plătite direct de clinică.",
      price: `${formatLei(APP_PRICES.dental.plans.pro)}/lună`,
      includes: [
        "Tot din Starter",
        "Reminder programare automat",
        "Cerere automată de review Google",
      ],
    },
    {
      value: "max",
      label: "Max",
      desc: "La fel ca Pro, dar mă ocup eu de SMS-uri.",
      price: `${formatLei(APP_PRICES.dental.plans.max)}/lună`,
      includes: [
        "Tot din Pro",
        "450 SMS/lună incluse și gestionate de mine",
        "Monitorizare consum și raportare lunară",
      ],
    },
  ],
}

const dentalUsersField: Field = {
  kind: "single",
  id: "appDentalUsers",
  label: "Câți oameni vor avea cont?",
  hint: `Admin + 5 utilizatori sunt incluși. Peste ei, ${formatLei(APP_PRICES.dental.extraUserMonthly)}/lună de utilizator.`,
  options: [
    { value: "1-6", label: "Până în 6", price: "inclus" },
    { value: "7-10", label: "7 – 10" },
    { value: "10+", label: "Peste 10" },
  ],
}

function appFlow(answers: Answers): Step[] {
  const steps: Step[] = [
    {
      kind: "fields",
      id: "app-type",
      eyebrow: "Aplicație",
      title: "Ce fel de aplicație?",
      fields: [appTypeField],
    },
  ]

  if (answers.appType === "dental") {
    steps.push({
      kind: "fields",
      id: "app-dental",
      eyebrow: "DaviX Dental",
      title: "Ce plan ți se potrivește?",
      subtitle: "Aceleași planuri ca pe pagina Davix Dental. Implementarea, importul datelor și instruirea sunt incluse.",
      fields: [dentalPlanField, dentalUsersField],
    })
  }

  if (answers.appType === "cafe") {
    steps.push({
      kind: "fields",
      id: "app-cafe",
      eyebrow: "DaviX Cafe",
      title: "Ce ai vrea să conțină?",
      subtitle:
        "Aplicația e încă în lucru, așa că nu are un preț stabilit. Notez ce îți trebuie și te anunț primul la lansare.",
      fields: [
        {
          kind: "multi",
          id: "appCafeModules",
          label: "Ce vrei să conțină?",
          options: optionsFromLabels(CAFE_MODULE_LABELS),
        },
      ],
    })
  }

  if (answers.appType === "custom") {
    steps.push({
      kind: "fields",
      id: "app-custom",
      eyebrow: "Aplicație personalizată",
      title: "Cum arată aplicația ta?",
      subtitle: "Trei întrebări și am o imagine destul de clară.",
      fields: [
        {
          kind: "text",
          id: "appCustomIndustry",
          label: "Pentru ce domeniu?",
          placeholder: "Ex: service auto, sală de fitness, firmă de curierat...",
        },
        {
          kind: "multi",
          id: "appCustomModules",
          label: "Ce module trebuie să conțină?",
          hint: `Primele ${3} module sunt incluse în prețul de pornire.`,
          options: optionsFromLabels(APP_MODULE_LABELS),
        },
        {
          kind: "single",
          id: "appCustomPlatform",
          label: "Pe ce rulează?",
          options: [
            { value: "web", label: "Web", desc: "Se deschide în browser, pe orice dispozitiv." },
            { value: "mobile", label: "Mobil", desc: "Aplicație instalabilă pe telefon.", price: `+${formatLei(800)}` },
            { value: "both", label: "Ambele", price: `+${formatLei(800)}` },
          ],
        },
      ],
    })
  }

  return steps
}

// ============================================================================
// CONSTRUCTORUL DE FLUX
// ============================================================================

/**
 * Returnează lista completă de pași pentru starea curentă a răspunsurilor.
 * Se recalculează la fiecare răspuns, deci numărul total de pași din
 * indicatorul de progres este mereu corect.
 */
export function buildFlow(answers: Answers): Step[] {
  const steps: Step[] = [branchStep]

  switch (answers.branch) {
    case "site":
      steps.push(...siteFlow(answers))
      break
    case "automation":
      steps.push(...automationFlow())
      break
    case "app":
      steps.push(...appFlow(answers))
      break
    default:
      // Fără ramură aleasă, fluxul are un singur pas: alegerea ramurii.
      return steps
  }

  steps.push(summaryStep)
  return steps
}

// ============================================================================
// VALIDARE
// ============================================================================

function hasValue(value: unknown): boolean {
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === "string") return value.trim().length > 0
  return value !== undefined && value !== null
}

/** Un pas e complet când toate câmpurile obligatorii au un răspuns. */
export function isStepComplete(step: Step, answers: Answers): boolean {
  if (step.kind === "branch") return hasValue(answers.branch)
  if (step.kind === "summary") return true
  return step.fields.every((field) => field.optional || hasValue(answers[field.id]))
}

/** Primul câmp neterminat dintr-un pas — folosit pentru mesajul de eroare. */
export function firstMissingField(step: Step, answers: Answers): Field | undefined {
  if (step.kind !== "fields") return undefined
  return step.fields.find((field) => !field.optional && !hasValue(answers[field.id]))
}
