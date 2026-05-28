"use client"

import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, Globe, Zap, Stethoscope, Menu, X } from "lucide-react"

const serviciiDropdown = [
  {
    href: "/",
    icon: Globe,
    label: "Site-uri",
    desc: "Site-uri care aduc clienți",
  },
  {
    href: "/automatizari",
    icon: Zap,
    label: "Automatizări",
    desc: "Chatbot, WhatsApp, Email, Excel",
  },
  {
    href: "/#davix-dental",
    icon: Stethoscope,
    label: "Davix Dental",
    desc: "CRM stomatologic pentru clinici",
  },
]

const navItems = [
  { label: "Proiecte", href: "/proiecte" },
  { label: "Despre noi", href: "/despre-noi" },
  { label: "Davix Dental", anchor: "davix-dental" },
  { label: "FAQ", href: "/intrebari-frecvente" },
  { label: "Contact", anchor: "contact" },
]

export function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const getHref = (item: { href?: string; anchor?: string }) => {
    if (item.href) return item.href
    if (item.anchor) {
      return isHomePage ? `#${item.anchor}` : `/#${item.anchor}`
    }
    return "/"
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1rem)] max-w-6xl"
    >
      <nav className="relative flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-zinc-200 shadow-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden p-1">
            <img src="/davix-logo.png" alt="DaviX AI" className="w-full h-full object-contain" />
          </div>
          <span className="font-semibold text-zinc-900 text-sm sm:text-base">DaviX AI</span>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-0.5 relative">
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="relative flex items-center gap-1 px-3 py-1.5 text-sm text-zinc-700 hover:text-zinc-900 transition-colors rounded-full hover:bg-zinc-100"
            >
              Servicii
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-2xl bg-white border border-zinc-200 p-2 shadow-xl shadow-zinc-900/10"
                >
                  {serviciiDropdown.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50 transition-colors group"
                      >
                        <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
                          <Icon className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-zinc-900">{item.label}</div>
                          <div className="text-xs text-zinc-500">{item.desc}</div>
                        </div>
                      </Link>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navItems.map((item, index) => (
            <Link
              key={item.label}
              href={getHref(item)}
              className="relative px-3 py-1.5 text-sm text-zinc-700 hover:text-zinc-900 transition-colors"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === index && (
                <motion.div
                  layoutId="navbar-hover"
                  className="absolute inset-0 bg-zinc-100 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-full text-zinc-700 hover:bg-zinc-100 transition-colors"
          aria-label="Meniu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* WhatsApp Button (desktop) */}
        <div className="hidden md:flex items-center shrink-0">
          <Button
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-4 text-sm h-9 shadow-sm"
            asChild
          >
            <a href="https://wa.me/40729369094" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden absolute top-full left-0 right-0 mt-2 rounded-2xl bg-white border border-zinc-200 p-2 shadow-xl shadow-zinc-900/10"
          >
            {serviciiDropdown.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-emerald-50 transition-colors"
                >
                  <Icon className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium text-zinc-900">{item.label}</span>
                </Link>
              )
            })}
            <div className="h-px bg-zinc-200 my-1" />
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={getHref(item)}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-3 rounded-xl text-sm text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Button
              size="sm"
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full"
              asChild
            >
              <a href="https://wa.me/40729369094" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
