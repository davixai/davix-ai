"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"

export default function SiteUriHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left - 60% */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-400 text-sm font-medium">Site-uri pentru business-uri locale</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-balance"
            >
              Site-uri de prezentare care îți{" "}
              <span className="text-emerald-400">aduc clienți</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-zinc-400 mb-8 max-w-xl leading-relaxed"
            >
              Design modern, livrare rapidă, optimizat pentru business-uri locale.{" "}
              <span className="text-white font-medium">De la 300€.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 mb-8"
            >
              <Button
                size="lg"
                className="shimmer-btn bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8"
                asChild
              >
                <a href="#pachete">
                  Vezi pachetele
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800"
                asChild
              >
                <a href="https://wa.me/40729369094" target="_blank" rel="noopener noreferrer">
                  Discuta cu noi
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              {["Hosting inclus", "Fara costuri ascunse", "Garantie satisfactie"].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 text-sm text-zinc-400">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{badge}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - 40% - Browser mockup */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              {/* Floating animation wrapper */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Browser frame */}
                <div className="rounded-2xl overflow-hidden border border-zinc-700 bg-zinc-900 shadow-2xl shadow-emerald-500/5">
                  {/* Browser bar */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800 border-b border-zinc-700">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/70" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                    </div>
                    <div className="flex-1 mx-3 h-6 rounded bg-zinc-700 flex items-center px-3">
                      <span className="text-xs text-zinc-500">davixai.website</span>
                    </div>
                  </div>

                  {/* Mock website content */}
                  <div className="p-5 space-y-3 bg-zinc-900">
                    {/* Hero mock */}
                    <div className="h-28 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 p-4 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="h-3 w-3/4 rounded bg-zinc-600" />
                        <div className="h-2 w-1/2 rounded bg-zinc-700" />
                      </div>
                      <div className="flex gap-2">
                        <div className="h-6 w-20 rounded-full bg-emerald-500/50" />
                        <div className="h-6 w-16 rounded-full bg-zinc-700" />
                      </div>
                    </div>
                    {/* Cards mock */}
                    <div className="grid grid-cols-3 gap-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-14 rounded-lg bg-zinc-800 border border-zinc-700 p-2 space-y-1">
                          <div className="h-2 w-1/2 rounded bg-emerald-500/30" />
                          <div className="h-1.5 w-full rounded bg-zinc-700" />
                          <div className="h-1.5 w-3/4 rounded bg-zinc-700" />
                        </div>
                      ))}
                    </div>
                    {/* CTA mock */}
                    <div className="h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                      <div className="h-2 w-28 rounded bg-emerald-500/50" />
                    </div>
                  </div>
                </div>

                {/* Glow */}
                <div className="absolute -inset-4 bg-emerald-500/5 rounded-3xl blur-2xl -z-10" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
