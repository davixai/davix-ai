"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, ArrowUpRight, Trophy } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Button } from "@/components/ui/button"

type Project = {
  category: string
  name: string
  story: string
  url: string
  image: string
  waMessage: string
}

const projects: Project[] = [
  {
    category: "Site stomatologic",
    name: "Model site pentru cabinet stomatologic",
    story:
      "Site de prezentare profesional pentru o clinică dentară, construit să transforme vizitatorii în pacienți noi: servicii explicate clar, dovezi de încredere (recenzii, rezultate) și programare rapidă în câțiva pași. Design curat și premium, optimizat pentru conversie.",
    url: "https://democlinicastomatologica.netlify.app/",
    image: "/projects/lumident.webp",
    waMessage: "Salut! Vreau un site pentru cabinetul meu stomatologic, ca acest model.",
  },
  {
    category: "Site stomatologic",
    name: "Cabinet Dr. Domnar Gabriel",
    story:
      "Site profesional pentru un cabinet stomatologic, cu pagini de servicii, echipă și programare online. Gândit să inspire încredere și să aducă programări direct din site — mai puține apeluri, mai mulți pacienți noi.",
    url: "https://cabinet-domnargabriel.netlify.app/",
    image: "/projects/domnar.webp",
    waMessage: "Salut! Vreau un site profesional pentru cabinetul meu, ca cel al Dr. Domnar.",
  },
  {
    category: "Aplicație CRM stomatologic",
    name: "Davix Dental",
    story:
      "Aplicație web cu abonament pentru clinici stomatologice: pacienți, programări, fișe medicale, financiar și automatizări SMS — tot fluxul clinicii într-un singur loc, accesibil de pe orice dispozitiv.",
    url: "https://davixdental.online/",
    image: "/projects/davix-dental.webp",
    waMessage: "Salut! Sunt interesat de aplicația Davix Dental pentru clinica mea.",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function ProiectePage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-transparent text-zinc-900">
        <Navbar />

        <div className="pt-28 pb-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-14 text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-6">
                <Trophy className="w-3.5 h-3.5 text-emerald-600" strokeWidth={1.8} />
                <span className="text-emerald-700 text-sm font-medium">Portofoliu DaviX AI</span>
              </div>
              <h1
                style={{ letterSpacing: "-0.025em" }}
                className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-4 text-balance"
              >
                Proiecte demonstrative
              </h1>
              <p
                className="text-zinc-600 max-w-2xl mx-auto"
                style={{ lineHeight: "1.7" }}
              >
                Exemple reale realizate de echipa DaviX AI — site-uri de prezentare care aduc pacienți
                și aplicații care organizează clinica. Apasă pe oricare proiect ca să-l deschizi live.
              </p>
            </motion.div>

            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {projects.map((project) => (
                <motion.article
                  key={project.url}
                  variants={cardVariants}
                  className="group flex flex-col rounded-2xl bg-white border border-zinc-200 overflow-hidden
                             hover:border-emerald-300 hover:-translate-y-1
                             transition-[transform,border-color] duration-300 card-elevated"
                >
                  {/* Preview image → opens the live site */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Deschide ${project.name}`}
                    className="relative block aspect-[16/10] overflow-hidden bg-zinc-900
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                  >
                    <img
                      src={project.image}
                      alt={`Preview ${project.name}`}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                    {/* depth: subtle bottom blend + inset ring */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/35 via-transparent to-transparent" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                    {/* category chip */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-zinc-950/55 backdrop-blur-sm border border-white/10 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                      {project.category}
                    </span>
                    {/* hover open hint */}
                    <span className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-zinc-950/55 backdrop-blur-sm border border-white/10 text-white opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                    </span>
                  </a>

                  {/* Story / text */}
                  <div className="flex flex-col flex-1 p-5 sm:p-6">
                    <h2
                      className="text-lg font-semibold text-zinc-900 mb-2 leading-snug"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {project.name}
                    </h2>
                    <p className="text-sm text-zinc-600 flex-1" style={{ lineHeight: "1.7" }}>
                      {project.story}
                    </p>

                    <div className="mt-5 flex items-center gap-3">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-600 transition-colors"
                      >
                        Vezi site-ul
                        <ArrowUpRight
                          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={2}
                        />
                      </a>
                      <a
                        href={`https://wa.me/40729369094?text=${encodeURIComponent(project.waMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 active:scale-95 transition-[transform,background-color] duration-200"
                      >
                        Vreau ceva similar
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-14 p-8 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white text-center"
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-3" style={{ letterSpacing: "-0.02em" }}>
                Ai un proiect în minte?
              </h3>
              <p className="text-emerald-50 mb-6 max-w-xl mx-auto" style={{ lineHeight: "1.6" }}>
                Programează un audit gratuit de 15 minute și discutăm cum putem să-l construim.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="lg"
                  className="rounded-full bg-white text-emerald-700 hover:bg-zinc-100 font-semibold"
                  asChild
                >
                  <Link href="/#contact">Programează audit gratuit</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/30 text-white hover:bg-white/10 bg-transparent"
                  asChild
                >
                  <a href="https://wa.me/40729369094" target="_blank" rel="noopener noreferrer">
                    Scrie pe WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        <Footer />
      </main>
    </SmoothScroll>
  )
}
