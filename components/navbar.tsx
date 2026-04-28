"use client"

import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, Globe, Zap } from "lucide-react"

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
]

const navItems = [
  { label: "Testimoniale", href: "/testimoniale" },
  { label: "FAQ", href: "/intrebari-frecvente" },
  { label: "Contact", anchor: "contact" },
]

export function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const isHomePage = pathname === "/" || pathname === "/automatizari"

  // Close dropdown on outside click
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
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1rem)] max-w-3xl"
    >
      <nav className="relative flex items-center justify-between px-2 sm:px-4 py-2 sm:py-3 rounded-full bg-zinc-900/40 backdrop-blur-md border border-zinc-800">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 sm:gap-2 shrink-0">
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center overflow-hidden p-1">
            <img src="/davix-logo.png" alt="DaviX AI" className="w-full h-full object-contain" />
          </div>
          <span className="font-semibold text-white text-xs sm:text-base">DaviX AI</span>
        </Link>

        {/* Nav Items */}
        <div className="flex items-center gap-0.5 sm:gap-1 relative">
          {/* Servicii Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="relative flex items-center gap-1 px-1.5 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-sm text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-800"
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
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-60 rounded-2xl bg-zinc-900 border border-zinc-800 p-2 shadow-2xl shadow-black/40"
                >
                  {serviciiDropdown.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-800 transition-colors group"
                      >
                        <div className="p-1.5 rounded-lg bg-zinc-800 group-hover:bg-zinc-700 transition-colors">
                          <Icon className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{item.label}</div>
                          <div className="text-xs text-zinc-500">{item.desc}</div>
                        </div>
                      </Link>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Rest of nav items */}
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              href={getHref(item)}
              className="relative px-1.5 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-sm text-zinc-400 hover:text-white transition-colors"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === index && (
                <motion.div
                  layoutId="navbar-hover"
                  className="absolute inset-0 bg-zinc-800 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* WhatsApp Button */}
        <div className="flex items-center shrink-0">
          <Button
            size="sm"
            className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-2 sm:px-4 text-[10px] sm:text-sm h-7 sm:h-9"
            asChild
          >
            <a href="https://wa.me/40729369094" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </Button>
        </div>
      </nav>
    </motion.header>
  )
}
