// ============================================================================
// POST /api/lead
// Primește cererea de ofertă din calculator: datele de contact + toate
// selecțiile făcute.
//
// Ce face acum:
//   · validează payload-ul (zod)
//   · loghează lead-ul pe server
//
// Ce e deja pregătit, activat prin variabile de mediu:
//   · RESEND_API_KEY    → trimite email către admin (și confirmare clientului)
//   · LEAD_WEBHOOK_URL  → POST către n8n / Zapier / Google Apps Script (Sheets)
// Dacă nu e configurat nimic, cererea reușește și lead-ul rămâne în loguri.
// ============================================================================

import { NextResponse } from "next/server"
import { z } from "zod"

export const runtime = "nodejs"

const leadSchema = z.object({
  name: z.string().trim().min(2, "Numele este prea scurt.").max(120),
  phone: z
    .string()
    .trim()
    .min(9, "Numărul de telefon pare incomplet.")
    .max(40)
    .refine((value) => value.replace(/\D/g, "").length >= 9, "Numărul de telefon pare incomplet."),
  email: z.string().trim().email("Adresa de email nu este validă.").max(254),
  company: z.string().trim().max(160).optional().default(""),
  city: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().max(1500).optional().default(""),
  /** Toate selecțiile din calculator, exact cum au fost făcute. */
  selections: z.record(z.string(), z.unknown()).optional().default({}),
  /** Aceleași selecții, în format citibil — merge direct în email. */
  summary: z.string().max(4000).optional().default(""),
  estimate: z
    .object({
      oneTimeMin: z.number().optional(),
      oneTimeMax: z.number().optional(),
      monthly: z.number().optional(),
      timeline: z.string().max(80).optional(),
      savings: z
        .object({ hoursPerMonth: z.number(), moneyPerMonth: z.number() })
        .nullable()
        .optional(),
    })
    .optional(),
})

type Lead = z.infer<typeof leadSchema>

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]!,
  )

// ----------------------------------------------------------------------------
// Email prin Resend (opțional)
// ----------------------------------------------------------------------------
async function sendEmails(lead: Lead, referenceId: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return "skipped" as const

  const adminEmail = process.env.LEAD_ADMIN_EMAIL || "davixai.contact@gmail.com"
  const senderEmail = process.env.RESEND_FROM_EMAIL || "contact@davixai.website"

  const priceLine =
    lead.estimate?.oneTimeMin !== undefined && lead.estimate?.oneTimeMax !== undefined
      ? `${lead.estimate.oneTimeMin} – ${lead.estimate.oneTimeMax} lei`
      : "necalculat"

  const summaryHtml = escapeHtml(lead.summary).replace(/\n/g, "<br>")

  const post = (payload: Record<string, unknown>, idempotencyKey: string) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify(payload),
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error(`Resend ${response.status}: ${(await response.text()).slice(0, 300)}`)
      }
    })

  const results = await Promise.allSettled([
    post(
      {
        from: `DaviX AI <${senderEmail}>`,
        to: adminEmail,
        reply_to: lead.email,
        subject: `Cerere ofertă — ${lead.name} (${priceLine})`,
        html: `
          <h2>Cerere de ofertă din calculator</h2>
          <p><strong>Nume:</strong> ${escapeHtml(lead.name)}</p>
          <p><strong>Telefon:</strong> ${escapeHtml(lead.phone)}</p>
          <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
          <p><strong>Firmă:</strong> ${escapeHtml(lead.company || "—")}</p>
          <p><strong>Oraș:</strong> ${escapeHtml(lead.city || "—")}</p>
          <p><strong>Mesaj:</strong> ${escapeHtml(lead.message || "—")}</p>
          <hr>
          <pre style="font-family:ui-monospace,monospace;font-size:13px;white-space:pre-wrap">${summaryHtml}</pre>
          <p style="color:#6b7280;font-size:12px">Referință: ${referenceId}</p>
        `,
      },
      `lead-${referenceId}-admin`,
    ),
    post(
      {
        from: `DaviX AI <${senderEmail}>`,
        to: lead.email,
        subject: "Am primit cererea ta — DaviX AI",
        html: `
          <h2>Mulțumim, ${escapeHtml(lead.name)}!</h2>
          <p>Am primit cererea ta de ofertă. Îți răspundem în maximum 24 de ore lucrătoare.</p>
          <h3>Estimarea ta</h3>
          <pre style="font-family:ui-monospace,monospace;font-size:13px;white-space:pre-wrap">${summaryHtml}</pre>
          <p><em>Estimare orientativă. Prețul final se stabilește după o discuție de 15 minute.</em></p>
          <hr>
          <p>Echipa DaviX AI · <a href="https://wa.me/40729369094">0729 369 094</a></p>
        `,
      },
      `lead-${referenceId}-client`,
    ),
  ])

  // Contează doar emailul către admin — fără el, lead-ul chiar se pierde.
  if (results[0].status === "rejected") {
    console.error("[lead] email admin eșuat:", results[0].reason)
    return "failed" as const
  }
  if (results[1].status === "rejected") {
    console.error("[lead] email client eșuat:", results[1].reason)
  }
  return "sent" as const
}

// ----------------------------------------------------------------------------
// Webhook (n8n / Zapier / Google Sheets prin Apps Script) — opțional
// ----------------------------------------------------------------------------
async function forwardToWebhook(lead: Lead, referenceId: string) {
  const url = process.env.LEAD_WEBHOOK_URL
  if (!url) return "skipped" as const

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ referenceId, receivedAt: new Date().toISOString(), ...lead }),
    })
    if (!response.ok) throw new Error(`Webhook ${response.status}`)
    return "sent" as const
  } catch (error) {
    console.error("[lead] webhook eșuat:", error)
    return "failed" as const
  }
}

// ----------------------------------------------------------------------------
export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: "Corpul cererii nu este JSON valid." }, { status: 400 })
  }

  const parsed = leadSchema.safeParse(payload)
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]
    return NextResponse.json(
      { error: firstIssue?.message ?? "Datele trimise nu sunt valide.", field: firstIssue?.path?.[0] },
      { status: 400 },
    )
  }

  const lead = parsed.data
  const referenceId = crypto.randomUUID()

  // Lead-ul ajunge întotdeauna în loguri, indiferent de integrări.
  console.info("[lead] cerere nouă", {
    referenceId,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    company: lead.company,
    city: lead.city,
    estimate: lead.estimate,
    selections: lead.selections,
  })

  const [emailStatus, webhookStatus] = await Promise.all([
    sendEmails(lead, referenceId),
    forwardToWebhook(lead, referenceId),
  ])

  const configured = [emailStatus, webhookStatus].filter((status) => status !== "skipped")
  const allFailed = configured.length > 0 && configured.every((status) => status === "failed")

  if (allFailed) {
    return NextResponse.json(
      {
        error:
          "Am înregistrat cererea, dar notificarea nu a plecat. Sună-ne la 0729 369 094 ca să fim siguri.",
        referenceId,
      },
      { status: 502 },
    )
  }

  return NextResponse.json({
    success: true,
    referenceId,
    responseTime: "24 de ore lucrătoare",
    delivery: { email: emailStatus, webhook: webhookStatus },
  })
}

/** GET-ul există doar ca verificare rapidă de sănătate a endpointului. */
export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/lead",
    integrations: {
      email: Boolean(process.env.RESEND_API_KEY),
      webhook: Boolean(process.env.LEAD_WEBHOOK_URL),
    },
  })
}
