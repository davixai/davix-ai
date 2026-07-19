"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00",
  "17:00", "18:00", "19:00", "20:00", "21:00", "22:00",
]

interface BookedSlot {
  booking_date: string
  booking_time: string
  status: string
}

const getLocalDateKey = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const auditBullets = [
  "Identificăm ce poate fi automatizat",
  "Verificăm dacă ai nevoie de site, aplicație sau automatizare",
  "Discutăm despre SMS reminder/review, email, WhatsApp sau CRM",
  "Primești o estimare de cost și timp",
]

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" })
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "partial" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([])

  useEffect(() => {
    const fetchBookedSlots = async () => {
      const year = currentMonth.getFullYear()
      const month = String(currentMonth.getMonth() + 1).padStart(2, "0")
      try {
        const response = await fetch(`/api/bookings?month=${year}-${month}`)
        const data = await response.json()
        if (data.bookings) setBookedSlots(data.bookings)
      } catch (error) {
        console.error("Error fetching booked slots:", error)
      }
    }
    fetchBookedSlots()
  }, [currentMonth, submitStatus])

  const isTimeSlotBooked = (date: Date, time: string) => {
    const dateStr = getLocalDateKey(date)
    return bookedSlots.some((slot) => {
      const slotTime = slot.booking_time?.substring(0, 5)
      return slot.booking_date === dateStr && slotTime === time
    })
  }

  const isDateFullyBooked = (date: Date) => {
    const dateStr = getLocalDateKey(date)
    const bookedTimesForDate = bookedSlots.filter((slot) => slot.booking_date === dateStr)
    return bookedTimesForDate.length >= timeSlots.length
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: (Date | null)[] = []
    for (let i = 0; i < (startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1); i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const formatDate = (date: Date) =>
    date.toLocaleDateString("ro-RO", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) {
      alert("Te rugăm să selectezi o dată și o oră pentru programare.")
      return
    }
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setSubmitMessage("")
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          bookingDate: getLocalDateKey(selectedDate),
          bookingTime: selectedTime,
        }),
      })
      const data = await response.json().catch(() => ({}))
      if (response.ok) {
        setSubmitStatus("success")
        setSubmitMessage(data.message || "Programarea a fost înregistrată cu succes!")
        setFormData({ name: "", email: "", phone: "", message: "" })
        setSelectedDate(null)
        setSelectedTime(null)
      } else if (data.bookingSaved) {
        setSubmitStatus("partial")
        setSubmitMessage(
          data.error || "Programarea a fost salvată, dar confirmarea email nu a putut fi trimisă.",
        )
        setFormData({ name: "", email: "", phone: "", message: "" })
        setSelectedDate(null)
        setSelectedTime(null)
      } else {
        setSubmitStatus("error")
        setSubmitMessage(data.error || "A apărut o eroare. Te rugăm să încerci din nou.")
        console.error("Booking error:", data.error)
      }
    } catch (error) {
      setSubmitStatus("error")
      setSubmitMessage("Nu am putut contacta serverul. Te rugăm să încerci din nou.")
      console.error("Submit error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const days = getDaysInMonth(currentMonth)
  const monthNames = [
    "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
    "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie",
  ]
  const dayNames = ["Lu", "Ma", "Mi", "Jo", "Vi", "Sâ", "Du"]

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 bg-transparent">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto"
      >
        {/* Audit explainer */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-700 text-sm font-medium">Audit gratuit 15 min</span>
          </div>
          <h2
            style={{ letterSpacing: "-0.025em" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-5 text-balance"
          >
            Programează audit gratuit
          </h2>
          <p
            className="text-zinc-600 max-w-2xl mx-auto mb-8"
            style={{ lineHeight: "1.7" }}
          >
            În auditul gratuit vedem ce procese poți automatiza, unde pierzi timp sau clienți și ce
            soluție se potrivește cel mai bine afacerii tale.
          </p>

          <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-2">
            {auditBullets.map((b) => (
              <div key={b} className="flex items-start gap-2 text-sm text-zinc-700 text-left">
                <Check className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" strokeWidth={2.5} />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-zinc-200 card-elevated">
              <h3 className="text-lg font-semibold text-zinc-900 mb-4">Informații de contact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                    <Phone className="w-5 h-5 text-emerald-600" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs">Telefon</p>
                    <a href="tel:0729369094" className="text-zinc-900 hover:text-emerald-700 transition-colors">
                      0729 369 094
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                    <Mail className="w-5 h-5 text-emerald-600" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs">Email</p>
                    <a
                      href="mailto:contact@davixai.website"
                      className="text-zinc-900 hover:text-emerald-700 transition-colors text-sm"
                    >
                      contact@davixai.website
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                    <MapPin className="w-5 h-5 text-emerald-600" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs">Locație</p>
                    <p className="text-zinc-900">Suceava, România</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-zinc-200 card-elevated">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-glow" />
                <span className="text-sm text-zinc-600">Disponibil acum</span>
              </div>
              <p className="text-zinc-900 font-medium">Balta David</p>
              <p className="text-zinc-500 text-sm">Fondator DaviX AI</p>
            </div>

            <Button
              variant="outline"
              className="w-full rounded-full border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-white"
              asChild
            >
              <a href="https://wa.me/40729369094" target="_blank" rel="noopener noreferrer">
                Scrie pe WhatsApp
              </a>
            </Button>

            {(selectedDate || selectedTime) && (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <h4 className="text-emerald-800 font-medium mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Programare selectată
                </h4>
                {selectedDate && <p className="text-zinc-900 text-sm mb-1">{formatDate(selectedDate)}</p>}
                {selectedTime && (
                  <p className="text-zinc-600 text-sm flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Ora: {selectedTime}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Calendar */}
          <div className="p-5 rounded-2xl bg-white border border-zinc-200 card-elevated">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 mb-4">
              <p className="text-emerald-800 text-sm font-medium text-center">
                Alege o oră pentru auditul gratuit (15 min)
              </p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() =>
                  setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
                }
                className="p-2 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-500 hover:text-zinc-900"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-zinc-900 font-semibold">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <button
                type="button"
                onClick={() =>
                  setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
                }
                className="p-2 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-500 hover:text-zinc-900"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-xs text-zinc-400 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((date, index) => {
                const isFullyBooked = Boolean(date && isDateFullyBooked(date))
                const isDisabled = !date || isDateDisabled(date) || isFullyBooked

                return (
                  <button
                    key={index}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => date && !isDisabled && setSelectedDate(date)}
                    className={`
                      aspect-square flex items-center justify-center text-sm rounded-lg transition-all relative
                      ${!date ? "invisible" : ""}
                      ${date && isDateDisabled(date) ? "text-zinc-300 cursor-not-allowed" : ""}
                      ${isFullyBooked ? "text-zinc-300 cursor-not-allowed line-through" : ""}
                      ${date && !isDisabled ? "text-zinc-700 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer" : ""}
                      ${
                        date && selectedDate && date.toDateString() === selectedDate.toDateString()
                          ? "bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white"
                          : ""
                      }
                    `}
                  >
                    {date?.getDate()}
                    {isFullyBooked && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-400" />
                    )}
                  </button>
                )
              })}
            </div>

            <div className="mt-6">
              <h4 className="text-sm text-zinc-700 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Selectează ora
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => {
                  const isBooked = selectedDate && isTimeSlotBooked(selectedDate, time)
                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={!!isBooked}
                      onClick={() => !isBooked && setSelectedTime(time)}
                      className={`
                        py-2 px-3 text-sm rounded-lg transition-all
                        ${
                          isBooked
                            ? "bg-zinc-50 text-zinc-300 cursor-not-allowed line-through"
                            : selectedTime === time
                              ? "bg-emerald-600 text-white"
                              : "bg-zinc-50 text-zinc-700 hover:bg-emerald-50 hover:text-emerald-700"
                        }
                      `}
                    >
                      {time}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="p-5 rounded-2xl bg-white border border-zinc-200 space-y-4 card-elevated"
          >
            <div>
              <label htmlFor="name" className="block text-sm text-zinc-700 mb-2">
                Nume *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white border border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Numele tău"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-zinc-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white border border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="email@exemplu.com"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm text-zinc-700 mb-2">
                Telefon
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white border border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="07XX XXX XXX"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-zinc-700 mb-2">
                Mesaj
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white border border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                placeholder="Descrie pe scurt ce ai nevoie..."
              />
            </div>

            {submitStatus === "success" && (
              <div aria-live="polite" className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600" />
                <p className="text-emerald-800 text-sm">{submitMessage}</p>
              </div>
            )}

            {submitStatus === "partial" && (
              <div aria-live="polite" className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <p className="text-amber-800 text-sm">{submitMessage}</p>
              </div>
            )}

            {submitStatus === "error" && (
              <div role="alert" className="p-3 rounded-xl bg-red-50 border border-red-200">
                <p className="text-red-700 text-sm">{submitMessage}</p>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting || !selectedDate || !selectedTime}
              className="shimmer-btn w-full bg-emerald-600 text-white hover:bg-emerald-700 rounded-full h-12 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                "Se trimite..."
              ) : (
                <>
                  Programează audit gratuit
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </motion.div>
    </section>
  )
}
