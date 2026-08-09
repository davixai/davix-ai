"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"

export default function SiteUriHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-28 pb-12 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-100/60 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-700 text-sm font-medium">
                Site-uri pentru business-uri locale
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ letterSpacing: "-0.03em" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 leading-[1.05] mb-6 text-balance"
            >
              Site-uri de prezentare care îți{" "}
              <span className="text-emerald-600">aduc clienți</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-zinc-600 mb-8 max-w-xl"
              style={{ lineHeight: "1.7" }}
            >
              Design modern, livrare rapidă, optimizat pentru business-uri locale.{" "}
              <span className="text-zinc-900 font-medium">De la 700 lei.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 mb-8"
            >
              <Button
                size="lg"
                className="shimmer-btn bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-7 h-12 shadow-lg shadow-emerald-600/20"
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
                className="rounded-full px-7 h-12 border-zinc-300 text-zinc-800 hover:bg-zinc-50 bg-white"
                asChild
              >
                <a href="/#contact">Programează audit gratuit</a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              {["Hosting inclus", "Fără costuri ascunse", "Garanție satisfacție"].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 text-sm text-zinc-600">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={2.5} />
                  <span>{badge}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="rounded-2xl overflow-hidden border border-zinc-200 bg-white card-elevated">
                  <div className="flex items-center gap-2 px-4 py-3 bg-zinc-50 border-b border-zinc-200">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="flex-1 mx-3 h-5 rounded bg-white border border-zinc-200 flex items-center px-3">
                      <span className="text-[10px] text-zinc-400">davixai.website</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3 bg-white">
                    <div className="h-28 rounded-xl bg-gradient-to-br from-emerald-50 to-white border border-zinc-100 p-4 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="h-3 w-3/4 rounded bg-zinc-200" />
                        <div className="h-2 w-1/2 rounded bg-zinc-100" />
                      </div>
                      <div className="flex gap-2">
                        <div className="h-6 w-20 rounded-full bg-emerald-500" />
                        <div className="h-6 w-16 rounded-full bg-zinc-100" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-14 rounded-lg bg-zinc-50 border border-zinc-100 p-2 space-y-1">
                          <div className="h-2 w-1/2 rounded bg-emerald-400/60" />
                          <div className="h-1.5 w-full rounded bg-zinc-200" />
                          <div className="h-1.5 w-3/4 rounded bg-zinc-200" />
                        </div>
                      ))}
                    </div>
                    <div className="h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                      <div className="h-2 w-28 rounded bg-emerald-500/60" />
                    </div>
                  </div>
                </div>

                <div className="absolute -inset-4 bg-emerald-200/30 rounded-3xl blur-2xl -z-10" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
