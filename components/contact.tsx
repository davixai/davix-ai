"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ArrowRight, Phone, Mail, MapPin, Calendar, Clock, Check, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
]

interface BookedSlot {
  booking_date: string
  booking_time: string
  status: string
}

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([])

  // Fetch booked slots when month changes
  useEffect(() => {
    const fetchBookedSlots = async () => {
      const year = currentMonth.getFullYear()
      const month = String(currentMonth.getMonth() + 1).padStart(2, "0")
      try {
        const response = await fetch(`/api/bookings?month=${year}-${month}`)
        const data = await response.json()
        if (data.bookings) {
          setBookedSlots(data.bookings)
        }
      } catch (error) {
        console.error("Error fetching booked slots:", error)
      }
    }
    fetchBookedSlots()
  }, [currentMonth, submitStatus])

  // Check if a specific time slot is booked for a date
  const isTimeSlotBooked = (date: Date, time: string) => {
    const dateStr = date.toISOString().split("T")[0]
    const isBooked = bookedSlots.some(
      (slot) => {
        const slotTime = slot.booking_time?.substring(0, 5) // Handle "09:00:00" -> "09:00"
        return slot.booking_date === dateStr && slotTime === time
      }
    )
    return isBooked
  }

  // Check if all time slots are booked for a date
  const isDateFullyBooked = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
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
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < (startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1); i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today // Disable only past dates
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ro-RO", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedDate || !selectedTime) {
      alert("Te rugăm să selectezi o dată și o oră pentru programare.")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          bookingDate: selectedDate.toISOString().split("T")[0],
          bookingTime: selectedTime,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        // Reset form
        setFormData({ name: "", email: "", phone: "", message: "" })
        setSelectedDate(null)
        setSelectedTime(null)
      } else {
        setSubmitStatus("error")
        console.error("Booking error:", data.error)
      }
    } catch (error) {
      setSubmitStatus("error")
      console.error("Submit error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const days = getDaysInMonth(currentMonth)
  const monthNames = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"]
  const dayNames = ["Lu", "Ma", "Mi", "Jo", "Vi", "Sâ", "Du"]

  return (
    <section id="contact" className="py-14 px-4">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-cal-sans)" }}
          >
            Programează o discuție
          </h2>
          <p className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            Alege o dată și o oră convenabilă pentru un audit gratuit al proceselor tale de business.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-4">Informatii de contact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-zinc-800">
                    <Phone className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-sm">Telefon</p>
                    <a href="tel:0729369094" className="text-white hover:text-zinc-300 transition-colors">
                      0729 369 094
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-zinc-800">
                    <Mail className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-sm">Email</p>
                    <a href="mailto:contact@davixai.website" className="text-white hover:text-zinc-300 transition-colors text-sm">
                      contact@davixai.website
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-zinc-800">
                    <MapPin className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-sm">Locatie</p>
                    <p className="text-white">Suceava, Romania</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-glow" />
                <span className="text-sm text-zinc-400">Disponibil acum</span>
              </div>
              <p className="text-white font-medium">Balta David</p>
              <p className="text-zinc-500 text-sm">Fondator DaviX AI</p>
            </div>

            {/* Selected Date/Time Summary */}
            {(selectedDate || selectedTime) && (
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                <h4 className="text-emerald-400 font-medium mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Programare selectata
                </h4>
                {selectedDate && (
                  <p className="text-white text-sm mb-1">{formatDate(selectedDate)}</p>
                )}
                {selectedTime && (
                  <p className="text-zinc-400 text-sm flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Ora: {selectedTime}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Calendar */}
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <p className="text-emerald-400 text-sm font-medium text-center">
                Vă rugăm să selectați o oră din Calendar pentru Audit gratuit
              </p>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-2 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-white font-semibold">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <button
                type="button"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-2 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Day names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-xs text-zinc-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((date, index) => {
                const isFullyBooked = date && isDateFullyBooked(date)
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
                      ${date && isDateDisabled(date) ? "text-zinc-700 cursor-not-allowed" : ""}
                      ${isFullyBooked ? "text-zinc-600 cursor-not-allowed line-through" : ""}
                      ${date && !isDisabled ? "text-zinc-300 hover:bg-zinc-800 cursor-pointer" : ""}
                      ${date && selectedDate && date.toDateString() === selectedDate.toDateString() 
                        ? "bg-emerald-500 text-white hover:bg-emerald-600" 
                        : ""}
                    `}
                  >
                    {date?.getDate()}
                    {isFullyBooked && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-500" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Time slots */}
            <div className="mt-6">
              <h4 className="text-sm text-zinc-400 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Selecteaza ora
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => {
                  const isBooked = selectedDate && isTimeSlotBooked(selectedDate, time)
                  
                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={isBooked}
                      onClick={() => !isBooked && setSelectedTime(time)}
                      className={`
                        py-2 px-3 text-sm rounded-lg transition-all
                        ${isBooked 
                          ? "bg-zinc-800/50 text-zinc-600 cursor-not-allowed line-through" 
                          : selectedTime === time 
                            ? "bg-emerald-500 text-white" 
                            : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"}
                      `}
                    >
                      {time}
                      {isBooked && <span className="ml-1 text-xs text-red-400">(ocupat)</span>}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm text-zinc-400 mb-2">
                Nume *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                placeholder="Numele tau"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-zinc-400 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                placeholder="email@exemplu.com"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm text-zinc-400 mb-2">
                Telefon
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                placeholder="07XX XXX XXX"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-zinc-400 mb-2">
                Mesaj
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors resize-none"
                placeholder="Descrie pe scurt ce ai nevoie..."
              />
            </div>

            {submitStatus === "success" && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-400" />
                <p className="text-emerald-400 text-sm">Programarea a fost inregistrata cu succes!</p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30">
                <p className="text-red-400 text-sm">A aparut o eroare. Te rugam sa incerci din nou.</p>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting || !selectedDate || !selectedTime}
              className="shimmer-btn w-full bg-white text-zinc-950 hover:bg-zinc-200 rounded-full h-12 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                "Se trimite..."
              ) : (
                <>
                  Programeaza acum
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
