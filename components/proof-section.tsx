"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, ExternalLink, Star, Trophy } from "lucide-react"
import Link from "next/link"

type Proof = {
  category: string
  name: string
  blurb: string
  metric: string
  url: string
}

// Live screenshots of the real projects (no extra setup, no API key).
const shot = (url: string) =>
  `https://image.thum.io/get/width/900/crop/750/noanimate/${url}`

const projects: Proof[] = [
  {
    category: "Site stomatologic",
    name: "Model site cabinet stomatologic",
    blurb:
      "Site de prezentare profesional pentru o clinică dentară, optimizat să transforme vizitatorii în pacienți noi.",
    metric: "Construit pentru conversie",
    url: "https://democlinicastomatologica.netlify.app/",
  },
  {
    category: "Aplicație CRM",
    name: "Davix Dental",
    blurb:
      "Aplicație web pentru clinici: pacienți, programări, fișe, financiar și automatizări SMS.",
    metric: "Tot fluxul clinicii într-un singur loc",
    url: "https://davixdental.online/",
  },
  {
    category: "Site stomatologic",
    name: "Cabinet Dr. Domnar Gabriel",
    blurb:
      "Site profesional cu servicii, echipă și programare online, gândit să aducă programări direct din site.",
    metric: "Mai puține apeluri, mai mulți pacienți",
    url: "https://cabinet-domnargabriel.netlify.app/",
  },
]

export function ProofSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-20 sm:py-28 px-4 sm:px-6">
      {/* Layered glow background */}
      <div className="absolute inset-0 -z-0">
        <div className="absolute -top-20 left-1/4 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[420px] bg-emerald-400/10 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
            backgroundSize: "34px 34px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 mb-5">
            <Trophy className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.8} />
            <span className="text-emerald-300 text-sm font-medium">Proiecte reale, livrate</span>
          </div>
          <h2
            style={{ letterSpacing: "-0.025em" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance"
          >
            Muncă reală, nu promisiuni
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto" style={{ lineHeight: "1.7" }}>
            Câteva dintre site-urile și aplicațiile pe care le-am construit pentru clienți. Apasă pe
            oricare ca să-l vezi live.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.a
              key={p.url}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-emerald-400/40 hover:-translate-y-1 transition-[transform,border-color] duration-300"
            >
              {/* Real screenshot */}
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shot(p.url)}
                  alt={`Screenshot ${p.name}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-zinc-950/70 backdrop-blur text-[10px] font-semibold uppercase tracking-widest text-emerald-300 border border-emerald-400/20">
                  {p.category}
                </span>
                <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4" />
                </span>
              </div>

              {/* Info */}
              <div className="flex flex-col flex-1 p-5">
                <h3 className="text-lg font-semibold text-white mb-1.5">{p.name}</h3>
                <p className="text-sm text-zinc-400 mb-4 flex-1" style={{ lineHeight: "1.6" }}>
                  {p.blurb}
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-xs font-medium text-emerald-300 self-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {p.metric}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Testimonial strip */}
        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 max-w-3xl mx-auto text-center rounded-2xl border border-white/10 bg-white/[0.03] p-8"
        >
          <div className="flex justify-center gap-1 mb-4">
            {[0, 1, 2, 3, 4].map((s) => (
              <Star key={s} className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            ))}
          </div>
          <blockquote className="text-lg sm:text-xl text-zinc-100 font-medium" style={{ lineHeight: "1.6" }}>
            „Am primit un site care chiar aduce programări, nu doar arată bine. Comunicarea a fost
            rapidă și totul a fost livrat la timp.”
          </blockquote>
          <figcaption className="mt-4 text-sm text-zinc-400">
            Client DaviX AI · Cabinet stomatologic
          </figcaption>
        </motion.figure>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/proiecte"
            className="inline-flex items-center justify-center gap-2 px-7 h-12 rounded-full bg-white text-zinc-900 font-semibold hover:bg-zinc-100 transition-colors"
          >
            Vezi toate proiectele
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
