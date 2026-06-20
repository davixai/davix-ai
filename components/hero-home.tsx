"use client"

import { motion } from "framer-motion"
import { ArrowRight, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroHome() {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden">
      {/* Soft layered background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-200/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-100/60 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(16,24,40,0.08) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-emerald-200 mb-6 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" strokeWidth={1.8} />
              <span className="text-emerald-700 text-sm font-medium">
                Aplicații, site-uri și automatizări AI
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              style={{ letterSpacing: "-0.03em" }}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-zinc-900 leading-[1.05] mb-6 text-balance"
            >
              Aplicații, site-uri și{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-emerald-600">automatizări AI</span>
                <span className="absolute left-0 bottom-1 right-0 h-3 bg-emerald-200/70 -z-0 rounded" />
              </span>{" "}
              pentru afaceri care vor mai mulți clienți
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="text-lg text-zinc-600 mb-8 max-w-xl"
              style={{ lineHeight: "1.7" }}
            >
              Construim site-uri moderne, aplicații web custom și automatizări pentru SMS, email,
              WhatsApp și procese interne, ca afacerea ta să economisească timp și să primească mai
              multe cereri.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.26 }}
              className="flex flex-col sm:flex-row gap-3 mb-8"
            >
              <Button
                size="lg"
                className="shimmer-btn bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-7 h-12 shadow-lg shadow-emerald-600/20"
                asChild
              >
                <a href="#contact">
                  Programează audit gratuit
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-7 h-12 border-zinc-300 text-zinc-800 hover:bg-zinc-50 hover:text-zinc-900 bg-white"
                asChild
              >
                <a href="/proiecte">Vezi proiecte</a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.36 }}
              className="flex flex-wrap gap-x-5 gap-y-2"
            >
              {["Audit gratuit 15 min", "Fără costuri ascunse", "Livrare rapidă"].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 text-sm text-zinc-600">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={2.5} />
                  <span>{badge}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - realistic product preview */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="rounded-2xl overflow-hidden border border-zinc-200/80 bg-white card-elevated">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-zinc-50 border-b border-zinc-200">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="flex-1 mx-3 h-5 rounded bg-white border border-zinc-200 flex items-center gap-1 px-2">
                      <span className="text-emerald-600 text-[9px]">●</span>
                      <span className="text-[10px] text-zinc-500">davixai.website</span>
                    </div>
                  </div>

                  {/* App body */}
                  <div className="bg-white">
                    {/* Header bar */}
                    <div className="flex items-center justify-between px-4 pt-4 pb-3">
                      <div>
                        <p className="text-[11px] text-zinc-400 leading-none mb-1">Panou de control</p>
                        <p className="text-sm font-bold text-zinc-900 leading-none">Bună, Andrei 👋</p>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-medium text-emerald-700">Live</span>
                      </div>
                    </div>

                    {/* KPI cards */}
                    <div className="grid grid-cols-2 gap-2.5 px-4">
                      <div className="rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-3 text-white shadow-lg shadow-emerald-600/20">
                        <p className="text-[10px] text-emerald-100 mb-1">Cereri luna asta</p>
                        <p className="text-xl font-bold leading-none">128</p>
                        <p className="text-[9px] text-emerald-100 mt-1.5">↑ 34% vs. luna trecută</p>
                      </div>
                      <div className="rounded-xl bg-zinc-50 border border-zinc-100 p-3">
                        <p className="text-[10px] text-zinc-400 mb-1">Programări</p>
                        <p className="text-xl font-bold leading-none text-zinc-900">42</p>
                        <p className="text-[9px] text-emerald-600 mt-1.5">↑ 12 confirmate azi</p>
                      </div>
                    </div>

                    {/* Mini chart */}
                    <div className="mx-4 mt-2.5 rounded-xl border border-zinc-100 p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-medium text-zinc-600">Cereri noi</p>
                        <p className="text-[9px] text-zinc-400">ultimele 7 zile</p>
                      </div>
                      <div className="flex items-end gap-1.5 h-12">
                        {[40, 55, 35, 70, 50, 85, 100].map((h, i) => (
                          <div
                            key={i}
                            className={`flex-1 rounded-sm ${i === 6 ? "bg-emerald-500" : "bg-emerald-200"}`}
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Activity row */}
                    <div className="mx-4 my-3 flex items-center gap-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-2.5">
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                        SM
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium text-zinc-800 truncate">SMS reminder trimis</p>
                        <p className="text-[9px] text-zinc-500 truncate">14 pacienți · automat · acum 3 min</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating accent badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="absolute -left-5 bottom-10 hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-zinc-200 card-elevated"
                >
                  <Check className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
                  <span className="text-[11px] font-semibold text-zinc-800">Automatizare activă</span>
                </motion.div>

                <div className="absolute -inset-4 bg-emerald-300/30 rounded-3xl blur-2xl -z-10" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
