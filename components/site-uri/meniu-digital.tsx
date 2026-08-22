"use client"

// ============================================================================
// Meniu digital cu cod QR — secțiune publică pe /site-uri.
// ----------------------------------------------------------------------------
// E alt cumpărător decât cel de site (restaurant, cafenea, bar), altă decizie
// și alt preț, așa că stă în banda lui, cu accentul auriu al brandului, nu
// amestecat printre pachetele de site.
//
// Prețurile vin din lib/pricing.ts — aceleași cifre ca pe /oferta.
// ============================================================================

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Check, QrCode, Smartphone, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MENU_PRICES } from "@/lib/pricing"

const lei = (value: number) => new Intl.NumberFormat("ro-RO").format(value)

const includes = [
  "Categorii și produse, organizate cum vrei tu",
  "Poze, prețuri și descrieri scurte",
  "Valori nutriționale: caloriile afișate la fiecare produs",
  "Alergeni și marcaje: vegan, vegetarian, fără gluten, picant",
  "Design făcut pentru telefon, se deschide instant",
  "Cod QR generat și pregătit de tipărit",
  "Actualizări periodice — îmi scrii, eu schimb",
]

const beneficii = [
  {
    icon: QrCode,
    title: "Clientul scanează, gata",
    desc: "Codul QR stă pe masă. Clientul îl scanează și vede meniul pe telefonul lui, fără aplicație.",
  },
  {
    icon: RefreshCw,
    title: "Schimbi prețul azi, nu la retipărire",
    desc: "S-a scumpit un produs sau s-a terminat? Îmi scrii și modific în aceeași zi.",
  },
  {
    icon: Smartphone,
    title: "Fără meniuri fizice trecute din mână în mână",
    desc: "Nu mai tipărești la fiecare schimbare și nu mai ai meniuri rupte sau pătate.",
  },
]

export default function SiteUriMeniuDigital() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} id="meniu-digital" className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 mb-5">
            <QrCode className="w-3.5 h-3.5 text-amber-600" strokeWidth={1.8} />
            <span className="text-amber-700 text-sm font-medium">
              Pentru restaurante și cafenele
            </span>
          </div>
          <h2
            style={{ letterSpacing: "-0.025em" }}
            className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4 text-balance"
          >
            Meniu digital cu cod QR
          </h2>
          <p className="text-zinc-600 max-w-xl mx-auto" style={{ lineHeight: "1.7" }}>
            Clientul scanează codul de pe masă și vede meniul pe telefonul lui: poze, prețuri,
            ingrediente, alergeni și calorii.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          {beneficii.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white border border-zinc-200 card-elevated"
            >
              <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-4">
                <b.icon className="w-5 h-5 text-amber-600" strokeWidth={1.8} />
              </div>
              <h3
                className="text-base font-semibold text-zinc-900 mb-2"
                style={{ letterSpacing: "-0.015em" }}
              >
                {b.title}
              </h3>
              <p className="text-sm text-zinc-600" style={{ lineHeight: "1.65" }}>
                {b.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="grid lg:grid-cols-2 gap-6 p-6 sm:p-8 rounded-2xl bg-white border border-amber-200/70 card-elevated"
        >
          <div>
            <h3
              className="text-lg font-semibold text-zinc-900 mb-4"
              style={{ letterSpacing: "-0.015em" }}
            >
              Ce primești
            </h3>
            <ul className="space-y-3">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-700">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" strokeWidth={2.5} />
                  <span style={{ lineHeight: "1.6" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-700">
                  La început
                </p>
                <p
                  className="mt-2 text-2xl font-bold text-zinc-900"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {lei(MENU_PRICES.setup)}{" "}
                  <span className="text-sm font-medium text-zinc-500">lei</span>
                </p>
                <p className="mt-1.5 text-xs text-zinc-600" style={{ lineHeight: "1.5" }}>
                  Construiesc meniul complet și generez codul QR.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-700">
                  Apoi
                </p>
                <p
                  className="mt-2 text-2xl font-bold text-zinc-900"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {lei(MENU_PRICES.monthly)}{" "}
                  <span className="text-sm font-medium text-zinc-500">lei/lună</span>
                </p>
                <p className="mt-1.5 text-xs text-zinc-600" style={{ lineHeight: "1.5" }}>
                  Administrare completă, actualizări periodice.
                </p>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-zinc-50 border border-zinc-200">
              <p className="text-sm text-zinc-700" style={{ lineHeight: "1.7" }}>
                <span className="font-semibold text-zinc-900">Tu nu faci nimic.</span> Îmi trimiți
                pozele, prețurile și informațiile despre produse. Eu construiesc meniul, îl aranjez
                și îl actualizez de fiecare dată când schimbi ceva. Nu intri în niciun panou și nu ai
                nimic de învățat.
              </p>
            </div>

            <Button
              className="w-full mt-4 rounded-full font-semibold bg-zinc-900 text-white hover:bg-zinc-800"
              asChild
            >
              <a
                href="https://wa.me/40729369094?text=Salut%2C%20David.%20M%C4%83%20intereseaz%C4%83%20un%20meniu%20digital%20cu%20cod%20QR%20pentru%20localul%20meu.%20"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vreau meniu digital
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
