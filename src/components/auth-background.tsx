export function AuthBackground() {
  const W = 1440
  const H = 900

  // Main price trend: 60 pts, y decreases (price rises). Range 640→248.
  const main = [
    640, 628, 643, 631, 616, 605, 620, 609, 595, 582,
    588, 573, 560, 575, 558, 542, 555, 540, 526, 512,
    520, 506, 492, 504, 487, 472, 485, 468, 453, 464,
    449, 433, 445, 429, 414, 426, 410, 394, 406, 389,
    376, 388, 372, 356, 368, 351, 337, 349, 333, 319,
    330, 314, 300, 312, 296, 282, 294, 278, 263, 248,
  ]

  // Secondary chart: more volatile, starts lower (higher y). Range 700→314.
  const sec = [
    700, 685, 698, 714, 690, 675, 691, 663, 679, 658,
    644, 662, 633, 651, 622, 640, 610, 626, 598, 614,
    584, 601, 570, 588, 557, 574, 543, 560, 528, 546,
    514, 533, 500, 519, 486, 505, 471, 490, 456, 474,
    440, 459, 424, 443, 408, 428, 392, 412, 376, 396,
    360, 380, 343, 363, 326, 347, 309, 330, 292, 314,
  ]

  // Volume bar heights, 0–100 scale
  const vols = [
    42, 28, 52, 35, 58, 72, 40, 33, 63, 78,
    33, 52, 68, 40, 57, 82, 36, 62, 70, 43,
    55, 38, 72, 48, 65, 77, 43, 60, 82, 46,
    52, 68, 40, 62, 75, 48, 60, 82, 43, 65,
    72, 40, 55, 78, 48, 62, 70, 36, 57, 82,
    43, 60, 75, 48, 63, 78, 40, 56, 70, 88,
  ]

  // Up = price went higher (lower y) relative to previous
  const volUp = [
    true,
    true, false, true, true, true, false, true, true, true,
    false, true, true, false, true, true, false, true, true, true,
    false, true, true, false, true, true, false, true, true, false,
    true, true, false, true, true, false, true, true, false, true,
    true, false, true, true, false, true, true, false, true, true,
    false, true, true, false, true, true, false, true, true, true,
  ]

  const n = main.length
  const xStep = W / (n - 1)

  function line(pts: number[]) {
    return pts.map((y, i) => `${i === 0 ? "M" : "L"}${(i * xStep).toFixed(1)},${y}`).join(" ")
  }
  function area(pts: number[]) {
    return `${line(pts)} L${W},${H} L0,${H} Z`
  }

  const lastX = (n - 1) * xStep
  const lastY = main[n - 1]

  const hGrid = [200, 300, 400, 500, 600, 700]
  const vGrid = Array.from({ length: 11 }, (_, i) => (i + 1) * 120)
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV"]
  const tickers = ["NVDA", "AAPL", "MSFT", "TSLA", "META", "AMZN", "GOOG"]

  const VOL_BASE = 875
  const VOL_MAX = 85

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="auth-fill-main" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="auth-fill-sec" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.005" />
          </linearGradient>
          <linearGradient id="auth-vig-v" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#000" stopOpacity="0.94" />
            <stop offset="26%"  stopColor="#000" stopOpacity="0.06" />
            <stop offset="74%"  stopColor="#000" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.97" />
          </linearGradient>
          <linearGradient id="auth-vig-h" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#000" stopOpacity="0.68" />
            <stop offset="13%"  stopColor="#000" stopOpacity="0" />
            <stop offset="87%"  stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.68" />
          </linearGradient>
        </defs>

        {/* Base */}
        <rect width={W} height={H} fill="#050505" />

        {/* Grid: horizontal */}
        {hGrid.map(y => (
          <line key={`h${y}`} x1={0} y1={y} x2={W} y2={y}
            stroke="rgba(255,255,255,0.03)" strokeWidth={1} />
        ))}
        {/* Grid: vertical */}
        {vGrid.map(x => (
          <line key={`v${x}`} x1={x} y1={0} x2={x} y2={H}
            stroke="rgba(255,255,255,0.03)" strokeWidth={1} />
        ))}

        {/* Secondary chart */}
        <path d={area(sec)} fill="url(#auth-fill-sec)" />
        <path d={line(sec)} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />

        {/* Main chart */}
        <path d={area(main)} fill="url(#auth-fill-main)" />
        <path d={line(main)} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth={1.5} />

        {/* Volume bars */}
        {vols.map((v, i) => {
          const bh = (v / 100) * VOL_MAX
          const bx = i * xStep
          return (
            <rect key={i}
              x={bx - xStep * 0.27} y={VOL_BASE - bh}
              width={xStep * 0.54} height={bh}
              fill={volUp[i] ? "rgba(74,222,128,0.17)" : "rgba(248,113,113,0.17)"}
            />
          )
        })}

        {/* Current price: dashed level line */}
        <line x1={0} y1={lastY} x2={W} y2={lastY}
          stroke="rgba(255,255,255,0.12)" strokeWidth={1} strokeDasharray="5 5" />

        {/* Current price dot */}
        <circle cx={lastX} cy={lastY} r={3.5} fill="#ffffff" opacity={0.55} />

        {/* Current price label */}
        <rect x={lastX - 56} y={lastY - 12} width={50} height={16} rx={1}
          fill="rgba(255,255,255,0.07)" />
        <text x={lastX - 52} y={lastY + 1.5}
          fill="rgba(255,255,255,0.45)" fontSize={9} fontFamily="monospace">
          +18.4%
        </text>

        {/* Time axis labels */}
        {months.map((m, i) => (
          <text key={m} x={vGrid[i] - 12} y={H - 7}
            fill="rgba(255,255,255,0.075)"
            fontSize={9} fontFamily="monospace" letterSpacing={1}>
            {m}
          </text>
        ))}

        {/* Price level labels */}
        {hGrid.map((y, i) => {
          const price = 60 + (hGrid.length - 1 - i) * 35
          return (
            <text key={y} x={W - 8} y={y - 5}
              textAnchor="end"
              fill="rgba(255,255,255,0.09)"
              fontSize={9} fontFamily="monospace">
              {price}.00
            </text>
          )
        })}

        {/* Ticker watermarks */}
        {tickers.map((t, i) => (
          <text key={t} x={42 + i * 200} y={H - 22}
            fill="rgba(255,255,255,0.04)"
            fontSize={11} fontFamily="monospace" letterSpacing={3}>
            {t}
          </text>
        ))}

        {/* Vignette overlays */}
        <rect width={W} height={H} fill="url(#auth-vig-v)" />
        <rect width={W} height={H} fill="url(#auth-vig-h)" />
      </svg>
    </div>
  )
}
