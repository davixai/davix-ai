// ============================================================================
// Ilustrațiile animate ale celor trei ramuri (pasul 0).
// SVG inline, animat exclusiv din CSS (clasele .dvx-art-*), ca să rămână
// vizibile și fără JavaScript și să se oprească la prefers-reduced-motion.
// ============================================================================

import type { Branch } from "@/lib/pricing"

const STROKE = "rgba(150, 175, 225, 0.55)"
const ACCENT = "#4d8bff"
const ACCENT_2 = "#34dcff"

/** Ramura SITE — o fereastră de browser care își desenează conținutul. */
function SiteArt() {
  return (
    <svg viewBox="0 0 200 104" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="dvx-site-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={ACCENT_2} stopOpacity="0.9" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0.5" />
        </linearGradient>
      </defs>

      <g className="dvx-art-float">
        <rect
          x="30"
          y="18"
          width="140"
          height="70"
          rx="7"
          stroke={STROKE}
          strokeWidth="1.2"
          fill="rgba(77,139,255,0.05)"
        />
        <path d="M30 32 H170" stroke={STROKE} strokeWidth="1.2" />
        <circle cx="39" cy="25" r="2" fill={ACCENT} className="dvx-art-blink" />
        <circle cx="47" cy="25" r="2" fill={STROKE} className="dvx-art-blink dvx-art-blink--b" />
        <circle cx="55" cy="25" r="2" fill={STROKE} className="dvx-art-blink dvx-art-blink--c" />

        {/* Blocul „hero" */}
        <rect x="40" y="41" width="52" height="34" rx="4" fill="url(#dvx-site-g)" opacity="0.55" />

        {/* Linii de text care se desenează */}
        <path d="M102 46 H158" stroke={ACCENT_2} strokeWidth="2.5" strokeLinecap="round" className="dvx-art-line" />
        <path d="M102 56 H146" stroke={STROKE} strokeWidth="2.5" strokeLinecap="round" className="dvx-art-line" />
        <path d="M102 66 H152" stroke={STROKE} strokeWidth="2.5" strokeLinecap="round" className="dvx-art-line" />
      </g>
    </svg>
  )
}

/** Ramura AUTOMATIZARE — noduri legate, cu un impuls care circulă. */
function AutomationArt() {
  return (
    <svg viewBox="0 0 200 104" fill="none" aria-hidden="true">
      <g className="dvx-art-float dvx-art-float--slow">
        <path
          d="M46 52 H80 M120 52 H154 M100 52 V26 M100 52 V78"
          stroke={STROKE}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M80 52 H120"
          stroke={ACCENT_2}
          strokeWidth="2"
          strokeLinecap="round"
          className="dvx-art-line"
        />

        {/* Nodul central */}
        <rect
          x="84"
          y="36"
          width="32"
          height="32"
          rx="9"
          fill="rgba(77,139,255,0.18)"
          stroke={ACCENT}
          strokeWidth="1.4"
        />
        <path
          d="M94 52 L98.5 56.5 L107 47"
          stroke={ACCENT_2}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="dvx-art-line"
        />

        {/* Noduri satelit */}
        <circle cx="42" cy="52" r="6" fill="rgba(150,175,225,0.14)" stroke={STROKE} strokeWidth="1.2" className="dvx-art-blink" />
        <circle cx="158" cy="52" r="6" fill="rgba(52,220,255,0.16)" stroke={ACCENT_2} strokeWidth="1.2" className="dvx-art-blink dvx-art-blink--b" />
        <circle cx="100" cy="22" r="6" fill="rgba(150,175,225,0.14)" stroke={STROKE} strokeWidth="1.2" className="dvx-art-blink dvx-art-blink--c" />
        <circle cx="100" cy="82" r="6" fill="rgba(150,175,225,0.14)" stroke={STROKE} strokeWidth="1.2" className="dvx-art-blink" />
      </g>
    </svg>
  )
}

/** Ramura APLICAȚIE — un telefon cu carduri care plutesc. */
function AppArt() {
  return (
    <svg viewBox="0 0 200 104" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="dvx-app-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.45" />
          <stop offset="100%" stopColor={ACCENT_2} stopOpacity="0.12" />
        </linearGradient>
      </defs>

      <g className="dvx-art-float">
        <rect
          x="78"
          y="14"
          width="44"
          height="76"
          rx="10"
          stroke={STROKE}
          strokeWidth="1.3"
          fill="rgba(77,139,255,0.06)"
        />
        <rect x="92" y="19" width="16" height="2.5" rx="1.25" fill={STROKE} />
        <rect x="84" y="28" width="32" height="20" rx="4" fill="url(#dvx-app-g)" />
        <path d="M84 56 H116" stroke={ACCENT_2} strokeWidth="2.2" strokeLinecap="round" className="dvx-art-line" />
        <path d="M84 64 H106" stroke={STROKE} strokeWidth="2.2" strokeLinecap="round" className="dvx-art-line" />
        <rect x="84" y="72" width="32" height="9" rx="4.5" fill={ACCENT} opacity="0.55" />
      </g>

      {/* Carduri laterale, plutind decalat */}
      <g className="dvx-art-float dvx-art-float--slow">
        <rect x="30" y="34" width="38" height="26" rx="6" stroke={STROKE} strokeWidth="1.2" fill="rgba(150,175,225,0.07)" />
        <path d="M38 44 H60" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
        <path d="M38 51 H52" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />

        <rect x="132" y="46" width="38" height="26" rx="6" stroke={ACCENT_2} strokeOpacity="0.5" strokeWidth="1.2" fill="rgba(52,220,255,0.07)" />
        <path d="M140 56 H162" stroke={ACCENT_2} strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
        <path d="M140 63 H154" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  )
}

const ART: Record<Branch, () => React.ReactElement> = {
  site: SiteArt,
  automation: AutomationArt,
  app: AppArt,
}

export function BranchArt({ branch }: { branch: Branch }) {
  const Art = ART[branch]
  return <Art />
}
