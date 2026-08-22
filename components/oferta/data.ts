// ============================================================================
// components/oferta/data.ts — conținutul paginii /oferta, într-un singur loc.
// ----------------------------------------------------------------------------
// Prețurile NU se scriu aici de mână: se citesc din lib/pricing.ts, ca să nu
// existe niciodată două liste de prețuri diferite pe același domeniu.
// ============================================================================

import {
  MAINTENANCE_PRICES,
  MENU_PRICES,
  SITE_DEPOSIT_PERCENT,
  formatLei,
  siteFrom,
  siteFromLabel,
} from "@/lib/pricing"

export { SITE_DEPOSIT_PERCENT }

/** Numărul de WhatsApp, în format internațional, fără + și fără spații. */
export const WHATSAPP = "40729369094"
export const PHONE_DISPLAY = "0729 369 094"
export const PHONE_TEL = "0729369094"
export const EMAIL = "contact@davixai.website"

export const LEGAL_NAME = "Balta David Ioan — Persoană Fizică Autorizată"
export const CITY = "Suceava, România"

/**
 * Link de WhatsApp cu mesaj deja scris. E cel mai bun raport efort/rezultat
 * din toată pagina: omul apasă o dată și nu mai trebuie să se gândească
 * „ce scriu?". Fiecare secțiune trimite alt mesaj, ca să știu din primul
 * rând ce anume îl interesează.
 */
export function wa(message: string): string {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`
}

export const WA_GENERAL = wa("Salut, David. Am văzut oferta. Sunt de la ")
export const WA_MENU = wa("Salut, David. Mă interesează un meniu digital cu cod QR pentru localul meu. ")
export const WA_MAINT = wa("Salut, David. Mă interesează administrarea lunară. ")

// ---------------------------------------------------------------- proiecte --

/**
 * Doar lucrări cu domeniu propriu, real. Demo-urile și modelele rămân pe
 * /proiecte, unde poartă deja eticheta lor — pe pagina de prospectare, un
 * client care deschide un link „...vercel.app" pierde încrederea instant.
 */
export const PROJECTS = [
  {
    tag: "Restaurant",
    name: "NOIRÉ · București",
    desc: "Site de restaurant cu meniu digital, galerie și rezervare de masă.",
    url: "https://www.noire.website/",
    image: "/projects/noire.webp",
  },
  {
    tag: "Pensiune",
    name: "ARBORÉA · Bucovina",
    desc: "Pensiune boutique: camere, experiențe și un asistent care răspunde 24/7.",
    url: "https://pensiune.website/",
    image: "/projects/pensiune.webp",
  },
  {
    tag: "Firmă de servicii",
    name: "DISCIF S.R.L. · Suceava",
    desc: "Site de firmă cu formular de ofertă și apel rapid direct de pe telefon.",
    url: "https://discifsuceava.ro/",
    image: "/projects/discif.webp",
  },
] as const

// ---------------------------------------------------------------- servicii --

/**
 * Ordinea NU e decorativă: e scara de decizie a clientului, de la cel mai mic
 * angajament la cel mai mare — o pagină, un site, un site cu funcții, un
 * magazin. Abia după ce scara e completă vin lucrurile care nu sunt „un site":
 * administrarea de după lansare și meniul digital.
 */
export const SERVICES = [
  {
    icon: "target" as const,
    title: "Landing page",
    desc: "O singură pagină, construită pentru un singur obiectiv: o campanie, un serviciu, o promoție.",
    price: siteFromLabel("landing"),
  },
  {
    icon: "globe" as const,
    title: "Site de prezentare",
    desc: "Mai multe pagini: servicii, despre, galerie, contact. Pentru afaceri care vor o prezență completă.",
    price: siteFromLabel("presentation"),
  },
  {
    icon: "layers" as const,
    title: "Site complex",
    desc: "Mai multe pagini și funcții: rezervări, calculator de preț, blog, secțiuni personalizate.",
    price: siteFromLabel("multipage"),
  },
  {
    icon: "cart" as const,
    title: "Magazin online",
    desc: "Produse, coș, comenzi și plată. Pentru cine vinde direct de pe site.",
    price: siteFromLabel("shop"),
  },
  {
    icon: "wrench" as const,
    title: "Administrare lunară",
    desc: "Opțional, după lansare. Îmi scrii pe WhatsApp ce vrei schimbat și schimb.",
    price: `de la ${formatLei(MAINTENANCE_PRICES.essential)}/lună`,
  },
  {
    icon: "qr" as const,
    title: "Meniu digital cu cod QR",
    desc: "Clientul scanează codul de pe masă și vede meniul pe telefonul lui. Eu îl construiesc și îl actualizez.",
    price: `${formatLei(MENU_PRICES.setup)} + ${formatLei(MENU_PRICES.monthly)}/lună`,
  },
] as const

// ---------------------------------------------------------------- pachete ---

export const PACKAGES = [
  {
    id: "prezentare",
    name: "Site de prezentare",
    for: "Restaurante, cafenele, saloane, cabinete, pensiuni, firme de servicii",
    price: siteFrom("presentation"),
    highlight: true,
    badge: "Cel mai ales",
    days: "3–5 zile",
    features: [
      "Mai multe pagini: acasă, servicii, despre, galerie, contact",
      "Structură gândită să te sune, nu doar să arate bine",
      "Galerie de lucrări sau produse",
      "Recenzii și testimoniale",
    ],
    waLabel: "Vreau site de prezentare",
  },
  {
    id: "complex",
    name: "Site complex",
    for: "Afaceri care au nevoie de mai mult decât o prezentare",
    price: siteFrom("multipage"),
    highlight: false,
    days: "5–10 zile",
    features: [
      "Tot din site de prezentare",
      "Mai multe pagini și secțiuni personalizate",
      "Rezervări sau programări online",
      "Calculator de preț, blog sau portofoliu",
    ],
    waLabel: "Vreau site complex",
  },
  {
    id: "magazin",
    name: "Magazin online",
    for: "Afaceri care vând produse direct de pe site",
    price: siteFrom("shop"),
    highlight: false,
    days: "10–15 zile",
    features: [
      "Tot din site complex",
      "Catalog de produse, coș și comenzi",
      "Plată online și ramburs",
      "Panou simplu din care îți vezi comenzile",
    ],
    waLabel: "Vreau magazin online",
  },
] as const

/** Ce intră în orice pachet — spus o dată, nu repetat pe fiecare card. */
export const INCLUDED = [
  "Design făcut întâi pentru telefon",
  "Optimizare SEO de bază pentru Google",
  "Google Maps, dacă ai punct de lucru",
  "Formular de contact + buton de apel și WhatsApp",
  "Domeniu și găzduire incluse primul an",
  "Certificat SSL (lacătul din bara de adrese)",
  "Publicarea site-ului — îl pun eu online",
  "Contract și factură",
] as const

// ------------------------------------------------------------ mentenanță ---

export const MAINTENANCE = [
  {
    name: "Administrare",
    price: MAINTENANCE_PRICES.essential,
    for: "Pentru cine vrea doar să nu se ocupe de nimic",
    items: [
      "Modificări de texte și informații",
      "Schimbări de poze și prețuri",
      "Verificări și actualizări de securitate",
      "Mici ajustări SEO",
    ],
  },
  {
    name: "Administrare + SEO",
    price: MAINTENANCE_PRICES.complete,
    for: "Pentru cine vrea să fie găsit mai bine în Google",
    items: [
      "Tot din pachetul Administrare",
      "Verificare lunară a poziției în Google",
      "Optimizarea titlurilor și descrierilor",
      "Îmbunătățirea textelor și a structurii paginilor",
    ],
  },
] as const

// ---------------------------------------------------------------- meniu ----

export const MENU_INCLUDES = [
  "Categorii și produse, organizate cum vrei tu",
  "Poze, prețuri și descrieri scurte",
  "Valori nutriționale: caloriile afișate la fiecare produs",
  "Alergeni și marcaje: vegan, vegetarian, fără gluten, picant",
  "Design făcut pentru telefon, se deschide instant",
  "Cod QR generat și pregătit de tipărit",
  "Actualizări periodice — îmi scrii, eu schimb",
] as const

/** Chip-urile de sub captura de meniu. Scurte, citite dintr-o privire. */
export const MENU_NUTRITION = [
  "kcal pe produs",
  "Alergeni marcați",
  "Vegan · fără gluten",
  "Picant · porții",
] as const

// ------------------------------------------------------- singur vs cu mine --

export const DIY_CONS = [
  "Plătești oricum abonament lunar la platformă, la nesfârșit",
  "Pierzi zile întregi învățând un editor",
  "Iese „aproape bine” — și „aproape” se vede",
  "Nu e optimizat nici pentru telefon, nici pentru Google",
  "Când se strică ceva, tot tu ești",
] as const

export const WITH_ME_PROS = [
  "Îți spun prețul din start și rămâne acolo",
  "Nu atingi nimic: trimiți pozele și informațiile",
  "În 3–5 zile ești online",
  "Optimizat pentru telefon și Google din construcție",
  "Se strică ceva sau vrei o schimbare — mă suni",
] as const

// ------------------------------------------------------------------ pași ---

export const STEPS = [
  {
    title: "Vorbim 10 minute",
    desc: "Pe WhatsApp sau la telefon. Îmi spui ce faci și ce vrei să obții.",
    time: "azi",
  },
  {
    title: "Îți trimit oferta",
    desc: "Preț exact și termen. Dacă e bine, semnăm contractul și dai 50% avans.",
    time: "în aceeași zi",
  },
  {
    title: "Construiesc eu tot",
    desc: "Îmi trimiți pozele și informațiile. De aici nu mai ai nimic de făcut.",
    time: "3–5 zile",
  },
  {
    title: "Vezi, corectez, public",
    desc: "Îți dau un link privat, îmi spui ce schimbi, schimb și pun site-ul online. Primești factura.",
    time: "1–2 zile",
  },
] as const

// ------------------------------------------------------------------- FAQ ---

export const FAQ = [
  {
    q: "De ce am nevoie de un site?",
    a: "Când cineva aude de tine, primul lucru pe care îl face e să te caute pe telefon. Dacă nu găsește nimic, te compară cu unul care are site — și îl alege pe el. Un site îți ține deschis non-stop: omul vede ce faci, unde ești, cât costă și te sună, la 11 noaptea sau duminica.",
  },
  {
    q: "De ce meniu digital?",
    a: "Clientul scanează codul QR de pe masă și vede meniul pe telefonul lui: poze, prețuri, ingrediente, alergeni. Nu mai tipărești meniuri la fiecare schimbare de preț, nu mai treci același meniu din mână în mână și poți schimba un preț sau scoate un produs în aceeași zi, nu la următoarea tipărire.",
  },
  {
    q: "Cine se ocupă de meniu? Trebuie să învăț ceva?",
    a: "Nu. **Eu fac tot.** Tu îmi trimiți pozele, prețurile și informațiile despre produse — atât. Eu construiesc meniul, îl aranjez, generez codul QR și fac toate actualizările de după. Nu intri în niciun panou, nu înveți niciun program, nu ai nimic de administrat.",
  },
  {
    q: "De ce administrare lunară? E obligatorie?",
    a: "Nu e obligatorie. Site-ul rămâne exact cum e și fără ea, e al tău. E pentru cine schimbă des prețuri, poze sau oferte și nu vrea să se ocupe singur. Îmi scrii pe WhatsApp ce vrei modificat și modific — de obicei în aceeași zi.",
  },
  {
    q: "Cum se plătește?",
    a: "Prin transfer bancar, în contul PFA. La site-uri: **50% avans** la început, restul la livrare. La meniul digital: **250 lei la început**, apoi **150 lei/lună** pentru administrare.",
  },
  {
    q: "Primesc factură?",
    a: "Da. Lucrez ca **Balta David Ioan — Persoană Fizică Autorizată**. Primești contract de prestări servicii înainte să începem și factură la fiecare plată. Firma ta poate deconta normal.",
  },
] as const

// ------------------------------------------------------------- de ce eu ----

export const WHY_ME = [
  {
    title: "PFA, contract și factură",
    desc: "Balta David Ioan — PFA. Contract înainte, factură după. Firma ta deconta fără probleme.",
  },
  {
    title: "Vezi exact ce primești",
    desc: "Modelele de mai sus sunt site-uri complete, online acum. Deschide-le și verifică-le înainte să decizi.",
  },
  {
    title: "Preț spus din start",
    desc: "Îți spun cât costă înainte să începem. Ce e în ofertă rămâne în ofertă.",
  },
  {
    title: "Vorbești direct cu mine",
    desc: "Nu treci prin trei intermediari ca să schimbi o poză. Îmi scrii, îți răspund.",
  },
] as const
