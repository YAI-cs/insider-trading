"use client"

import { useState } from "react"
import Link from "next/link"
import {
  insiders,
  trades,
  insiderNews,
  marketEvents,
  INSIDER_COLORS,
  formatDate,
  formatNotional,
  type Insider,
  type Trade,
  type TradeType,
  type InsiderNewsItem,
} from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const PARTY_COLORS: Record<string, string> = {
  R: "text-red-400 bg-red-400/10 border-red-400/20",
  D: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  I: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  N: "text-muted-foreground bg-muted border-border",
}

const PARTY_LABEL: Record<string, string> = {
  R: "Republican",
  D: "Democrat",
  I: "Independent",
  N: "Non-partisan",
}

const MARK_SYMBOLS: Record<TradeType, string> = {
  BUY: "▲",
  SELL: "▽",
  CALL: "◆",
  PUT: "◇",
}

const NEWS_CAT_COLORS: Record<InsiderNewsItem["category"], string> = {
  trade: "text-primary bg-primary/8 border-primary/20",
  political: "text-chart-5 bg-chart-5/8 border-chart-5/20",
  market: "text-chart-1 bg-chart-1/8 border-chart-1/20",
  regulatory: "text-chart-2 bg-chart-2/8 border-chart-2/20",
}

const NEWS_CAT_LABELS: Record<InsiderNewsItem["category"], string> = {
  trade: "TRADE",
  political: "POLITICAL",
  market: "MARKET",
  regulatory: "REGULATORY",
}

function TypeBadge({ type }: { type: TradeType }) {
  const isUp = type === "BUY" || type === "CALL"
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono font-bold tracking-wide",
        isUp ? "text-chart-1 bg-chart-1/10" : "text-chart-2 bg-chart-2/10"
      )}
    >
      <span className="text-[9px]">{MARK_SYMBOLS[type]}</span>
      {type}
    </span>
  )
}

function LagBadge({ lag }: { lag: number }) {
  const color = lag > 30 ? "text-chart-2" : lag > 10 ? "text-primary" : "text-chart-1"
  return <span className={cn("font-mono tabular-nums text-[11px]", color)}>{lag}d</span>
}

function ReturnBadge({ pct }: { pct: number }) {
  const pos = pct >= 0
  return (
    <span className={cn("font-mono tabular-nums font-semibold text-[11px]", pos ? "text-chart-1" : "text-chart-2")}>
      {pos ? "+" : ""}{pct.toFixed(1)}%
    </span>
  )
}

// Mini sparkline of trade positions over time
function TradeSparkline({ trades, color }: { trades: Trade[]; color: string }) {
  const sorted = [...trades].sort((a, b) => a.date.localeCompare(b.date))
  if (sorted.length < 2) return null

  const START = new Date("2024-01-01").getTime()
  const END = new Date("2026-01-01").getTime()
  const RANGE = END - START

  const W = 320
  const H = 48

  const Y_MIN = Math.min(...sorted.map((t) => t.returnPct)) - 10
  const Y_MAX = Math.max(...sorted.map((t) => t.returnPct)) + 10
  const Y_RANGE = Y_MAX - Y_MIN

  function x(d: string) {
    return ((new Date(d).getTime() - START) / RANGE) * W
  }
  function y(pct: number) {
    return H - ((pct - Y_MIN) / Y_RANGE) * H
  }

  const points = sorted.map((t) => `${x(t.date)},${y(t.returnPct)}`).join(" ")

  // Zero line position
  const zeroY = y(0)

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none">
      <line x1={0} y1={zeroY} x2={W} y2={zeroY} stroke="currentColor" strokeWidth={0.5} strokeDasharray="3,3" className="text-muted-foreground/25" />
      <polyline fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" points={points} opacity={0.7} />
      {sorted.map((t) => (
        <circle key={t.id} cx={x(t.date)} cy={y(t.returnPct)} r={3} fill={color} opacity={0.9} />
      ))}
    </svg>
  )
}

type SortKey = keyof Trade
type SortDir = "asc" | "desc"

export function InsiderProfile({ id }: { id: string }) {
  const insider = insiders.find((i) => i.id === id)
  const [sortKey, setSortKey] = useState<SortKey>("date")
  const [sortDir, setSortDir] = useState<SortDir>("desc")

  if (!insider) {
    return (
      <div className="flex items-center justify-center h-screen bg-background font-mono text-muted-foreground text-sm">
        Insider not found.{" "}
        <Link href="/" className="ml-2 text-primary hover:underline">
          ← Back
        </Link>
      </div>
    )
  }

  const insiderTrades = trades.filter((t) => t.insiderId === id)
  const news = [...insiderNews]
    .filter((n) => n.insiderId === id)
    .sort((a, b) => b.date.localeCompare(a.date))

  const totalNotional = insiderTrades.reduce((s, t) => s + t.notional, 0)
  const avgEdge = insider.estimatedEdge
  const avgLag = insiderTrades.length
    ? Math.round(insiderTrades.reduce((s, t) => s + t.disclosureLag, 0) / insiderTrades.length)
    : 0
  const winRate =
    insiderTrades.length
      ? Math.round((insiderTrades.filter((t) => t.returnPct > 0).length / insiderTrades.length) * 100)
      : 0

  const color = INSIDER_COLORS[id] ?? "var(--color-primary)"
  const initials = insider.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")

  // Sort trades
  const sortedTrades = [...insiderTrades].sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1
    const av = a[sortKey]
    const bv = b[sortKey]
    if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir
    return String(av).localeCompare(String(bv)) * dir
  })

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("desc")
    }
  }

  function SortIndicator({ col }: { col: SortKey }) {
    if (sortKey !== col) return <span className="text-muted-foreground/25 ml-1">↕</span>
    return <span className="text-primary ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>
  }

  const COLS: { key: SortKey; label: string; align: "left" | "right" }[] = [
    { key: "date", label: "Date", align: "left" },
    { key: "ticker", label: "Ticker", align: "left" },
    { key: "type", label: "Type", align: "left" },
    { key: "notional", label: "Notional", align: "right" },
    { key: "disclosureLag", label: "Lag", align: "right" },
    { key: "priceAtTrade", label: "Price@Trade", align: "right" },
    { key: "priceNow", label: "Price Now", align: "right" },
    { key: "returnPct", label: "Stock △", align: "right" },
  ]

  const relevantEvents = marketEvents
    .filter((e) => {
      if (id === "trump") return ["announcement", "political"].includes(e.category)
      if (id === "pelosi") return ["earnings", "announcement"].includes(e.category)
      if (id === "musk") return ["earnings", "announcement", "policy"].includes(e.category)
      if (id === "rfk") return ["policy", "announcement"].includes(e.category)
      return false
    })
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5)

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground font-mono">
      {/* Top nav */}
      <div className="h-10 border-b border-border flex items-center px-4 gap-4 shrink-0">
        <Link
          href="/"
          className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
        >
          <span className="text-[11px]">←</span> Dashboard
        </Link>
        <span className="text-border">·</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50">
          Insider Insights
        </span>
        <span className="text-border ml-auto">·</span>
        <span className="font-mono text-[10px] text-muted-foreground/40">Profile</span>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        {/* Profile hero */}
        <div className="border-b border-border px-6 py-4 shrink-0">
          <div className="flex items-start gap-5">
            {/* Avatar */}
            <div
              className="w-14 h-14 flex items-center justify-center text-xl font-bold shrink-0 border border-border/60"
              style={{ backgroundColor: `${color}14`, color }}
            >
              {initials}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg font-bold text-foreground tracking-tight leading-none">
                  {insider.name}
                </h1>
                <span
                  className={cn(
                    "px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border font-mono",
                    PARTY_COLORS[insider.party]
                  )}
                >
                  {PARTY_LABEL[insider.party]}
                </span>
              </div>
              <div className="mt-1 font-mono text-[11px] text-muted-foreground">
                {insider.title}
                <span className="text-border mx-2">·</span>
                {insider.affiliation}
              </div>
              <div className="mt-1 font-mono text-[10px] text-muted-foreground/50">
                Last trade: {formatDate(insider.lastTradeDate)}
              </div>
            </div>

            {/* Sparkline */}
            <div className="w-72 shrink-0 hidden lg:block">
              <div className="font-mono text-[9px] text-muted-foreground/40 uppercase tracking-wide mb-1.5">
                Trade returns
              </div>
              <TradeSparkline trades={insiderTrades} color={color} />
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[
              { label: "Total Notional", value: formatNotional(totalNotional), accent: false },
              { label: "Trades Filed", value: insiderTrades.length, accent: false },
              { label: "Avg Edge", value: `${avgEdge >= 0 ? "+" : ""}${avgEdge.toFixed(1)}%`, accent: true, positive: avgEdge >= 0 },
              { label: "Win Rate", value: `${winRate}%`, accent: true, positive: winRate >= 50 },
            ].map(({ label, value, accent, positive }) => (
              <div key={label} className="bg-card border border-border px-3 py-2.5">
                <div className="font-mono text-[9px] text-muted-foreground/50 uppercase tracking-wide mb-1">
                  {label}
                </div>
                <div
                  className={cn(
                    "font-mono text-base font-bold tabular-nums",
                    accent
                      ? positive
                        ? "text-chart-1"
                        : "text-chart-2"
                      : "text-foreground"
                  )}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main two-pane body */}
        <main className="flex-1 flex overflow-hidden min-h-0">
          {/* Left: news feed + key events */}
          <div
            className="border-r border-border shrink-0 flex flex-col overflow-hidden"
            style={{ width: "30%", minWidth: 240, maxWidth: 380 }}
          >
            {/* News feed */}
            <div className="px-4 py-2.5 border-b border-border flex items-center justify-between shrink-0">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                News Feed
              </span>
              <span className="font-mono text-[10px] text-muted-foreground/40">
                {news.length} items
              </span>
            </div>
            <div className="flex-1 overflow-y-auto">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-3 border-b border-border/50 hover:bg-accent/40 transition-colors duration-75"
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span
                      className={cn(
                        "px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider border font-mono",
                        NEWS_CAT_COLORS[item.category]
                      )}
                    >
                      {NEWS_CAT_LABELS[item.category]}
                    </span>
                    <span className="font-mono text-[9px] text-muted-foreground/40">
                      {formatDate(item.date)}
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-foreground/85 leading-relaxed">
                    {item.headline}
                  </p>
                  <p className="font-mono text-[9px] text-muted-foreground/40 mt-1">
                    {item.source}
                  </p>
                </div>
              ))}
            </div>

            {/* Key events */}
            {relevantEvents.length > 0 && (
              <>
                <div className="px-4 py-2 border-t border-b border-border shrink-0">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    Related Events
                  </span>
                </div>
                <div className="shrink-0">
                  {relevantEvents.map((ev) => (
                    <div
                      key={ev.date + ev.label}
                      className="px-4 py-2 border-b border-border/40 flex items-start gap-2"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: color, opacity: 0.6 }}
                      />
                      <div>
                        <p className="font-mono text-[10px] text-foreground/70 leading-snug">
                          {ev.label}
                        </p>
                        <p className="font-mono text-[9px] text-muted-foreground/40 mt-0.5">
                          {formatDate(ev.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right: trade history table */}
          <section className="flex-1 flex flex-col overflow-hidden min-w-0">
            <div className="px-4 py-2.5 border-b border-border flex items-center justify-between shrink-0">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                Trade History
              </span>
              <span className="font-mono text-[10px] text-muted-foreground/40">
                {sortedTrades.length} disclosures
              </span>
            </div>

            <div className="flex-1 overflow-auto">
              <table className="w-full min-w-[640px] border-collapse">
                <thead className="sticky top-0 z-10 bg-background">
                  <tr className="border-b border-border">
                    {COLS.map((col) => (
                      <th
                        key={col.key}
                        className={cn(
                          "px-3 py-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground/60 cursor-pointer select-none whitespace-nowrap",
                          "hover:text-muted-foreground transition-colors duration-100",
                          col.align === "right" ? "text-right" : "text-left"
                        )}
                        onClick={() => handleSort(col.key)}
                      >
                        {col.label}
                        <SortIndicator col={col.key} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedTrades.map((trade, idx) => (
                    <tr
                      key={trade.id}
                      className={cn(
                        "border-b border-border/50 hover:bg-accent/60 transition-colors duration-75",
                        idx % 2 === 0 ? "bg-background" : "bg-card"
                      )}
                    >
                      <td className="px-3 py-2.5 font-mono text-[11px] tabular-nums text-foreground/70 whitespace-nowrap">
                        {formatDate(trade.date)}
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[12px] font-bold text-foreground">
                            {trade.ticker}
                          </span>
                          <span className="font-mono text-[10px] text-muted-foreground/50 hidden xl:inline">
                            {trade.company.split(" ").slice(0, 2).join(" ")}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5">
                        <TypeBadge type={trade.type} />
                      </td>
                      <td className="px-3 py-2.5 font-mono text-[11px] tabular-nums text-right text-foreground/80">
                        {formatNotional(trade.notional)}
                      </td>
                      <td className="px-3 py-2.5 text-right">
                        <LagBadge lag={trade.disclosureLag} />
                      </td>
                      <td className="px-3 py-2.5 font-mono text-[11px] tabular-nums text-right text-foreground/60">
                        ${trade.priceAtTrade.toFixed(0)}
                      </td>
                      <td className="px-3 py-2.5 font-mono text-[11px] tabular-nums text-right text-foreground/80">
                        ${trade.priceNow.toFixed(0)}
                      </td>
                      <td className="px-3 py-2.5 text-right">
                        <ReturnBadge pct={trade.returnPct} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Disclosure lag summary */}
              <div className="px-4 py-3 border-t border-border mt-auto">
                <div className="flex items-center gap-6">
                  <div>
                    <div className="font-mono text-[9px] text-muted-foreground/40 uppercase tracking-wide mb-0.5">
                      Avg Disclosure Lag
                    </div>
                    <div
                      className={cn(
                        "font-mono text-sm font-bold",
                        avgLag > 30 ? "text-chart-2" : avgLag > 10 ? "text-primary" : "text-chart-1"
                      )}
                    >
                      {avgLag} days
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-muted-foreground/40 uppercase tracking-wide mb-0.5">
                      Tickers
                    </div>
                    <div className="font-mono text-sm font-bold text-foreground">
                      {[...new Set(insiderTrades.map((t) => t.ticker))].join(", ")}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-muted-foreground/40 uppercase tracking-wide mb-0.5">
                      Largest Trade
                    </div>
                    <div className="font-mono text-sm font-bold text-foreground">
                      {formatNotional(Math.max(...insiderTrades.map((t) => t.notional)))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="h-7 border-t border-border bg-background flex items-center px-4 shrink-0">
        <div className="flex items-center gap-4 font-mono text-[9px] text-muted-foreground/35 tracking-wide w-full">
          <span className="text-primary/40 font-bold tracking-[0.12em]">INSIDER INSIGHTS</span>
          <span className="text-muted-foreground/20">·</span>
          <span>EDGAR (Form 4) · STOCK Act Disclosures · Congress.gov</span>
          <span className="text-muted-foreground/20">·</span>
          <span>Mock data for demonstration only. Not investment advice.</span>
          <span className="ml-auto">v0.1.0-demo</span>
        </div>
      </footer>
    </div>
  )
}
