import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

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
    if (!name || !email || !bookingDate || !bookingTime) {
      return NextResponse.json(
        { error: "Numele, emailul, data și ora sunt obligatorii" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Insert booking into database
    const { data, error } = await supabase
      .from("bookings")
      .insert({
        name,
        email,
        phone: phone || null,
        message: message || null,
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

    // Send emails using Resend (if API key is available)
    const resendApiKey = process.env.RESEND_API_KEY
    
    if (resendApiKey) {
      const adminEmail = "davixai.contact@gmail.com"
      const senderEmail = "contact@davixai.website"
      const formattedDate = new Date(bookingDate).toLocaleDateString("ro-RO", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })

      // Email to admin
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: `DaviX AI <${senderEmail}>`,
            to: adminEmail,
            subject: `Programare nouă - ${name}`,
            html: `
              <h2>Programare nouă primită</h2>
              <p><strong>Nume:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Telefon:</strong> ${phone || "Nespecificat"}</p>
              <p><strong>Data:</strong> ${formattedDate}</p>
              <p><strong>Ora:</strong> ${bookingTime}</p>
              <p><strong>Mesaj:</strong> ${message || "Fără mesaj"}</p>
              <hr>
              <p>Programarea așteaptă confirmare.</p>
            `,
          }),
        })
      } catch (emailError) {
        console.error("Error sending admin email:", emailError)
      }

      // Email to client
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: `DaviX AI <${senderEmail}>`,
            to: email,
            subject: "Confirmare programare - DaviX AI",
            html: `
              <h2>Mulțumim pentru programare!</h2>
              <p>Bună ${name},</p>
              <p>Am primit cererea ta de programare și o vom confirma în curând.</p>
              <h3>Detalii programare:</h3>
              <p><strong>Data:</strong> ${formattedDate}</p>
              <p><strong>Ora:</strong> ${bookingTime}</p>
              ${message ? `<p><strong>Mesajul tău:</strong> ${message}</p>` : ""}
              <hr>
              <p>Te vom contacta pentru confirmare.</p>
              <p>Cu stimă,<br>Echipa DaviX AI</p>
              <p><a href="https://wa.me/40729369094">WhatsApp: 0729 369 094</a></p>
            `,
          }),
        })
      } catch (emailError) {
        console.error("Error sending client email:", emailError)
      }
    }

    return NextResponse.json({
      success: true,
      message: "Programarea a fost înregistrată cu succes!",
      booking: data,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { error: "Eroare internă a serverului" },
      { status: 500 }
    )
  }
}
