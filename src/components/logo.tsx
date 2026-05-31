type Props = {
  size?: number
  color?: string
  className?: string
}

export default function InsiderInsightsLogo({ size = 1, color = "currentColor", className = "" }: Props) {
  const s = size

  return (
    <div
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: `${10 * s}px` }}
    >
      <svg
        width={35 * s}
        height={35 * s}
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M5 14 L5 5 L14 5"     stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 5 L30 5 L30 14"   stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 21 L5 30 L14 30"   stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 30 L30 30 L30 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="17.5" cy="17.5" r="8" stroke="white" strokeWidth="0.8" strokeDasharray="2 2"/>
        <circle cx="17.5" cy="17.5" r="3.5" fill="white"/>
      </svg>

      <div style={{ lineHeight: 1.1, fontFamily: "var(--font-oxanium)" }}>
        <div style={{ fontSize: `${20 * s}px`, fontWeight: 800, letterSpacing: "0.5px", color }}>
          INSIDER
        </div>
        <div style={{ fontSize: `${13 * s}px`, fontWeight: 300, letterSpacing: `${3 * s}px`, color, opacity: 0.7 }}>
          INSIGHTS
        </div>
      </div>
    </div>
  )
}
