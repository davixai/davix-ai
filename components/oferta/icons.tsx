// ============================================================================
// Iconuri inline pentru /oferta.
// ----------------------------------------------------------------------------
// Scrise de mână, nu importate din lucide: pagina folosește 10 iconuri, iar
// inline-ul înseamnă zero JS în plus și control total pe grosimea liniei.
// Toate moștenesc `currentColor`, ca să se coloreze din CSS.
// ============================================================================

type IconProps = { size?: number; className?: string }

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor" as const,
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
})

export function WhatsAppIcon({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23a8.23 8.23 0 0 1 0 16.46z" />
    </svg>
  )
}

export function PhoneIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.26-1.26a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

export function CheckIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={2.6} className={className}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export function XIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={2.4} className={className}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

export function ArrowIcon({ size = 15, className }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={2.4} className={className}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  )
}

/**
 * Săgeata pentru sărituri ÎN pagină. ArrowIcon-ul diagonal (↗) e convenția
 * pentru „se deschide altundeva" — pe un link care doar derulează mai jos
 * promite o fereastră nouă care nu vine niciodată.
 */
export function ArrowDownIcon({ size = 15, className }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={2.4} className={className}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  )
}

export function GlobeIcon({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={1.8} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9h16.8M3.6 15h16.8" />
      <path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" />
    </svg>
  )
}

export function LayersIcon({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={1.8} className={className}>
      <path d="m12 3 9 5-9 5-9-5 9-5z" />
      <path d="m3 13 9 5 9-5" />
    </svg>
  )
}

export function CartIcon({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={1.8} className={className}>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2 3h2.2l2.3 12.2a1.6 1.6 0 0 0 1.6 1.3h8.6a1.6 1.6 0 0 0 1.6-1.3L21 7H5.4" />
    </svg>
  )
}

export function QrIcon({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={1.8} className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1.4" />
      <rect x="14" y="3" width="7" height="7" rx="1.4" />
      <rect x="3" y="14" width="7" height="7" rx="1.4" />
      <path d="M14 14h3v3h-3zM20 14v.01M14 20v.01M20 20v.01M17.5 20.5v.01" />
    </svg>
  )
}

export function TargetIcon({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={1.8} className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function WrenchIcon({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={1.8} className={className}>
      <path d="M14.7 6.3a4.5 4.5 0 0 0 5.9 5.9l-8.1 8.1a2.4 2.4 0 0 1-3.4 0l-2.5-2.5a2.4 2.4 0 0 1 0-3.4z" />
      <path d="M14.7 6.3 18 3" />
    </svg>
  )
}

export function ShieldIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={2} className={className}>
      <path d="M12 22s8-4 8-10V5.5L12 2 4 5.5V12c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

/** Mapare nume → componentă, folosită de lista de servicii din data.ts. */
export const SERVICE_ICONS = {
  globe: GlobeIcon,
  layers: LayersIcon,
  cart: CartIcon,
  qr: QrIcon,
  target: TargetIcon,
  wrench: WrenchIcon,
} as const
