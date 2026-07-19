import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

type ResendPayload = {
  from: string
  to: string
  subject: string
  html: string
  reply_to?: string
}

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character]!,
  )

async function sendEmail(
  apiKey: string,
  payload: ResendPayload,
  idempotencyKey: string,
) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(payload),
  })

  const responseBody = await response.text()

  if (!response.ok) {
    throw new Error(
      `Resend request failed (${response.status}): ${responseBody.slice(0, 500)}`,
    )
  }

  return responseBody ? JSON.parse(responseBody) : null
}

// GET existing bookings to show unavailable slots
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const month = searchParams.get("month") // format: YYYY-MM
    
    const supabase = await createClient()
    
    let query = supabase
      .from("bookings")
      .select("booking_date, booking_time, status")
      .in("status", ["pending", "confirmed"])
    
    if (month) {
      const startDate = `${month}-01`
      const endDate = `${month}-31`
      query = query.gte("booking_date", startDate).lte("booking_date", endDate)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error("Supabase error:", error)
      // Return empty bookings instead of error so calendar still works
      return NextResponse.json({ bookings: [] })
    }
    
    return NextResponse.json({ bookings: data || [] })
  } catch (error) {
    console.error("API error:", error)
    // Return empty bookings instead of error so calendar still works
    return NextResponse.json({ bookings: [] })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message, bookingDate, bookingTime } = body

    // Validate required fields
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof bookingDate !== "string" ||
      typeof bookingTime !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !/^\d{4}-\d{2}-\d{2}$/.test(bookingDate) ||
      !/^\d{2}:\d{2}$/.test(bookingTime)
    ) {
      return NextResponse.json(
        { error: "Numele, emailul, data și ora sunt obligatorii sau au un format invalid." },
        { status: 400 }
      )
    }

    const normalizedName = name.trim().slice(0, 120)
    const normalizedEmail = email.trim().toLowerCase().slice(0, 254)
    const normalizedPhone = typeof phone === "string" ? phone.trim().slice(0, 40) : ""
    const normalizedMessage = typeof message === "string" ? message.trim().slice(0, 3000) : ""

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return NextResponse.json({ error: "Adresa de email nu este validă." }, { status: 400 })
    }

    const supabase = await createClient()

    // Insert booking into database
    const { data, error } = await supabase
      .from("bookings")
      .insert({
        name: normalizedName,
        email: normalizedEmail,
        phone: normalizedPhone || null,
        message: normalizedMessage || null,
        booking_date: bookingDate,
        booking_time: bookingTime,
        status: "pending",
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Eroare la salvarea programării" },
        { status: 500 }
      )
    }

    // Send emails using Resend and surface delivery problems instead of silently
    // reporting success. The booking remains saved so the lead is not lost.
    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not configured")
      return NextResponse.json(
        {
          error: "Programarea a fost salvată, dar notificarea email nu a putut fi trimisă.",
          bookingSaved: true,
        },
        { status: 503 },
      )
    }

    const adminEmail = process.env.BOOKINGS_ADMIN_EMAIL || "davixai.contact@gmail.com"
    const senderEmail = process.env.RESEND_FROM_EMAIL || "contact@davixai.website"
    const safeName = escapeHtml(normalizedName)
    const safeEmail = escapeHtml(normalizedEmail)
    const safePhone = escapeHtml(normalizedPhone || "Nespecificat")
    const safeMessage = escapeHtml(normalizedMessage || "Fără mesaj").replace(/\n/g, "<br>")
    const safeBookingTime = escapeHtml(bookingTime)
    const formattedDate = new Date(`${bookingDate}T12:00:00Z`).toLocaleDateString("ro-RO", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })

    const [adminResult, clientResult] = await Promise.allSettled([
      sendEmail(
        resendApiKey,
        {
          from: `DaviX AI <${senderEmail}>`,
          to: adminEmail,
          reply_to: normalizedEmail,
          subject: `Programare nouă - ${normalizedName}`,
          html: `
            <h2>Programare nouă primită</h2>
            <p><strong>Nume:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Telefon:</strong> ${safePhone}</p>
            <p><strong>Data:</strong> ${formattedDate}</p>
            <p><strong>Ora:</strong> ${safeBookingTime}</p>
            <p><strong>Mesaj:</strong> ${safeMessage}</p>
            <hr>
            <p>Programarea așteaptă confirmare.</p>
          `,
        },
        `booking-${data.id}-admin`,
      ),
      sendEmail(
        resendApiKey,
        {
          from: `DaviX AI <${senderEmail}>`,
          to: normalizedEmail,
          subject: "Confirmare programare - DaviX AI",
          html: `
            <h2>Mulțumim pentru programare!</h2>
            <p>Bună ${safeName},</p>
            <p>Am primit cererea ta de programare și o vom confirma în curând.</p>
            <h3>Detalii programare:</h3>
            <p><strong>Data:</strong> ${formattedDate}</p>
            <p><strong>Ora:</strong> ${safeBookingTime}</p>
            ${normalizedMessage ? `<p><strong>Mesajul tău:</strong> ${safeMessage}</p>` : ""}
            <hr>
            <p>Te vom contacta pentru confirmare.</p>
            <p>Cu stimă,<br>Echipa DaviX AI</p>
            <p><a href="https://wa.me/40729369094">WhatsApp: 0729 369 094</a></p>
          `,
        },
        `booking-${data.id}-client`,
      ),
    ])

    if (adminResult.status === "rejected") {
      console.error("Error sending admin email:", adminResult.reason)
      if (clientResult.status === "rejected") {
        console.error("Error sending client email:", clientResult.reason)
      }

      return NextResponse.json(
        {
          error: "Programarea a fost salvată, dar notificarea email nu a putut fi trimisă.",
          bookingSaved: true,
        },
        { status: 502 },
      )
    }

    if (clientResult.status === "rejected") {
      console.error("Error sending client email:", clientResult.reason)
    }

    return NextResponse.json({
      success: true,
      message: "Programarea a fost înregistrată cu succes!",
      booking: data,
      confirmationEmailSent: clientResult.status === "fulfilled",
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { error: "Eroare internă a serverului" },
      { status: 500 }
    )
  }
}
