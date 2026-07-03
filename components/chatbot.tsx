"use client"

import { createElement } from "react"
import Script from "next/script"

const ELEVENLABS_AGENT_ID = "agent_6801kwkfzmksfacvnaf5y42qgs96"

export function Chatbot() {
  return (
    <>
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="afterInteractive"
      />
      {createElement("elevenlabs-convai", {
        "agent-id": ELEVENLABS_AGENT_ID,
      })}
    </>
  )
}
