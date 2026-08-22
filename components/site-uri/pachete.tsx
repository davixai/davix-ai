"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Check, ArrowRight, Globe, Layers, ShoppingBag, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SITE_DEPOSIT_PERCENT, SITE_PRICES, siteFrom } from "@/lib/pricing"

/**
 * Prețurile vin din lib/pricing.ts, nu scrise de mână: pagina asta, /oferta și
 * calculatorul trebuie să spună întotdeauna același număr.
 *
 * Se comunică „de la X", niciodată sumă fixă — un site de 5 pagini pentru un
 * hotel cu galerie și rezervări nu e aceeași muncă cu 3 pagini pentru un
 * frizer, iar un preț fix taie posibilitatea de a tarifa munca grea.
 */
const pachete = [
  {
    id: "landing",
    name: "LANDING PAGE",
    icon: Target,
    price: siteFrom("landing"),
    currency: "lei",
    tagline: "O singură pagină, construită să convertească",
    idealPentru: "Campanii, un singur serviciu, lansări de produs",
    popular: false,
    features: [
      "O pagină, structurată pe un singur obiectiv",
      "Design modern, responsive (mobil + desktop)",
      "Formular de contact + buton WhatsApp",
      "SEO de bază + Google Maps",
      "Domeniu și găzduire incluse primul an",
      "Livrare în 2–3 zile",
    ],
  },
  {
    id: "prezentare",
    name: "PREZENTARE",
    icon: Globe,
    price: siteFrom("presentation"),
    currency: "lei",
    tagline: "Site de prezentare, modern și rapid",
    idealPentru: "Restaurante, cafenele, saloane, cabinete, pensiuni, firme mici",
    popular: true,
    features: [
      "Tot ce include pachetul Landing Page",
      "3–5 pagini",
      "Servicii, despre și contact, structurate clar",
      "Galerie sau portofoliu de lucrări",
      "SEO de bază pe fiecare pagină",
      "Livrare în 3–5 zile",
    ],
  },
  {
    id: "complex",
    name: "SITE COMPLEX",
    icon: Layers,
    price: siteFrom("multipage"),
    currency: "lei",
    tagline: "Mai multe pagini, cu funcții și automatizări",
    idealPentru: "Business-uri care vor mai mult decât o prezentare",
    popular: false,
    features: [
      "Tot ce include pachetul Prezentare",
      "Mai multe pagini + secțiuni personalizate",
      "Design premium, animații și interacțiuni",
      "Blog / portofoliu / galerie",
      "Rezervări sau programări online",
      "Calculator de preț sau configurator",
      "Formulare inteligente și automatizări",
      "Optimizare performanță și viteză",
      "Livrare în 5–10 zile",
    ],
  },
  {
    id: "magazin",
    name: "MAGAZIN ONLINE",
    icon: ShoppingBag,
    price: siteFrom("shop"),
    currency: "lei",
    tagline: "Site cu comenzi online și plăți",
    idealPentru: "Magazine, producători, servicii cu comandă online",
    popular: false,
    features: [
      "Tot ce include pachetul Site complex",
      "Catalog de produse cu variante și stoc",
      "Coș de cumpărături și checkout optimizat",
      "Plată online (card) + ramburs",
      "Integrare curier și facturare",
      "Panou de administrare simplu de folosit",
      "Emailuri automate (comandă, livrare, coș abandonat)",
      "Livrare în 10–15 zile",
    ],
  },
]

/** „1.400" — moneda se stilizează separat, lângă cifră. */
const lei = (value: number) => new Intl.NumberFormat("ro-RO").format(value)

export default function SiteUriPachete() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} id="pachete" className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-emerald-700 text-sm font-medium">Prețuri transparente</span>
          </div>
          <h2
            style={{ letterSpacing: "-0.025em" }}
            className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4 text-balance"
          >
            Alege pachetul potrivit
          </h2>
          <p className="text-zinc-600 max-w-xl mx-auto" style={{ lineHeight: "1.7" }}>
            Patru niveluri clare, în funcție de cât de complex e site-ul tău. Plătești o dată,
            site-ul e al tău.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {pachete.map((pachet, index) => (
            <motion.div
              key={pachet.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className={`relative flex flex-col p-7 rounded-2xl border card-elevated ${
                pachet.popular
                  ? "bg-gradient-to-br from-emerald-600 to-emerald-700 text-white border-emerald-500 lg:-mt-4 lg:mb-4 ring-1 ring-emerald-400/40"
                  : "bg-white border-zinc-200 hover:border-emerald-300 transition-colors duration-300"
              }`}
            >
              {pachet.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="px-4 py-1 text-xs font-semibold bg-white text-emerald-700 rounded-full shadow-sm">
                    CEL MAI ALES
                  </span>
                </div>
              )}

              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 ${
                  pachet.popular
                    ? "bg-white/15 border border-white/25"
                    : "bg-emerald-50 border border-emerald-100"
                }`}
              >
                <pachet.icon
                  className={`w-5 h-5 ${pachet.popular ? "text-white" : "text-emerald-600"}`}
                  strokeWidth={1.8}
                />
              </div>

              <div className="mb-5">
                <span
                  className={`text-xs font-semibold tracking-widest uppercase ${
                    pachet.popular ? "text-emerald-100" : "text-zinc-400"
                  }`}
                >
                  {pachet.name}
                </span>
                <div className="flex items-baseline gap-1.5 mt-2 mb-1.5">
                  <span
                    className={`text-sm font-medium ${
                      pachet.popular ? "text-emerald-100" : "text-zinc-500"
                    }`}
                  >
                    de la
                  </span>
                  <span
                    className={`text-3xl font-bold ${
                      pachet.popular ? "text-white" : "text-zinc-900"
                    }`}
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    {lei(pachet.price)}
                  </span>
                  <span
                    className={`text-base font-medium ${
                      pachet.popular ? "text-emerald-100" : "text-zinc-500"
                    }`}
                  >
                    {pachet.currency}
                  </span>
                </div>
                <p className={`text-sm ${pachet.popular ? "text-emerald-50" : "text-zinc-600"}`}>
                  {pachet.tagline}
                </p>
              </div>

              <div
                className={`px-3.5 py-2.5 rounded-xl mb-6 text-xs ${
                  pachet.popular
                    ? "bg-white/10 text-emerald-50"
                    : "bg-zinc-50 border border-zinc-100 text-zinc-600"
                }`}
                style={{ lineHeight: "1.6" }}
              >
                <span className={pachet.popular ? "text-white font-medium" : "text-zinc-900 font-medium"}>
                  Ideal pentru:{" "}
                </span>
                {pachet.idealPentru}
              </div>

              <ul className="space-y-3 mb-8">
                {pachet.features.map((feature) => (
                  <li
                    key={feature}
                    className={`flex items-start gap-2.5 text-sm ${
                      pachet.popular ? "text-emerald-50" : "text-zinc-700"
                    }`}
                  >
                    <Check
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        pachet.popular ? "text-white" : "text-emerald-600"
                      }`}
                      strokeWidth={2.5}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full rounded-full font-semibold mt-auto ${
                  pachet.popular
                    ? "bg-white text-emerald-700 hover:bg-zinc-100"
                    : "bg-zinc-900 text-white hover:bg-zinc-800"
                }`}
                asChild
              >
                <a href="https://wa.me/40729369094" target="_blank" rel="noopener noreferrer">
                  Cere ofertă
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-10 p-6 rounded-2xl bg-zinc-50 border border-zinc-200"
        >
          <p className="text-sm text-zinc-700 text-center mb-4" style={{ lineHeight: "1.7" }}>
            <span className="font-medium text-zinc-900">Prețul final depinde de</span> numărul de
            pagini, complexitatea designului, funcțiile speciale și integrările dorite. Îl stabilim
            împreună, la auditul gratuit — fără costuri ascunse.
            <br />
            <span className="font-medium text-zinc-900">Plata:</span> prin transfer bancar,{" "}
            {SITE_DEPOSIT_PERCENT}% avans la început și restul la livrare. Contract înainte, factură
            după. Domeniul și găzduirea sunt incluse în primul an; din anul 2, domeniul se
            reînnoiește cu{" "}
            <span className="font-medium text-zinc-900">
              {SITE_PRICES.domainRenewalYearly} lei pe an
            </span>
            . Atât — nu apare nimic în plus pe parcurs.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-zinc-500">
            {[
              `${SITE_DEPOSIT_PERCENT}% avans, restul la livrare`,
              "Domeniu și găzduire, primul an",
              "Site-ul e 100% al tău",
              "Administrare lunară opțională",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" strokeWidth={2.5} />
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
