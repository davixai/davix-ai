"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ExternalLink, Stethoscope, LayoutDashboard, Car } from "lucide-react"

const projects = [
  {
    category: "STOMATOLOGIE",
    Icon: Stethoscope,
    title: "Cabinete Stomatologice",
    description:
      "Site-uri de prezentare moderne pentru cabinete dentare — recenzii, servicii și programări.",
    links: [
      { label: "DaviDent — Cabinet Demo #1", url: "https://davident.lovable.app/#recenzii" },
      { label: "Cabinet Dr. Domnar Gabriel", url: "https://cabinet-domnargabriel.netlify.app/" },
    ],
  },
  {
    category: "SAAS / CRM",
    Icon: LayoutDashboard,
    title: "CRM Cabinete Stomatologice",
    description:
      "Aplicație SaaS cu abonament pentru gestionarea pacienților, programărilor și istoricului dentar.",
    links: [
      { label: "Dental CRM — Demo Live", url: "https://dental-crm1.pages.dev" },
    ],
  },
  {
    category: "DOMENIU AUTO",
    Icon: Car,
    title: "Platforme Auto",
    description:
      "Magazin online de piese auto și platformă de filtrare vehicule cu căutare avansată.",
    links: [
      { label: "PieseAutoSmart", url: "https://pieseautosmart.netlify.app/" },
      { label: "FiltrAuto — Căutare avansată", url: "https://v0-filtreauto.vercel.app/" },
    ],
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

export function ProiecteDemonstrative() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="proiecte" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-3"
        >
          <p className="text-sm text-zinc-500 mb-5">
            Domeniile sunt de tip demo/test și pot fi modificate. Proiectele sunt realizate de echipa DaviX AI.
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
            Proiecte demonstrative
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Câteva exemple concrete din proiectele noastre — fiecare construit cu același nivel de atenție și calitate.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className="group relative flex flex-col rounded-2xl bg-zinc-900 border border-zinc-800 p-6 overflow-hidden
                         hover:border-emerald-500/30 hover:bg-zinc-900/80 hover:scale-[1.025]
                         transition-transform transition-colors duration-300"
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/[0.03] transition-colors duration-300 pointer-events-none rounded-2xl" />

              {/* Top: icon + category */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center
                                group-hover:bg-emerald-500/20 transition-colors duration-300 shrink-0">
                  <project.Icon className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
                  {project.category}
                </span>
              </div>

              {/* Title + description */}
              <h3 className="text-lg font-semibold text-white mb-2 leading-snug">
                {project.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6 flex-1">
                {project.description}
              </p>

              {/* Links */}
              <div className="flex flex-col gap-2">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl
                               bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm
                               hover:bg-zinc-700 hover:border-zinc-600 hover:text-white
                               transition-colors duration-200 group/link"
                  >
                    <span className="truncate">{link.label}</span>
                    <ExternalLink
                      className="w-3.5 h-3.5 text-zinc-500 group-hover/link:text-emerald-400 shrink-0 transition-colors duration-200"
                      strokeWidth={1.5}
                    />
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-zinc-500 mt-10 text-sm italic"
        >
          ...și urmează multe alte proiecte
        </motion.p>
      </div>
    </section>
  )
}
