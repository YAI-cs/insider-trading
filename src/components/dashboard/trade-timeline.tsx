"use client"

import { useRef, useState } from "react"
import {
  type Trade,
  type Insider,
  type MarketEvent,
  type TradeType,
  INSIDER_COLORS,
  formatDate,
  formatNotional,
} from "@/lib/mock-data"
import { cn } from "@/lib/utils"

type Props = {
  trades: Trade[]
  events: MarketEvent[]
  insiders: Insider[]
  selectedInsiderId: string | null
}

const START_MS = new Date("2024-01-01").getTime()
const END_MS = new Date("2026-07-01").getTime()
const RANGE_MS = END_MS - START_MS
const Y_MIN = -55
const Y_MAX = 285
const Y_RANGE = Y_MAX - Y_MIN

function xPct(dateStr: string): number {
  return ((new Date(dateStr).getTime() - START_MS) / RANGE_MS) * 100
}

function yPct(returnPct: number): number {
  const clamped = Math.max(Y_MIN, Math.min(Y_MAX, returnPct))
  return ((clamped - Y_MIN) / Y_RANGE) * 100
}

const MARK_SYMBOLS: Record<TradeType, string> = {
  BUY: "▲",
  SELL: "▽",
  CALL: "◆",
  PUT: "◇",
}

const X_LABELS = [
  { date: "2024-01-01", label: "Jan '24" },
  { date: "2024-07-01", label: "Jul '24" },
  { date: "2025-01-01", label: "Jan '25" },
  { date: "2025-07-01", label: "Jul '25" },
  { date: "2026-01-01", label: "Jan '26" },
]

const Y_TICKS = [0, 50, 100, 150, 200, 250]

type HoveredMark = {
  trade: Trade
  insider: Insider
  clientX: number
  clientY: number
}

export function TradeTimeline({ trades, events, insiders, selectedInsiderId }: Props) {
  const [hovered, setHovered] = useState<HoveredMark | null>(null)

  function getMarkColor(insiderId: string): string {
    if (insiderId === selectedInsiderId) return "var(--color-primary)"
    return INSIDER_COLORS[insiderId] ?? "var(--color-muted-foreground)"
  }

  function getMarkOpacity(insiderId: string): number {
    if (!selectedInsiderId) return 1
    if (insiderId === selectedInsiderId) return 1
    return 0.18
  }

  return (
    <div
      className="relative border-b border-border bg-background select-none"
      style={{ height: "100%" }}
    >
      {/* Header row */}
      <div className="absolute top-0 left-0 right-0 h-14 flex items-center justify-between px-4 z-10 border-b border-border">
        <span className="font-mono text-[13px] uppercase tracking-[0.15em] text-muted-foreground">
          Trade vs. Stock Delta — Timeline
        </span>
        <div className="flex items-center gap-4 font-mono text-[11px] font-semibold tracking-wide">
          <span className="flex items-center gap-1">
            <span className="text-chart-1">▲</span>
            <span className="text-chart-1/80">BUY</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="text-chart-2">▽</span>
            <span className="text-chart-2/80">SELL</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="text-primary">◆</span>
            <span className="text-primary/80">CALL</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="text-chart-5">◇</span>
            <span className="text-chart-5/80">PUT</span>
          </span>
        </div>
      </div>

      {/* Body: y-axis labels + plot */}
      <div className="absolute left-0 right-0" style={{ top: 32, bottom: 116 }}>
        {/* Y-axis label column */}
        <div className="absolute left-0 top-0 bottom-0 w-10">
          {Y_TICKS.map((pct) => (
            <div
              key={pct}
              className="absolute right-1.5 -translate-y-1/2 font-mono text-[10px] text-muted-foreground/70 tabular-nums leading-none"
              style={{ bottom: `${yPct(pct)}%` }}
            >
              {pct === 0 ? "0" : `${pct}`}
            </div>
          ))}
          {/* Y axis label */}
          <div
            className="absolute font-mono text-[9px] text-muted-foreground/70 tracking-wide"
            style={{
              left: 2,
              top: "50%",
              transform: "rotate(-90deg) translateX(-50%)",
              transformOrigin: "left center",
              whiteSpace: "nowrap",
            }}
          >
            Stock △ (%)
          </div>
        </div>

        {/* Scatterplot area */}
        <div
          className="absolute right-0 top-0 bottom-0"
          style={{ left: 40 }}
        >
          {/* Horizontal grid lines + zero line */}
          {Y_TICKS.map((pct) => (
            <div
              key={pct}
              className={cn(
                "absolute left-0 right-0 border-t pointer-events-none",
                pct === 0
                  ? "border-muted-foreground/20 border-dashed"
                  : "border-border/40"
              )}
              style={{ bottom: `${yPct(pct)}%` }}
            />
          ))}

          {/* Trade marks */}
          <div
            className="absolute inset-0"
            onMouseLeave={() => setHovered(null)}
          >
            {trades.map((trade) => {
              const insider = insiders.find((i) => i.id === trade.insiderId)
              if (!insider) return null
              const x = xPct(trade.date)
              const y = yPct(trade.returnPct)
              const color = getMarkColor(trade.insiderId)
              const opacity = getMarkOpacity(trade.insiderId)
              const isHov = hovered?.trade.id === trade.id

              return (
                <span
                  key={trade.id}
                  className="absolute -translate-x-1/2 translate-y-1/2 cursor-crosshair font-mono leading-none"
                  style={{
                    left: `${x}%`,
                    bottom: `${y}%`,
                    fontSize: isHov ? 16 : 11,
                    color,
                    opacity,
                    zIndex: isHov ? 25 : 10,
                    textShadow: isHov ? `0 0 10px ${color}80` : "none",
                    transition: "font-size 0.1s, opacity 0.1s, text-shadow 0.1s",
                  }}
                  onMouseEnter={(e) =>
                    setHovered({ trade, insider, clientX: e.clientX, clientY: e.clientY })
                  }
                >
                  {MARK_SYMBOLS[trade.type]}
                </span>
              )
            })}
          </div>

          {/* Right edge line */}
          <div className="absolute right-0 top-0 bottom-0 w-px bg-border/30" />
        </div>
      </div>

      {/* X-axis + labels + event ticks */}
      <div className="absolute left-10 right-0" style={{ top: "calc(100% - 116px)", height: 116 }}>
        {/* Axis line */}
        <div className="h-px bg-border w-full" />

        {/* X date labels */}
        {X_LABELS.map(({ date, label }) => (
          <div
            key={date}
            className="absolute top-1 -translate-x-1/2 font-mono text-[10px] text-muted-foreground/70 whitespace-nowrap"
            style={{ left: `${xPct(date)}%` }}
          >
            {label}
          </div>
        ))}

        {/* Event ticks zone */}
        <EventStrip events={events} />
      </div>

      {/* Floating tooltip */}
      {hovered && (
        <TradeTooltip
          trade={hovered.trade}
          insider={hovered.insider}
          clientX={hovered.clientX}
          clientY={hovered.clientY}
        />
      )}
    </div>
  )
}

function EventStrip({ events }: { events: MarketEvent[] }) {
  const [hovKey, setHovKey] = useState<string | null>(null)

  // Three lanes: sort events by x-position, assign 0/1/2 in order
  // so dense clusters spread across three staggered rows
  const laneMap = new Map<string, number>()
  ;[...events]
    .map(ev => ({ key: ev.date + ev.label, x: xPct(ev.date) }))
    .sort((a, b) => a.x - b.x)
    .forEach(({ key }, i) => laneMap.set(key, i % 3))

  // tickH = vertical line from axis down to label row
  // labelTop = y offset where the angled text starts
  const LANES = [
    { tickH: 6,  labelTop: 8  },
    { tickH: 22, labelTop: 24 },
    { tickH: 38, labelTop: 40 },
  ]

  return (
    <div className="absolute left-0 right-0" style={{ top: 18, bottom: 0 }}>
      {events.map((ev) => {
        const x = xPct(ev.date)
        const key = ev.date + ev.label
        const isH = hovKey === key
        const lane = laneMap.get(key) ?? 0
        const { tickH, labelTop } = LANES[lane]
        const short = ev.label.length > 14 ? ev.label.slice(0, 13) + "…" : ev.label

        return (
          <div
            key={key}
            className="absolute"
            style={{ left: `${x}%` }}
            onMouseEnter={() => setHovKey(key)}
            onMouseLeave={() => setHovKey(null)}
          >
            {/* Tick line */}
            <div
              className={cn(
                "w-px transition-colors duration-150",
                isH ? "bg-primary" : "bg-muted-foreground/40"
              )}
              style={{ height: tickH }}
            />

            {/* Label — always visible, angled 38° */}
            <div
              className={cn(
                "absolute font-mono whitespace-nowrap transition-all duration-150",
                isH ? "text-primary" : "text-muted-foreground/80"
              )}
              style={{
                top: labelTop,
                left: 3,
                fontSize: 8,
                lineHeight: 1,
                transform: "rotate(38deg)",
                transformOrigin: "0 0",
              }}
            >
              {short}
            </div>

            {/* Hover tooltip — full date + full label */}
            {isH && (
              <div
                className="absolute z-30 pointer-events-none"
                style={{ top: -36, left: "50%", transform: "translateX(-50%)" }}
              >
                <div className="bg-card border border-border/80 px-2 py-1.5 font-mono text-[10px] text-foreground/80 whitespace-nowrap shadow-xl">
                  <span className="text-muted-foreground/50 mr-1.5">{ev.date}</span>
                  {ev.label}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function TradeTooltip({
  trade,
  insider,
  clientX,
  clientY,
}: {
  trade: Trade
  insider: Insider
  clientX: number
  clientY: number
}) {
  const positive = trade.returnPct >= 0
  const lagColor =
    trade.disclosureLag > 30
      ? "text-chart-2"
      : trade.disclosureLag > 10
        ? "text-primary"
        : "text-chart-1"

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{ left: clientX + 14, top: clientY - 90 }}
    >
      <div className="bg-card border border-border shadow-xl p-3 font-mono text-[12px] min-w-[224px]">
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-border">
          <span className="font-bold text-foreground tracking-wide">{trade.ticker}</span>
          <span className="text-muted-foreground/60 text-[11px]">{trade.company.split(" ").slice(0, 2).join(" ")}</span>
          <span
            className={cn(
              "px-1.5 py-0.5 text-[10px] font-bold tracking-wider",
              trade.type === "BUY" || trade.type === "CALL"
                ? "bg-chart-1/15 text-chart-1"
                : "bg-chart-2/15 text-chart-2"
            )}
          >
            {MARK_SYMBOLS[trade.type]} {trade.type}
          </span>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[11px]">
          <span className="text-muted-foreground">Insider</span>
          <span className="text-foreground">{insider.name}</span>
          <span className="text-muted-foreground">Trade date</span>
          <span className="text-foreground tabular-nums">{formatDate(trade.date)}</span>
          <span className="text-muted-foreground">Notional</span>
          <span className="text-foreground tabular-nums">{formatNotional(trade.notional)}</span>
          <span className="text-muted-foreground">Disclosure lag</span>
          <span className={cn(lagColor, "tabular-nums")}>{trade.disclosureLag} days</span>
          <span className="text-muted-foreground">Stock since trade</span>
          <span className={cn(positive ? "text-chart-1" : "text-chart-2", "tabular-nums font-semibold")}>
            {positive ? "+" : ""}{trade.returnPct.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  )
}
