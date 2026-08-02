import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// Supabase's free tier pauses a project after 7 days with zero API activity.
// Real site traffic already pings it (the contact form's calendar does a GET
// on load), but this cron is a backstop for slow weeks. Vercel calls this
// on a schedule (see vercel.json) with a bearer token it injects automatically
// when CRON_SECRET is set on the project.
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization")
  const cronSecret = process.env.CRON_SECRET

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const supabase = await createClient()
    // The anon role only has SELECT granted on these columns (see
    // scripts/001_create_bookings.sql) — matches what the public
    // availability calendar reads.
    const { error } = await supabase.from("bookings").select("status").limit(1)

    if (error) {
      console.error("Keep-alive ping failed:", error)
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, pingedAt: new Date().toISOString() })
  } catch (error) {
    console.error("Keep-alive ping error:", error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
