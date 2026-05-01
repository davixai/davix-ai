"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ExternalLink } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Chatbot } from "@/components/chatbot"

const projects = [
  {
    category: "Stomatologie",
    name: "DaviDent",
    description: "Site de prezentare pentru un cabinet stomatologic modern.",
    url: "https://davident.lovable.app/#recenzii",
  },
  {
    category: "Stomatologie",
    name: "Cabinet Dr. Domnar Gabriel",
    description: "Site profesional cu programări online pentru cabinet dentar.",
    url: "https://cabinet-domnargabriel.netlify.app/",
  },
  {
    category: "SaaS / CRM",
    name: "Dental CRM",
    description: "Aplicație web cu abonament pentru gestionarea pacienților și programărilor.",
    url: "https://dental-crm1.pages.dev",
  },
  {
    category: "Auto",
    name: "PieseAutoSmart",
    description: "Magazin online de piese auto cu filtrare rapidă după marcă și model.",
    url: "https://pieseautosmart.netlify.app/",
  },
  {
    category: "Auto",
    name: "FiltrAuto",
    description: "Platformă de căutare avansată pentru vehicule second-hand.",
    url: "https://v0-filtreauto.vercel.app/",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function ProiectePage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-zinc-950">
        <Navbar />

        <div className="pt-28 pb-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-14 text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-400 text-sm font-medium">Portofoliu demo</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">
                Proiecte
              </h1>
              <p className="text-zinc-400 max-w-lg mx-auto leading-relaxed">
                Exemple concrete realizate de echipa DaviX AI — de la site-uri de prezentare la aplicații SaaS.
              </p>
            </motion.div>

            {/* Cards */}
            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {projects.map((project) => (
                <motion.div
                  key={project.url}
                  variants={cardVariants}
                  className="group flex flex-col rounded-2xl bg-zinc-900 border border-zinc-800 p-6
                             hover:border-emerald-500/30 hover:bg-zinc-900/80 hover:scale-[1.02]
                             transition-[transform,border-color,background-color] duration-300"
                >
                  {/* Category badge */}
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-500/70 mb-3">
                    {project.category}
                  </span>

                  {/* Name + description */}
                  <h2 className="text-base font-semibold text-white mb-2 leading-snug">
                    {project.name}
                  </h2>
                  <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* CTA */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                               bg-zinc-800 border border-zinc-700 text-sm text-zinc-300
                               hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400
                               transition-colors duration-200 w-fit"
                  >
                    Vezi proiectul
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                  </a>
                </motion.div>
              ))}
            </motion.div>

            {/* Disclaimer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 text-center text-xs text-zinc-600"
            >
              Proiectele sunt demonstrative și realizate de echipa DaviX AI. Link-urile sunt active pentru vizualizare.
            </motion.p>
          </div>
        </div>

        <Footer />
        <Chatbot />
      </main>
    </SmoothScroll>
  )
}
