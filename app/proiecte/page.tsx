"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  Check,
  Droplets,
  Hotel,
  LayoutDashboard,
  Star,
  Stethoscope,
  Trophy,
  Truck,
  UtensilsCrossed,
  Zap,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Button } from "@/components/ui/button"

type ProjectStatus = "client" | "premium" | "demo"

type Project = {
  businessType: string
  name: string
  highlights: string[]
  status: ProjectStatus
  icon: LucideIcon
  url: string
  image: string
  waMessage: string
  liveLabel: string
}

const projects: Project[] = [
  {
    businessType: "Vidanjare autorizată",
    name: "DISCIF S.R.L. · Suceava",
    highlights: [
      "Site publicat și folosit zilnic",
      "Formular de ofertă cu detaliile intervenției",
      "Telefon vizibil pe tot site-ul",
      "Zone deservite din județ, clar afișate",
    ],
    status: "client",
    icon: Droplets,
    url: "https://discifsuceava.ro/",
    image: "/projects/discif.webp",
    waMessage: "Salut! Vreau un site pentru firma mea, ca cel construit pentru DISCIF Suceava.",
    liveLabel: "Vezi site-ul",
  },
  {
    businessType: "Pensiune boutique",
    name: "ARBORÉA · Bucovina",
    highlights: [
      "Imagine premium, tip boutique",
      "Camere și experiențe prezentate clar",
      "Rezervare și disponibilitate rapidă",
      "Design cinematic, optimizat pe mobil",
    ],
    status: "premium",
    icon: Hotel,
    url: "https://pensiune.website/",
    image: "/projects/pensiune.webp",
    waMessage: "Salut! Vreau un site premium pentru pensiunea mea, ca modelul ARBORÉA.",
    liveLabel: "Vezi site-ul",
  },
  {
    businessType: "Restaurant & bar",
    name: "AMBRA",
    highlights: [
      "Meniu prezentat elegant",
      "Galerie cu atmosferă",
      "Rezervare rapidă",
      "Contact prin WhatsApp",
    ],
    status: "demo",
    icon: UtensilsCrossed,
    url: "https://restaurant-demo-10.netlify.app/",
    image: "/projects/restaurant.webp",
    waMessage: "Salut! Vreau un site pentru restaurantul meu, ca acest model.",
    liveLabel: "Vezi site-ul",
  },
  {
    businessType: "Clinică stomatologică",
    name: "Lumident",
    highlights: [
      "Servicii dentare clare",
      "Recenzii și rezultate",
      "Programare în câțiva pași",
      "Design premium, responsive",
    ],
    status: "demo",
    icon: Stethoscope,
    url: "https://democlinicastomatologica.netlify.app/",
    image: "/projects/lumident.webp",
    waMessage: "Salut! Vreau un site pentru cabinetul meu stomatologic, ca acest model.",
    liveLabel: "Vezi site-ul",
  },
  {
    businessType: "Electrician autorizat",
    name: "Electric Pro",
    highlights: [
      "Servicii și tarife orientative",
      "Galerie de lucrări",
      "Formular rapid de ofertă",
      "Contact pentru urgențe 24/7",
    ],
    status: "demo",
    icon: Zap,
    url: "https://electroivi-website-design.vercel.app/",
    image: "/projects/electroivi.webp",
    waMessage: "Salut! Vreau un site pentru firma mea de servicii electrice, ca acest model.",
    liveLabel: "Vezi site-ul",
  },
  {
    businessType: "Tractări auto 24/7",
    name: "DAR Assist · Bucovina",
    highlights: [
      "Apel rapid, disponibil 24/7",
      "Servicii și prețuri clare",
      "Zone de intervenție vizibile",
      "Asistență rutieră imediată",
    ],
    status: "demo",
    icon: Truck,
    url: "https://demotractari.netlify.app/",
    image: "/projects/tractari.webp",
    waMessage: "Salut! Vreau un site pentru serviciul meu de tractări auto, ca acest model.",
    liveLabel: "Vezi site-ul",
  },
]

/** Not a client site — our own software, so it gets its own band under the grid. */
const ownProduct = {
  businessType: "Aplicație pentru cabinete stomatologice",
  name: "Davix Dental",
  highlights: [
    "Pacienți și programări",
    "Fișe și planuri de tratament",
    "Încasări și laborator",
    "Mesaje automate către pacienți",
  ],
  icon: LayoutDashboard,
  url: "https://davixdental.online/",
  image: "/projects/davix-dental.webp",
  waMessage: "Salut! Sunt interesat de aplicația Davix Dental pentru clinica mea.",
}

const industries: { label: string; icon: LucideIcon }[] = [
  { label: "Vidanjare & utilaje", icon: Droplets },
  { label: "Pensiuni", icon: Hotel },
  { label: "Restaurante", icon: UtensilsCrossed },
  { label: "Clinici dentare", icon: Stethoscope },
  { label: "Electricieni", icon: Zap },
  { label: "Tractări auto", icon: Truck },
  { label: "Cabinete dentare", icon: LayoutDashboard },
]

const statusBadges: Record<ProjectStatus, { label: string; className: string }> = {
  client: {
    label: "Client real · Suceava",
    className:
      "bg-emerald-500 border-emerald-300 text-zinc-950 shadow-[0_8px_28px_-12px_rgba(16,185,129,0.9)]",
  },
  premium: {
    label: "Model premium · exclusiv",
    className:
      "bg-[#f2c46d] border-[#f7d89b] text-zinc-950 shadow-[0_8px_28px_-12px_rgba(242,196,109,0.85)]",
  },
  demo: {
    label: "Model · se personalizează",
    className: "bg-zinc-950/70 border-white/15 text-zinc-200 backdrop-blur-md",
  },
}

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
              className="mb-12 text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-6">
                <Trophy className="w-3.5 h-3.5 text-emerald-600" strokeWidth={1.8} />
                <span className="text-emerald-700 text-sm font-medium">Portofoliu DaviX AI</span>
              </div>
              <h1
                style={{ letterSpacing: "-0.025em" }}
                className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-4 text-balance max-w-4xl mx-auto"
              >
                Site-uri și aplicații pentru afaceri locale
              </h1>
              <p
                className="text-zinc-600 max-w-2xl mx-auto"
                style={{ lineHeight: "1.7" }}
              >
                Un client real și șase modele gata de personalizat — toate live.
              </p>

              <div className="mt-8">
                <p className="text-sm font-medium text-zinc-600 mb-3">
                  Vezi ce putem construi pentru afacerea ta:
                </p>
                <div className="flex flex-wrap justify-center gap-2.5">
                  {industries.map((industry) => {
                    const IndustryIcon = industry.icon

                    return (
                      <span
                        key={industry.label}
                        className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-2 text-sm font-medium text-zinc-700 card-elevated"
                      >
                        <IndustryIcon
                          className="w-4 h-4 text-emerald-400"
                          strokeWidth={1.9}
                          aria-hidden="true"
                        />
                        {industry.label}
                      </span>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {projects.map((project) => {
                const ProjectIcon = project.icon
                const badge = statusBadges[project.status]
                const isClient = project.status === "client"
                const isPremiumDemo = project.status === "premium"
                const isFeatured = isClient || isPremiumDemo

                return (
                  <motion.article
                    key={project.url}
                    variants={cardVariants}
                    className={`group flex flex-col rounded-2xl bg-white border overflow-hidden
                               hover:-translate-y-1 transition-[transform,border-color,box-shadow] duration-300 card-elevated
                               ${
                                 isClient
                                   ? "border-emerald-400/70 hover:border-emerald-500 shadow-[0_0_0_1px_rgba(16,185,129,0.1),0_22px_60px_-32px_rgba(16,185,129,0.55)]"
                                   : isPremiumDemo
                                     ? "border-[#f2c46d]/55 hover:border-[#f7d89b] shadow-[0_0_0_1px_rgba(242,196,109,0.08),0_22px_60px_-32px_rgba(242,196,109,0.5)]"
                                     : "border-zinc-200 hover:border-emerald-300"
                               }`}
                  >
                    {/* Preview image → opens the live project */}
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
                      {/* project status */}
                      <span
                        className={`absolute top-3 left-3 max-w-[calc(100%-1.5rem)] inline-flex items-center gap-2 rounded-full border uppercase tracking-[0.12em]
                                   ${
                                     isFeatured
                                       ? "right-3 justify-center px-3.5 py-2 text-xs sm:text-sm font-extrabold"
                                       : "px-2.5 py-1 text-[10px] font-semibold"
                                   } ${badge.className}`}
                      >
                        {isClient && (
                          <BadgeCheck className="w-4 h-4 shrink-0" strokeWidth={2.2} aria-hidden="true" />
                        )}
                        {isPremiumDemo && (
                          <Star className="w-4 h-4 fill-current shrink-0" strokeWidth={1.8} aria-hidden="true" />
                        )}
                        {badge.label}
                      </span>
                      {/* hover open hint */}
                      <span className="absolute bottom-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-zinc-950/55 backdrop-blur-sm border border-white/10 text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-[opacity,transform] duration-300">
                        <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                      </span>
                    </a>

                    {/* Business type / project benefits */}
                    <div className="flex flex-col flex-1 p-5 sm:p-6">
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 flex w-10 h-10 shrink-0 items-center justify-center rounded-xl border ${
                            isClient
                              ? "border-emerald-200 bg-emerald-50 text-emerald-400"
                              : isPremiumDemo
                                ? "border-[#f2c46d]/35 bg-[#f2c46d]/10 text-[#f7d89b]"
                                : "border-zinc-200 bg-zinc-50 text-zinc-600"
                          }`}
                        >
                          <ProjectIcon className="w-5 h-5" strokeWidth={1.8} aria-hidden="true" />
                        </span>
                        <div>
                          <h2
                            className="text-xl font-bold text-zinc-900 leading-tight"
                            style={{ letterSpacing: "-0.025em" }}
                          >
                            {project.businessType}
                          </h2>
                          <p className="mt-1 text-sm font-medium text-zinc-500">{project.name}</p>
                        </div>
                      </div>

                      <ul className="mt-5 flex-1 space-y-2.5" aria-label={`Beneficii ${project.businessType}`}>
                        {project.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-start gap-2.5 text-sm text-zinc-600">
                            <Check
                              className={`mt-0.5 w-4 h-4 shrink-0 ${
                                isClient
                                  ? "text-emerald-400"
                                  : isPremiumDemo
                                    ? "text-[#f2c46d]"
                                    : "text-emerald-500"
                              }`}
                              strokeWidth={2.2}
                              aria-hidden="true"
                            />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full text-sm font-medium text-zinc-700 hover:text-emerald-700
                                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 transition-colors"
                        >
                          {project.liveLabel}
                          <ArrowUpRight
                            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            strokeWidth={2}
                          />
                        </a>
                        <a
                          href={`https://wa.me/40729369094?text=${encodeURIComponent(project.waMessage)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`ml-auto inline-flex items-center gap-1.5 whitespace-nowrap px-3.5 py-2 rounded-full text-xs font-semibold
                                     active:scale-95 transition-[transform,background-color,box-shadow] duration-200 ${
                                       isPremiumDemo
                                         ? "bg-[#f2c46d] text-zinc-950 hover:bg-[#f7d89b] shadow-[0_8px_24px_-12px_rgba(242,196,109,0.8)]"
                                         : "bg-emerald-600 text-white hover:bg-emerald-700"
                                     }`}
                        >
                          Vreau ceva similar
                          <ArrowRight className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
                        </a>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>

            {/* Own software — sits outside the client grid so it doesn't read as a seventh site */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              aria-labelledby="produs-propriu"
              className="group mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] overflow-hidden
                         rounded-2xl bg-white border border-sky-300/25 card-elevated
                         shadow-[0_0_0_1px_rgba(56,189,248,0.06),0_22px_60px_-32px_rgba(56,189,248,0.45)]"
            >
              <a
                href={ownProduct.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Deschide ${ownProduct.name}`}
                className="relative block aspect-[16/10] lg:aspect-auto lg:min-h-[300px] overflow-hidden bg-zinc-900
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-inset"
              >
                <img
                  src={ownProduct.image}
                  alt={`Preview ${ownProduct.name}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/35 via-transparent to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                <span
                  className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full border px-3.5 py-2
                             text-xs sm:text-sm font-extrabold uppercase tracking-[0.12em]
                             bg-sky-400 border-sky-200 text-zinc-950 shadow-[0_8px_28px_-12px_rgba(56,189,248,0.9)]"
                >
                  <Boxes className="w-4 h-4 shrink-0" strokeWidth={2.2} aria-hidden="true" />
                  Produs propriu
                </span>
              </a>

              <div className="flex flex-col justify-center p-6 sm:p-8">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex w-10 h-10 shrink-0 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 text-sky-400">
                    <ownProduct.icon className="w-5 h-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div>
                    <h2
                      id="produs-propriu"
                      className="text-xl sm:text-2xl font-bold text-zinc-900 leading-tight"
                      style={{ letterSpacing: "-0.025em" }}
                    >
                      {ownProduct.businessType}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-zinc-500">{ownProduct.name}</p>
                  </div>
                </div>

                <p className="mt-4 text-sm text-zinc-600" style={{ lineHeight: "1.7" }}>
                  Aplicația pe care o construim și o întreținem noi — nu un site de prezentare, ci
                  software folosit zilnic într-o clinică.
                </p>

                <ul
                  className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5"
                  aria-label={`Ce include ${ownProduct.name}`}
                >
                  {ownProduct.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2.5 text-sm text-zinc-600">
                      <Check className="mt-0.5 w-4 h-4 shrink-0 text-sky-400" strokeWidth={2.2} aria-hidden="true" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={ownProduct.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full text-sm font-medium text-zinc-700 hover:text-sky-700
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 transition-colors"
                  >
                    Vezi aplicația
                    <ArrowUpRight
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2}
                    />
                  </a>
                  <a
                    href={`https://wa.me/40729369094?text=${encodeURIComponent(ownProduct.waMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center gap-1.5 whitespace-nowrap px-3.5 py-2 rounded-full text-xs font-semibold
                               bg-sky-500 text-white hover:bg-sky-600 active:scale-95
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2
                               transition-[transform,background-color,box-shadow] duration-200"
                  >
                    Vreau demo pentru clinica mea
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
                  </a>
                </div>
              </div>
            </motion.section>

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
                  className="rounded-full bg-[#f8fafc] text-emerald-800 hover:bg-[#ecfdf5] font-semibold shadow-sm"
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
