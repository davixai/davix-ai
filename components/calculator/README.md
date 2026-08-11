# Calculator de estimare — DaviX AI

Secțiune interactivă care înlocuiește formularul clasic de contact: pune câteva
întrebări, ramifică fluxul în funcție de răspunsuri și afișează în timp real o
estimare de preț, un cost lunar recurent și un termen de livrare. La final,
cererea de ofertă pleacă prin `POST /api/lead` cu toate selecțiile atașate.

Versiune curentă: **v1.0** (afișată în interfață, în panoul live).

---

## Cum se rulează

```bash
pnpm install      # sau npm install
pnpm dev          # http://localhost:3000
```

Calculatorul e montat în [`app/page.tsx`](../../app/page.tsx). Se poate pune
oriunde altundeva, fără configurare:

```tsx
import { PriceCalculator } from "@/components/calculator"

export default function Page() {
  return <PriceCalculator />
}
```

Secțiunea are `id="calculator"` și, imediat înaintea ei, o ancoră `id="contact"`,
ca linkurile deja existente în site către `/#contact` să ajungă tot aici.

---

## Unde se modifică prețurile

**Un singur fișier: [`lib/pricing.ts`](../../lib/pricing.ts).** Nu trebuie
atinsă nicio componentă.

| Ce vrei să schimbi | Unde |
| --- | --- |
| Prețul unui tip de site, chatbot, pagini în plus | `SITE_PRICES` |
| Prețul funcționalităților din pasul „Ce trebuie să conțină?" | `SITE_FEATURE_PRICES` |
| Pachetele de mentenanță și tariful orar extra | `MAINTENANCE_PRICES` |
| Automatizare: preț per proces, abonament, tarif orar pentru economie | `AUTOMATION_PRICES` |
| Cât timp se recuperează efectiv prin automatizare | `AUTOMATION_PRICES.efficiency` |
| Aplicații: DaviX Dental, DaviX Cafe, aplicație personalizată | `APP_PRICES` |
| Termene de livrare | `TIMELINES` |
| Cât de larg e intervalul afișat (implicit ±15%) | `RANGE_SPREAD` |

Câteva valori sunt marcate în comentarii cu **„ipoteză"** — nu erau în lista de
prețuri oficială și au fost derivate rezonabil (ex. supliment per locație
suplimentară, câte module include prețul de pornire al unei aplicații
personalizate). Se pot schimba liber.

Prețurile se afișează **întotdeauna ca interval**, niciodată ca sumă fixă, și se
rotunjesc la 50 lei.

---

## Cum se adaugă o ramură nouă

Trei pași, toți în afara componentelor vizuale:

1. **Adaugă cheile de răspuns** în interfața `Answers` din `lib/pricing.ts`.
2. **Descrie pașii** în [`flow.ts`](./flow.ts): scrie o funcție `xFlow()` care
   returnează `Step[]` și adaug-o într-un `case` nou în `buildFlow()`.
3. **Adaugă calculul** în `lib/pricing.ts`: o funcție `estimateX(answers)` și un
   `case` în `estimate()`.

Un pas e format din câmpuri, iar câmpurile au trei feluri — `single`, `multi`,
`text` — randate toate de același component ([`ui/field-view.tsx`](./ui/field-view.tsx)).
Un pas poate conține mai multe câmpuri deodată (ex. „Câte locații?" + „Ce module?").

Opțiunile suportă: descriere, badge de stare (`Disponibil` / `În lucru`), preț
afișat cu font mono, listă de puncte incluse, un panou explicativ (`info`) și un
câmp text atașat care apare doar când opțiunea e selectată (`textField`).

Indicatorul de progres, panoul live, sumarul, PDF-ul și payload-ul de lead se
actualizează automat — etichetele sunt citite din definiția fluxului
([`describe.ts`](./describe.ts)), deci nu există liste de texte duplicate.

---

## Endpoint-ul de lead

`POST /api/lead` — [`app/api/lead/route.ts`](../../app/api/lead/route.ts).
Validează cu `zod` și **loghează întotdeauna** lead-ul pe server. Integrările
sunt opționale și se activează prin variabile de mediu:

| Variabilă | Efect |
| --- | --- |
| `RESEND_API_KEY` | Trimite email către admin + confirmare către client |
| `RESEND_FROM_EMAIL` | Expeditorul (implicit `contact@davixai.website`) |
| `LEAD_ADMIN_EMAIL` | Destinatarul intern (implicit `davixai.contact@gmail.com`) |
| `LEAD_WEBHOOK_URL` | POST către n8n / Zapier / Google Apps Script (Sheets) |

Dacă nu e configurat nimic, cererea reușește și lead-ul rămâne în loguri. Dacă
integrările configurate eșuează toate, endpoint-ul răspunde `502` cu un mesaj
care îi spune clientului să sune — nu pretinde succes fals.

`GET /api/lead` returnează starea integrărilor, ca verificare rapidă.

---

## Reguli respectate în cod

Nu sunt preferințe de stil, sunt cerințe funcționale:

1. **Conținutul e vizibil fără JavaScript.** Animațiile de intrare sunt
   `@keyframes` CSS cu `animation-fill-mode: both`, iar starea implicită a
   fiecărui element este vizibilă. Randarea pe server a secțiunii nu conține
   niciun `opacity: 0` și niciun stil inline de opacitate.
2. **Framer Motion doar pentru interacțiuni** — o singură utilizare, în
   [`ui/animated-number.tsx`](./ui/animated-number.tsx), pentru tranziția cifrelor.
   Niciodată ca să facă un conținut vizibil.
3. **Fără `AnimatePresence` pe conținutul pașilor.** Se folosește `key` pe pas
   plus animație CSS, deci nu există niciun moment cu ecranul gol.
4. **Error Boundary pe fiecare pas** ([`ui/step-error-boundary.tsx`](./ui/step-error-boundary.tsx)),
   cu mesaj și buton de reluare. Se resetează automat la schimbarea pasului.
5. **Niciun pas nu poate randa gol** — un pas fără câmpuri afișează o stare
   goală explicită, cu explicație și buton de ieșire.
6. **Marcaj de versiune vizibil** în panoul live (`CALCULATOR_VERSION`).
7. **`prefers-reduced-motion: reduce`** oprește toate animațiile, tranzițiile
   *și întârzierile*, plus confetti-ul.
8. **Mobil**: bară fixă jos cu înapoi / preț live / continuă, `safe-area-inset`
   pe iPhone, zone de atingere de minimum 44px, input-uri de 16px (altfel iOS
   face zoom la focus), zero scroll orizontal, modal cu înălțime maximă și
   scroll propriu.

---

## Conviețuirea cu elementele plutitoare ale site-ului

Cât timp secțiunea e pe ecran (detectat cu `IntersectionObserver`), componenta
pune pe `<body>` două atribute, folosite de reguli CSS din `calculator.css`:

- `data-dvx-bar="1"` — bara fixă de jos e afișată, deci widget-ul de chat
  ElevenLabs urcă cu ~5rem ca să nu acopere butonul „Continuă".
- `data-dvx-visible="1"` — se ascund CTA-ul plutitor „Programează audit gratuit"
  (care oricum trimite chiar în această secțiune) și toast-ul promoțional
  DaviX Dental, fiindcă acopereau opțiunile din coloana stângă.

Ambele se scot automat când secțiunea iese din viewport sau la demontare, deci
**restul site-ului rămâne exact cum era.** Dacă vrei să le păstrezi vizibile,
șterge blocul „CONVIEȚUIRE CU ELEMENTELE PLUTITOARE" din `calculator.css`.

---

## Acțiunile din sumar

| Buton | Ce face |
| --- | --- |
| Solicită oferta personalizată | Deschide modalul și trimite la `/api/lead` |
| Descarcă PDF | Deschide dialogul de printare pe un document curat, randat într-un iframe ascuns — utilizatorul alege „Salvează ca PDF" |
| Printează | Același document, direct la imprimantă |
| Trimite | `navigator.share` → clipboard → `mailto:`, în ordinea disponibilității |
| Salvează local | `localStorage`; la revenire apare bara „Reia / Șterge" |

Ambele butoane de export folosesc pipeline-ul de printare al browserului, ca să
nu adăugăm o bibliotecă de PDF în bundle. Dacă vrei un PDF generat server-side,
punctul de intrare e `buildPrintHtml()` din [`export-utils.ts`](./export-utils.ts).

---

## Structura fișierelor

```
lib/pricing.ts               prețuri, tipuri de răspunsuri, motorul de estimare
app/api/lead/route.ts        endpoint-ul de cerere ofertă

components/calculator/
  index.ts                   punctul public de import
  price-calculator.tsx       componenta principală (stare, navigare, montaj)
  flow.ts                    definiția pașilor + construcția dinamică a fluxului
  types.ts                   tipurile de interfață (Step, Field, Option)
  describe.ts                răspunsuri brute → text citibil, o singură dată
  export-utils.ts            PDF / print / share / localStorage
  lead-modal.tsx             modalul de cerere ofertă
  calculator.css             design system, animații, print, safe-area
  steps/
    branch-step.tsx          pasul 0, cu ilustrații animate
    fields-step.tsx          pașii de întrebări + starea goală
    summary-step.tsx         sumarul final
  ui/
    field-view.tsx           randatorul universal de câmpuri
    live-panel.tsx           panoul sticky cu prețul live
    mobile-bar.tsx           bara fixă de jos
    progress-indicator.tsx   progresul, recalculat dinamic
    animated-number.tsx      singura utilizare de Framer Motion
    branch-art.tsx           SVG-urile animate ale ramurilor
    step-error-boundary.tsx  Error Boundary per pas
    confetti.tsx             confetti pe canvas, fără dependențe
```

---

## Fonturi

Calculatorul folosește trei fonturi, încărcate în
[`app/layout.tsx`](../../app/layout.tsx): **Sora** pentru titluri,
**Manrope** pentru text (deja existent în site) și **JetBrains Mono** pentru
toate cifrele, unitățile și etichetele tehnice.
