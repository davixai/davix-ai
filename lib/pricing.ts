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

/** Lățimea intervalului afișat față de calculul intern (0.20 = ±20%). */
export const RANGE_SPREAD = 0.2

/** Sumele afișate se rotunjesc la multiplu de 50 lei, ca să arate „de ofertă". */
const ROUNDING_STEP = 50

// ----------------------------------------------------------------------------
// SITE — preț unic (one-time)
// ----------------------------------------------------------------------------

/** Cele patru pachete de site, în ordinea prețului. */
export type SiteBase = "landing" | "presentation" | "multipage" | "shop"

export const SITE_PRICES = {
  /** Landing page — o singură pagină, focus pe conversie. Public: de la 500 lei. */
  landing: 600,
  /** Site de prezentare — 3-5 pagini. Public: de la 800 lei. */
  presentation: 1000,
  /** Site complex, mai multe pagini și funcții. Public: de la 1.400 lei. */
  multipage: 1700,
  /** Magazin online cu comenzi și plăți. Public: de la 1.800 lei. */
  shop: 2000,
  /** Fiecare pagină peste 10. */
  extraPage: 150,
  /** Câte pagini presupunem peste prag când clientul spune „peste 10" (ipoteză). */
  assumedExtraPages: 5,
  /** Primul an de domeniu + găzduire este inclus în preț. */
  firstYearHostingIncluded: 0,
  /**
   * Reînnoirea domeniului, din anul 2. Se comunică din prima discuție:
   * fără cifra asta, „fără costuri ascunse" nu e adevărat și ajungi la o
   * conversație neplăcută în luna 13.
   */
  domainRenewalYearly: 100,
  /** Chatbot / asistent virtual pe site. */
  chatbot: 500,
  /** Reducere dacă vine cu domeniu propriu (valoare negativă). */
  ownDomainDiscount: -100,
  /** Supliment dacă nu are deloc logo și poze. */
  noAssetsFee: 250,
  /** Supliment dacă are materialele doar parțial (ipoteză: jumătate din taxă). */
  partialAssetsFee: 125,
} as const

/**
 * Intervalele publicate pe pagina de pachete. Sursa de adevăr pentru textele
 * de marketing; calculul intern pornește de la mijlocul fiecărui interval.
 */
export const SITE_PRICE_RANGES: Record<SiteBase, [number, number]> = {
  landing: [500, 700],
  presentation: [800, 1200],
  multipage: [1400, 2000],
  shop: [1800, 2200],
}

/** „500 – 700 lei", direct din intervalul publicat. */
export function siteRangeLabel(base: SiteBase): string {
  const [min, max] = SITE_PRICE_RANGES[base]
  return formatRange(min, max)
}

/**
 * Pragul de intrare al fiecărui pachet — capătul de jos al intervalului public.
 * Se comunică întotdeauna ca „de la X lei", niciodată ca sumă fixă: un site de
 * 5 pagini pentru un hotel cu galerie și rezervări nu e aceeași muncă cu 3
 * pagini pentru un frizer, iar un număr fix invită la scope creep.
 */
export function siteFrom(base: SiteBase): number {
  return SITE_PRICE_RANGES[base][0]
}

/** „de la 800 lei" — eticheta folosită pe /oferta și pe paginile publice. */
export function siteFromLabel(base: SiteBase): string {
  return `de la ${formatLei(siteFrom(base))}`
}

/** Avansul cerut la începerea unui site. Restul se achită la livrare. */
export const SITE_DEPOSIT_PERCENT = 50

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
/**
 * Două trepte, nu trei. Între 80 și 100 de lei nimeni nu simte diferența —
 * doar creezi o decizie în plus. `active` rămâne definit pentru compatibilitate
 * cu estimările deja salvate, dar nu se mai oferă nicăieri în interfață.
 */
export const MAINTENANCE_PRICES = {
  /** „Administrare" — modificări de conținut, verificări, actualizări. */
  essential: 100,
  /** Treaptă intermediară istorică. Nu se mai afișează. */
  active: 150,
  /** „Administrare + SEO" — tot ce e mai sus, plus optimizare lunară. */
  complete: 200,
  none: 0,
  /** Modificare în afara pachetului — taxă unică, pe oră. */
  extraHourly: 80,
} as const

// ----------------------------------------------------------------------------
// MENIU DIGITAL CU COD QR — setup + abonament lunar
// ----------------------------------------------------------------------------

/**
 * Structura e deliberat „mic la intrare, abonament după": clientul nu dă o
 * sumă mare pe ceva ce nu a văzut încă, iar administrarea e serviciul real —
 * eu introduc și actualizez tot conținutul, el nu atinge nimic.
 */
export const MENU_PRICES = {
  /** Avans la începerea meniului: construcție completă + generare cod QR. */
  setup: 250,
  /** Administrare lunară: actualizări nelimitate de produse, prețuri și poze. */
  monthly: 150,
} as const

// ----------------------------------------------------------------------------
// AUTOMATIZARE
// ----------------------------------------------------------------------------
export const AUTOMATION_PRICES = {
  /** Implementare, per proces automatizat. */
  perProcess: 650,
  /** Abonament lunar, punctul de plecare. */
  monthlyBase: 150,
  /** Cât crește abonamentul pentru fiecare proces peste primul (ipoteză). */
  monthlyPerExtraProcess: 90,
  /** Abonamentul nu coboară sub atât, oricât de simplă ar fi automatizarea. */
  monthlyMin: 150,
  /** Plafonul de listă: peste el, prețul se discută separat. */
  monthlyMax: 800,
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
  whatsapp: 80,
  email: 80,
  sheets: 0,
  paper: 200,
  software: 120,
  nothing: 200,
}

// ----------------------------------------------------------------------------
// APLICAȚII
// ----------------------------------------------------------------------------
export const APP_PRICES = {
  dental: {
    /**
     * DaviX Dental — prețurile sunt exact cele publicate pe pagina produsului.
     * Implementarea, importul datelor și instruirea intră în abonament.
     */
    setup: 0,
    /** Abonament lunar, pe plan. */
    plans: { starter: 400, pro: 600, max: 800 },
    /** Peste admin + 5 utilizatori de echipă incluși. */
    extraUserMonthly: 50,
  },
  cafe: {
    /** DaviX Cafe — încă în dezvoltare, prețul nu este stabilit. */
    pending: true,
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
} as const

/** Numele planurilor Davix Dental, așa cum apar pe pagina produsului. */
export const DENTAL_PLAN_LABELS: Record<"starter" | "pro" | "max", string> = {
  starter: "Starter",
  pro: "Pro",
  max: "Max",
}

/**
 * Câți utilizatori peste cei 6 incluși (admin + 5) presupune fiecare interval.
 * Se taxează lunar, ca pe pagina Davix Dental.
 */
export const DENTAL_EXTRA_USERS: Record<string, number> = {
  "1-6": 0,
  "7-10": 4,
  "10+": 7,
}

// ----------------------------------------------------------------------------
// TERMENE DE LIVRARE (zile lucrătoare)
// ----------------------------------------------------------------------------
export const TIMELINES: Record<string, [number, number]> = {
  landing: [2, 3],
  presentation: [3, 5],
  multipage: [5, 10],
  shop: [10, 15],
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
  siteType?: SiteBase | "unsure"
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
  appDentalPlan?: "starter" | "pro" | "max"
  appDentalUsers?: "1-6" | "7-10" | "10+"
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
  /** Mesaj afișat în locul prețului, când produsul încă nu are unul. */
  note?: string
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
  let baseKey: SiteBase = "presentation"

  if (answers.siteType && answers.siteType !== "unsure") {
    baseKey = answers.siteType
  } else {
    // „Nu sunt sigur" → deducem din pagini
    if (answers.sitePages === "1") baseKey = "landing"
    else if (answers.sitePages === "6-10" || answers.sitePages === "10+") baseKey = "multipage"
    else baseKey = "presentation"
  }

  const baseLabels: Record<SiteBase, string> = {
    landing: "Landing page (o pagină)",
    presentation: "Site de prezentare (2-5 pagini)",
    multipage: "Site multi-pagină (6-10 pagini)",
    shop: "Magazin online (comenzi și plăți)",
  }

  oneTime.push({ label: baseLabels[baseKey], amount: SITE_PRICES[baseKey] })
  deliverables.push("Design și dezvoltare pe măsură, optimizat pentru mobil")
  deliverables.push("Configurare Google (indexare, Search Console, viteză)")

  // Pagini peste 10
  if (answers.sitePages === "10+" && (baseKey === "multipage" || baseKey === "shop")) {
    oneTime.push({
      label: `Pagini suplimentare (estimat ${SITE_PRICES.assumedExtraPages})`,
      amount: SITE_PRICES.extraPage * SITE_PRICES.assumedExtraPages,
      note: `${formatLei(SITE_PRICES.extraPage)} / pagină peste 10`,
    })
  }

  // Funcționalități
  const features = answers.siteFeatures ?? []
  for (const feature of features) {
    const listed = SITE_FEATURE_PRICES[feature]
    if (listed === undefined) continue
    // Pachetul „magazin online" conține deja partea de comenzi — nu o taxez de două ori.
    const included = listed === 0 || (baseKey === "shop" && feature === "shop")
    oneTime.push({
      label: SITE_FEATURE_LABELS[feature] ?? feature,
      amount: included ? 0 : listed,
      note: included ? "inclus" : undefined,
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
    deliverables.push("Texte scrise de mine și selecție de imagini")
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
      essential: "Administrare lunară",
      active: "Administrare lunară (plan intermediar)",
      complete: "Administrare lunară + SEO",
    }
    monthly.push({ label: planLabels[plan], amount: MAINTENANCE_PRICES[plan] })
    deliverables.push(`${planLabels[plan]} — găzduire, securitate și actualizări incluse`)
  } else if (plan === "none") {
    deliverables.push("Predare completă: cod, acces și instrucțiuni de administrare")
  }

  // Termen
  let [minDays, maxDays] = TIMELINES[baseKey]
  const heavyCount = features.filter(
    (f) => HEAVY_SITE_FEATURES.includes(f) && !(baseKey === "shop" && f === "shop"),
  ).length
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

  // Abonament lunar — crește cu numărul de fluxuri și cu mărimea echipei,
  // dar rămâne între minimul și plafonul de listă.
  const monthlyRaw = Math.round(
    (AUTOMATION_PRICES.monthlyBase +
      AUTOMATION_PRICES.monthlyPerExtraProcess * (processCount - 1)) *
      teamMultiplier,
  )
  const monthlyTotal = Math.min(
    AUTOMATION_PRICES.monthlyMax,
    Math.max(AUTOMATION_PRICES.monthlyMin, monthlyRaw),
  )
  monthly.push({
    label: "Abonament: rulare, monitorizare, suport",
    amount: monthlyTotal,
    note:
      monthlyRaw > AUTOMATION_PRICES.monthlyMax
        ? `plafonul de listă — peste ${formatLei(AUTOMATION_PRICES.monthlyMax)}/lună stabilim prețul la discuție`
        : `între ${formatLei(AUTOMATION_PRICES.monthlyMin)} și ${formatLei(AUTOMATION_PRICES.monthlyMax)}/lună, după complexitate`,
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

function estimateApp(answers: Answers): Estimate {
  const oneTime: EstimateLine[] = []
  const monthly: EstimateLine[] = []
  const deliverables: string[] = []
  let extraDays = 0

  let note: string | undefined

  if (answers.appType === "dental") {
    const plan = answers.appDentalPlan ?? "starter"
    monthly.push({
      label: `DaviX Dental — plan ${DENTAL_PLAN_LABELS[plan]}`,
      amount: APP_PRICES.dental.plans[plan],
      note: "implementare, import date și instruire incluse",
    })

    const extraUsers = DENTAL_EXTRA_USERS[answers.appDentalUsers ?? "1-6"] ?? 0
    if (extraUsers > 0) {
      monthly.push({
        label: `Utilizatori peste cei 6 incluși (${extraUsers})`,
        amount: APP_PRICES.dental.extraUserMonthly * extraUsers,
        note: `${formatLei(APP_PRICES.dental.extraUserMonthly)} / utilizator / lună`,
      })
    }

    note =
      "Davix Dental nu are cost de implementare: instalarea, importul datelor și instruirea intră în abonamentul lunar."

    deliverables.push("Calendar, programări pe medic și rechemări la control")
    deliverables.push("Fișe pacienți, odontogramă, tratamente și planuri de tratament")
    deliverables.push("Fișiere medicale, galerie before/after și consimțăminte")
    deliverables.push("Financiar: plăți, încasări, cheltuieli și metode de plată")
    deliverables.push("Laborator: lucrări, furnizori, statusuri și costuri")
    deliverables.push("Admin + 5 utilizatori de echipă și 100GB stocare medicală")
    if (plan !== "starter") {
      deliverables.push("Reminder programare și cerere automată de review Google")
    }
    if (plan === "max") {
      deliverables.push("450 SMS/lună incluse, gestionate de mine")
    }
  } else if (answers.appType === "cafe") {
    // Aplicația e încă în dezvoltare — nu dau un preț pe care nu îl pot susține.
    note =
      "DaviX Cafe e încă în lucru, așa că nu are un preț stabilit. Îți spun exact cât costă în momentul lansării — până atunci pot să te anunț primul."

    for (const module of answers.appCafeModules ?? []) {
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

  if (answers.appType !== "cafe") deliverables.push("Cod și date care rămân ale tale")

  const [minDays, maxDays] = TIMELINES.app

  return {
    branch: "app",
    oneTime: bucket(oneTime),
    monthly: monthly.length ? bucket(monthly) : emptyBucket(),
    timeline: {
      min: minDays + extraDays,
      max: maxDays + extraDays,
      label: answers.appType === "cafe" ? "în lucru" : formatDays(minDays + extraDays, maxDays + extraDays),
    },
    deliverables,
    note,
    ready: Boolean(answers.appType) && answers.appType !== "cafe",
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
