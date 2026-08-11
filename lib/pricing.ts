// ============================================================================
// lib/pricing.ts — SURSA UNICĂ DE ADEVĂR PENTRU PREȚURI
// ----------------------------------------------------------------------------
// Tot ce ține de bani, termene și reguli de calcul stă în acest fișier.
// Ca să modifici un preț NU trebuie să atingi nicio componentă — schimbi
// valoarea de mai jos și tot calculatorul se actualizează.
//
// Monedă: LEI. Prețurile se afișează întotdeauna ca INTERVAL (±RANGE_SPREAD),
// niciodată ca sumă fixă, pentru că estimarea este orientativă.
//
// Valorile marcate cu „ipoteză" nu au fost specificate în lista de prețuri
// oficială; sunt derivate rezonabil și pot fi ajustate liber.
// ============================================================================

export const CURRENCY = "lei"

/** Lățimea intervalului afișat față de calculul intern (0.15 = ±15%). */
export const RANGE_SPREAD = 0.15

/** Sumele afișate se rotunjesc la multiplu de 50 lei, ca să arate „de ofertă". */
const ROUNDING_STEP = 50

// ----------------------------------------------------------------------------
// SITE — preț unic (one-time)
// ----------------------------------------------------------------------------
export const SITE_PRICES = {
  /** Landing page — o singură pagină, focus pe conversie. */
  landing: 800,
  /** Site de prezentare — 2-5 pagini. */
  presentation: 1400,
  /** Site multi-pagină — 6-10 pagini. */
  multipage: 2200,
  /** Fiecare pagină peste 10. */
  extraPage: 150,
  /** Câte pagini presupunem peste prag când clientul spune „peste 10" (ipoteză). */
  assumedExtraPages: 5,
  /** Primul an de domeniu + găzduire este inclus în preț. */
  firstYearHostingIncluded: 0,
  /** Chatbot / asistent virtual pe site. */
  chatbot: 500,
  /** Reducere dacă vine cu domeniu propriu (valoare negativă). */
  ownDomainDiscount: -100,
  /** Supliment dacă nu are deloc logo și poze. */
  noAssetsFee: 250,
  /** Supliment dacă are materialele doar parțial (ipoteză: jumătate din taxă). */
  partialAssetsFee: 125,
} as const

/** Funcționalitățile din pasul A3. Cele cu 0 sunt incluse în pachetul de bază. */
export const SITE_FEATURE_PRICES: Record<string, number> = {
  contact: 0, // formular de contact — inclus standard
  gallery: 150, // galerie / portofoliu de lucrări
  blog: 300, // blog sau secțiune de articole
  map: 0, // hartă și puncte de lucru — inclus standard
  testimonials: 0, // testimoniale clienți — inclus standard
  booking: 400, // rezervări sau programări online
  calculator: 900, // calculator / configurator interactiv
  multilang: 400, // versiune în mai multe limbi
  shop: 1200, // magazin online simplu
}

// ----------------------------------------------------------------------------
// MENTENANȚĂ — recurent lunar
// ----------------------------------------------------------------------------
export const MAINTENANCE_PRICES = {
  essential: 60,
  active: 100,
  complete: 150,
  none: 0,
  /** Modificare în afara pachetului — taxă unică, pe oră. */
  extraHourly: 80,
} as const

// ----------------------------------------------------------------------------
// AUTOMATIZARE
// ----------------------------------------------------------------------------
export const AUTOMATION_PRICES = {
  /** Implementare, per proces automatizat. */
  perProcess: 900,
  /** Abonament lunar, punctul de plecare. */
  monthlyBase: 120,
  /** Cât crește abonamentul pentru fiecare proces peste primul (ipoteză). */
  monthlyPerExtraProcess: 40,
  /** Tariful orar folosit pentru calculul economiei. */
  hourlyRate: 60,
  /**
   * Ce procent din timpul pierdut ajunge să fie recuperat efectiv prin
   * automatizare. 0.6 = 60%, o valoare conservatoare, credibilă (ipoteză).
   */
  efficiency: 0.6,
  /** Săptămâni medii într-o lună. */
  weeksPerMonth: 4.33,
} as const

/** Ore pe săptămână pierdute — valoarea medie a fiecărui interval. */
export const AUTOMATION_HOURS: Record<string, number> = {
  "<5": 3,
  "5-10": 7.5,
  "10-20": 15,
  ">20": 25,
}

/** Multiplicator de complexitate în funcție de câți oameni folosesc sistemul. */
export const AUTOMATION_TEAM_MULTIPLIER: Record<string, number> = {
  "1": 1,
  "2-5": 1.1,
  "6-15": 1.25,
  "15+": 1.45,
}

/**
 * Supliment de migrare: cu cât datele actuale sunt mai dezorganizate, cu atât
 * setup-ul inițial cere mai mult timp (ipoteză).
 */
export const AUTOMATION_TOOLS_SETUP: Record<string, number> = {
  whatsapp: 100,
  email: 100,
  sheets: 0,
  paper: 250,
  software: 150,
  nothing: 250,
}

// ----------------------------------------------------------------------------
// APLICAȚII
// ----------------------------------------------------------------------------
export const APP_PRICES = {
  dental: {
    /** DaviX Dental — soluție gata, funcțională. */
    setup: 1500,
    monthly: 150,
  },
  cafe: {
    /** DaviX Cafe — meniu digital QR + fidelizare. */
    setup: 1200,
    monthly: 120,
    /** Module peste primul, în pachetul Cafe (ipoteză). */
    perExtraModule: 400,
  },
  custom: {
    /** Aplicație personalizată, de la. */
    setupFrom: 2500,
    /** Câte module sunt deja incluse în prețul de pornire (ipoteză). */
    includedModules: 3,
    /** Per modul suplimentar. */
    perExtraModule: 600,
    /** Variantă mobilă, supliment. */
    mobileExtra: 800,
    /** Abonament lunar de pornire pentru aplicații personalizate (ipoteză). */
    monthlyFrom: 150,
  },
  /** Supliment pentru fiecare locație / punct de lucru peste primul (ipoteză). */
  perExtraLocation: 300,
} as const

/** Supliment în funcție de câți utilizatori are aplicația (ipoteză). */
export const APP_USERS_FEE: Record<string, number> = {
  "1-3": 0,
  "4-10": 300,
  "10+": 700,
}

/** Câte locații suplimentare presupunem când clientul alege „4+" (ipoteză). */
export const ASSUMED_EXTRA_LOCATIONS = 3

// ----------------------------------------------------------------------------
// TERMENE DE LIVRARE (zile lucrătoare)
// ----------------------------------------------------------------------------
export const TIMELINES: Record<string, [number, number]> = {
  landing: [5, 5],
  presentation: [10, 10],
  multipage: [15, 15],
  automation: [7, 21],
  app: [20, 45],
}

/** Zile adăugate de fiecare funcționalitate „grea" de pe site (ipoteză). */
const HEAVY_SITE_FEATURES = ["shop", "calculator", "multilang", "booking"]
const DAYS_PER_HEAVY_FEATURE = 2
/** Varianta mobilă a unei aplicații personalizate întinde termenul (ipoteză). */
const DAYS_FOR_MOBILE = 10

// ============================================================================
// TIPURI
// ============================================================================

export type Branch = "site" | "automation" | "app"

/**
 * Toate răspunsurile posibile din calculator. Cheile de aici sunt și
 * identificatorii pașilor din `components/calculator/flow.ts`.
 */
export interface Answers {
  branch?: Branch

  // — RAMURA A: SITE —
  siteType?: "landing" | "presentation" | "multipage" | "unsure"
  sitePages?: "1" | "2-5" | "6-10" | "10+" | "unknown"
  siteFeatures?: string[]
  siteChatbot?: "yes" | "no"
  siteDomain?: "all" | "domain" | "none"
  siteAssets?: "all" | "partial" | "none"
  siteMaintenance?: "essential" | "active" | "complete" | "none"

  // — RAMURA B: AUTOMATIZARE —
  autoIndustry?: string
  autoTasks?: string[]
  autoHours?: "<5" | "5-10" | "10-20" | ">20"
  autoTools?: string
  autoToolsOther?: string
  autoUsers?: "1" | "2-5" | "6-15" | "15+"
  autoNotes?: string

  // — RAMURA C: APLICAȚIE —
  appType?: "dental" | "cafe" | "custom"
  appDentalLocations?: "1" | "2-3" | "4+"
  appDentalUsers?: "1-3" | "4-10" | "10+"
  appCafeLocations?: "1" | "2-3" | "4+"
  appCafeModules?: string[]
  appCustomIndustry?: string
  appCustomModules?: string[]
  appCustomPlatform?: "web" | "mobile" | "both"
}

export interface EstimateLine {
  label: string
  /** Suma în lei. Poate fi 0 (inclus) sau negativă (reducere). */
  amount: number
  /** Text mic sub linie, ex. „inclus în pachet". */
  note?: string
}

export interface PriceBucket {
  /** Calculul intern, înainte de aplicarea intervalului. */
  total: number
  min: number
  max: number
  lines: EstimateLine[]
}

export interface Estimate {
  branch?: Branch
  oneTime: PriceBucket
  monthly: PriceBucket
  timeline: { min: number; max: number; label: string }
  /** Doar pe ramura de automatizare: cât timp și câți bani se economisesc lunar. */
  savings?: { hoursPerMonth: number; moneyPerMonth: number }
  /** Ce include livrarea, listat concret în sumar. */
  deliverables: string[]
  /** true când avem destule răspunsuri cât să afișăm un preț credibil. */
  ready: boolean
}

// ============================================================================
// HELPERE
// ============================================================================

const roundTo = (value: number, step = ROUNDING_STEP) => Math.round(value / step) * step

/** Transformă o sumă într-un interval ±RANGE_SPREAD, rotunjit la 50 lei. */
export function toRange(total: number): { min: number; max: number } {
  if (total <= 0) return { min: 0, max: 0 }
  return {
    min: Math.max(0, roundTo(total * (1 - RANGE_SPREAD))),
    max: roundTo(total * (1 + RANGE_SPREAD)),
  }
}

/** Formatare monetară românească, fără zecimale: „2.400 lei". */
export function formatLei(value: number): string {
  return `${new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(Math.round(value))} ${CURRENCY}`
}

/** „5 zile" sau „7–21 zile". */
function formatDays(min: number, max: number): string {
  return min === max ? `${min} zile` : `${min}–${max} zile`
}

const sum = (lines: EstimateLine[]) => lines.reduce((acc, line) => acc + line.amount, 0)

function bucket(lines: EstimateLine[]): PriceBucket {
  const total = sum(lines)
  return { total, ...toRange(total), lines }
}

const emptyBucket = (): PriceBucket => ({ total: 0, min: 0, max: 0, lines: [] })

// ============================================================================
// ETICHETE — folosite atât în sumar, cât și în emailul de lead
// ============================================================================

export const SITE_FEATURE_LABELS: Record<string, string> = {
  contact: "Formular de contact",
  gallery: "Galerie / portofoliu",
  blog: "Blog / articole",
  map: "Hartă și puncte de lucru",
  testimonials: "Testimoniale clienți",
  booking: "Rezervări / programări online",
  calculator: "Calculator / configurator",
  multilang: "Versiune multilingvă",
  shop: "Magazin online simplu",
}

export const AUTOMATION_TASK_LABELS: Record<string, string> = {
  messages: "Răspuns la mesaje și cereri de ofertă",
  scheduling: "Programări, confirmări, reprogramări",
  invoicing: "Facturare și documente",
  followup: "Follow-up după ofertă",
  social: "Postat pe social media",
  reporting: "Raportare și centralizare date",
  orders: "Gestiune comenzi și stocuri",
  reviews: "Recenzii și feedback",
}

export const APP_MODULE_LABELS: Record<string, string> = {
  accounts: "Conturi utilizatori",
  scheduling: "Programări",
  catalog: "Catalog / meniu digital",
  orders: "Comenzi",
  payments: "Plăți online",
  loyalty: "Fidelizare și puncte",
  notifications: "Notificări automate",
  reports: "Rapoarte și statistici",
  locations: "Mai multe locații",
  admin: "Panou de administrare",
}

export const CAFE_MODULE_LABELS: Record<string, string> = {
  qr: "Meniu digital QR",
  loyalty: "Program de fidelizare",
  table: "Comandă la masă",
}

// ============================================================================
// CALCUL — RAMURA A: SITE
// ============================================================================

function estimateSite(answers: Answers): Estimate {
  const oneTime: EstimateLine[] = []
  const monthly: EstimateLine[] = []
  const deliverables: string[] = []

  // Prețul de bază vine din tipul de site; dacă utilizatorul nu e sigur,
  // îl deducem din numărul de pagini estimat.
  let baseKey: "landing" | "presentation" | "multipage" = "presentation"

  if (answers.siteType === "landing") {
    baseKey = "landing"
  } else if (answers.siteType === "presentation") {
    baseKey = "presentation"
  } else if (answers.siteType === "multipage") {
    baseKey = "multipage"
  } else {
    // „Nu sunt sigur" → deducem din pagini
    if (answers.sitePages === "1") baseKey = "landing"
    else if (answers.sitePages === "6-10" || answers.sitePages === "10+") baseKey = "multipage"
    else baseKey = "presentation"
  }

  const baseLabels = {
    landing: "Landing page (o pagină)",
    presentation: "Site de prezentare (2-5 pagini)",
    multipage: "Site multi-pagină (6-10 pagini)",
  }

  oneTime.push({ label: baseLabels[baseKey], amount: SITE_PRICES[baseKey] })
  deliverables.push("Design și dezvoltare pe măsură, optimizat pentru mobil")
  deliverables.push("Configurare Google (indexare, Search Console, viteză)")

  // Pagini peste 10
  if (answers.sitePages === "10+" && baseKey === "multipage") {
    oneTime.push({
      label: `Pagini suplimentare (estimat ${SITE_PRICES.assumedExtraPages})`,
      amount: SITE_PRICES.extraPage * SITE_PRICES.assumedExtraPages,
      note: `${formatLei(SITE_PRICES.extraPage)} / pagină peste 10`,
    })
  }

  // Funcționalități
  const features = answers.siteFeatures ?? []
  for (const feature of features) {
    const price = SITE_FEATURE_PRICES[feature]
    if (price === undefined) continue
    oneTime.push({
      label: SITE_FEATURE_LABELS[feature] ?? feature,
      amount: price,
      note: price === 0 ? "inclus" : undefined,
    })
    deliverables.push(SITE_FEATURE_LABELS[feature] ?? feature)
  }

  // Chatbot
  if (answers.siteChatbot === "yes") {
    oneTime.push({ label: "Chatbot / asistent virtual", amount: SITE_PRICES.chatbot })
    deliverables.push("Chatbot antrenat pe serviciile tale, activ 24/7")
  }

  // Domeniu și găzduire
  if (answers.siteDomain === "none") {
    oneTime.push({
      label: "Domeniu + găzduire, primul an",
      amount: SITE_PRICES.firstYearHostingIncluded,
      note: "inclus în preț",
    })
    deliverables.push("Domeniu și găzduire pentru primul an, incluse")
  } else if (answers.siteDomain === "domain") {
    oneTime.push({
      label: "Găzduire, primul an",
      amount: SITE_PRICES.firstYearHostingIncluded,
      note: "inclus în preț",
    })
    oneTime.push({ label: "Ai deja domeniu", amount: SITE_PRICES.ownDomainDiscount })
  } else if (answers.siteDomain === "all") {
    oneTime.push({ label: "Ai deja domeniu și găzduire", amount: SITE_PRICES.ownDomainDiscount })
  }

  // Materiale
  if (answers.siteAssets === "none") {
    oneTime.push({
      label: "Realizare materiale (logo, poze, texte)",
      amount: SITE_PRICES.noAssetsFee,
    })
    deliverables.push("Texte scrise de noi și selecție de imagini")
  } else if (answers.siteAssets === "partial") {
    oneTime.push({
      label: "Completare materiale lipsă",
      amount: SITE_PRICES.partialAssetsFee,
    })
  }

  // Mentenanță lunară
  const plan = answers.siteMaintenance
  if (plan && plan !== "none") {
    const planLabels = {
      essential: "Mentenanță Esențial",
      active: "Mentenanță Activ",
      complete: "Mentenanță Complet",
    }
    monthly.push({ label: planLabels[plan], amount: MAINTENANCE_PRICES[plan] })
    deliverables.push(`${planLabels[plan]} — găzduire, securitate și actualizări incluse`)
  } else if (plan === "none") {
    deliverables.push("Predare completă: cod, acces și instrucțiuni de administrare")
  }

  // Termen
  let [minDays, maxDays] = TIMELINES[baseKey]
  const heavyCount = features.filter((f) => HEAVY_SITE_FEATURES.includes(f)).length
  minDays += heavyCount * DAYS_PER_HEAVY_FEATURE
  maxDays += heavyCount * DAYS_PER_HEAVY_FEATURE + (heavyCount > 0 ? 3 : 0)

  return {
    branch: "site",
    oneTime: bucket(oneTime),
    monthly: monthly.length ? bucket(monthly) : emptyBucket(),
    timeline: { min: minDays, max: maxDays, label: formatDays(minDays, maxDays) },
    deliverables,
    // Avem preț credibil din momentul în care știm ce fel de site vrea.
    ready: Boolean(answers.siteType),
  }
}

// ============================================================================
// CALCUL — RAMURA B: AUTOMATIZARE
// ============================================================================

function estimateAutomation(answers: Answers): Estimate {
  const oneTime: EstimateLine[] = []
  const monthly: EstimateLine[] = []
  const deliverables: string[] = []

  const tasks = answers.autoTasks ?? []
  const processCount = Math.max(tasks.length, 1)
  const teamMultiplier = AUTOMATION_TEAM_MULTIPLIER[answers.autoUsers ?? "1"] ?? 1

  oneTime.push({
    label: `Implementare — ${processCount} ${processCount === 1 ? "proces automatizat" : "procese automatizate"}`,
    amount: Math.round(AUTOMATION_PRICES.perProcess * processCount * teamMultiplier),
    note:
      teamMultiplier > 1
        ? `${formatLei(AUTOMATION_PRICES.perProcess)} / proces · echipă ×${teamMultiplier}`
        : `${formatLei(AUTOMATION_PRICES.perProcess)} / proces`,
  })

  // Supliment de migrare din unealta actuală
  const toolsFee = AUTOMATION_TOOLS_SETUP[answers.autoTools ?? ""] ?? 0
  if (toolsFee > 0) {
    oneTime.push({ label: "Migrare și organizare date existente", amount: toolsFee })
  }

  // Abonament lunar
  const monthlyTotal = Math.round(
    (AUTOMATION_PRICES.monthlyBase +
      AUTOMATION_PRICES.monthlyPerExtraProcess * (processCount - 1)) *
      teamMultiplier,
  )
  monthly.push({
    label: "Abonament: rulare, monitorizare, suport",
    amount: monthlyTotal,
    note: `de la ${formatLei(AUTOMATION_PRICES.monthlyBase)}`,
  })

  for (const task of tasks) {
    deliverables.push(`Automatizare: ${AUTOMATION_TASK_LABELS[task] ?? task}`)
  }
  deliverables.push("Conectare la uneltele pe care le folosești deja")
  deliverables.push("Instruire pentru echipă și documentație scrisă")
  deliverables.push("Monitorizare și corecții incluse în abonament")

  // Economia lunară — cel mai puternic argument de vânzare
  let savings: Estimate["savings"]
  if (answers.autoHours) {
    const hoursPerWeek = AUTOMATION_HOURS[answers.autoHours] ?? 0
    const hoursPerMonth =
      hoursPerWeek * AUTOMATION_PRICES.efficiency * AUTOMATION_PRICES.weeksPerMonth
    savings = {
      hoursPerMonth: Math.round(hoursPerMonth),
      moneyPerMonth: Math.round(hoursPerMonth * AUTOMATION_PRICES.hourlyRate),
    }
  }

  const [minDays, maxDays] = TIMELINES.automation

  return {
    branch: "automation",
    oneTime: bucket(oneTime),
    monthly: bucket(monthly),
    timeline: { min: minDays, max: maxDays, label: formatDays(minDays, maxDays) },
    savings,
    deliverables,
    // Prețul devine relevant abia după ce știm ce procese trebuie automatizate.
    ready: tasks.length > 0,
  }
}

// ============================================================================
// CALCUL — RAMURA C: APLICAȚIE
// ============================================================================

/** Câte locații suplimentare implică fiecare interval ales. */
function extraLocations(value?: string): number {
  if (value === "2-3") return 2
  if (value === "4+") return ASSUMED_EXTRA_LOCATIONS
  return 0
}

function estimateApp(answers: Answers): Estimate {
  const oneTime: EstimateLine[] = []
  const monthly: EstimateLine[] = []
  const deliverables: string[] = []
  let extraDays = 0

  if (answers.appType === "dental") {
    oneTime.push({ label: "DaviX Dental — implementare", amount: APP_PRICES.dental.setup })
    monthly.push({ label: "DaviX Dental — abonament", amount: APP_PRICES.dental.monthly })

    const locations = extraLocations(answers.appDentalLocations)
    if (locations > 0) {
      oneTime.push({
        label: `Locații suplimentare (${locations})`,
        amount: APP_PRICES.perExtraLocation * locations,
      })
    }
    const usersFee = APP_USERS_FEE[answers.appDentalUsers ?? "1-3"] ?? 0
    if (usersFee > 0) {
      oneTime.push({ label: "Configurare pentru echipă extinsă", amount: usersFee })
    }

    deliverables.push("Fișe pacienți, istoric tratamente și documente")
    deliverables.push("Programări cu confirmare automată prin SMS/WhatsApp")
    deliverables.push("Rapoarte de încasări și ocupare pe medic")
    deliverables.push("Instalare, import date existente și instruire")
  } else if (answers.appType === "cafe") {
    oneTime.push({ label: "DaviX Cafe — implementare", amount: APP_PRICES.cafe.setup })
    monthly.push({ label: "DaviX Cafe — abonament", amount: APP_PRICES.cafe.monthly })

    const modules = answers.appCafeModules ?? []
    if (modules.length > 1) {
      oneTime.push({
        label: `Module suplimentare (${modules.length - 1})`,
        amount: APP_PRICES.cafe.perExtraModule * (modules.length - 1),
      })
    }
    const locations = extraLocations(answers.appCafeLocations)
    if (locations > 0) {
      oneTime.push({
        label: `Locații suplimentare (${locations})`,
        amount: APP_PRICES.perExtraLocation * locations,
      })
    }

    for (const module of modules) {
      deliverables.push(CAFE_MODULE_LABELS[module] ?? module)
    }
    deliverables.push("Coduri QR tipăribile pentru fiecare masă")
    deliverables.push("Panou de administrare pentru meniu și prețuri")
  } else if (answers.appType === "custom") {
    oneTime.push({
      label: "Aplicație personalizată — bază",
      amount: APP_PRICES.custom.setupFrom,
      note: `include ${APP_PRICES.custom.includedModules} module`,
    })

    const modules = answers.appCustomModules ?? []
    const extraModules = Math.max(0, modules.length - APP_PRICES.custom.includedModules)
    if (extraModules > 0) {
      oneTime.push({
        label: `Module suplimentare (${extraModules})`,
        amount: APP_PRICES.custom.perExtraModule * extraModules,
        note: `${formatLei(APP_PRICES.custom.perExtraModule)} / modul`,
      })
    }

    if (answers.appCustomPlatform === "mobile" || answers.appCustomPlatform === "both") {
      oneTime.push({ label: "Variantă mobilă", amount: APP_PRICES.custom.mobileExtra })
      extraDays = DAYS_FOR_MOBILE
    }

    monthly.push({
      label: "Găzduire, mentenanță și suport",
      amount: APP_PRICES.custom.monthlyFrom,
      note: `de la ${formatLei(APP_PRICES.custom.monthlyFrom)}`,
    })

    for (const module of modules) {
      deliverables.push(APP_MODULE_LABELS[module] ?? module)
    }
    deliverables.push("Analiză de proces înainte de dezvoltare")
    deliverables.push("Livrare pe etape, cu demo la fiecare etapă")
  }

  deliverables.push("Cod și date care rămân ale tale")

  const [minDays, maxDays] = TIMELINES.app

  return {
    branch: "app",
    oneTime: bucket(oneTime),
    monthly: monthly.length ? bucket(monthly) : emptyBucket(),
    timeline: {
      min: minDays + extraDays,
      max: maxDays + extraDays,
      label: formatDays(minDays + extraDays, maxDays + extraDays),
    },
    deliverables,
    ready: Boolean(answers.appType),
  }
}

// ============================================================================
// PUNCT DE INTRARE
// ============================================================================

/**
 * Calculează estimarea completă din răspunsurile de până acum.
 * Funcția este pură: aceleași răspunsuri → același rezultat. Poate fi apelată
 * la fiecare tastă apăsată, fără griji de performanță.
 */
export function estimate(answers: Answers): Estimate {
  switch (answers.branch) {
    case "site":
      return estimateSite(answers)
    case "automation":
      return estimateAutomation(answers)
    case "app":
      return estimateApp(answers)
    default:
      return {
        oneTime: emptyBucket(),
        monthly: emptyBucket(),
        timeline: { min: 0, max: 0, label: "—" },
        deliverables: [],
        ready: false,
      }
  }
}

/**
 * Interval formatat pentru afișare: „2.040 – 2.760 lei" sau „—".
 * Singurul loc în care se formatează un interval de preț — folosit și în
 * sumar, și în PDF, și în emailul de lead.
 */
export function formatRange(minValue: number, maxValue: number): string {
  if (maxValue <= 0) return "—"
  if (minValue === maxValue) return formatLei(minValue)
  return `${new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(minValue)} – ${formatLei(maxValue)}`
}
