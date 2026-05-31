import {
  type Trade,
  type Insider,
  type TradeType,
  INSIDER_COLORS,
  formatDate,
  formatNotional,
} from "@/lib/mock-data"
import { cn } from "@/lib/utils"

type SortConfig = {
  column: keyof Trade
  direction: "asc" | "desc"
}

type Props = {
  trades: Trade[]
  insiders: Insider[]
  selectedInsiderId: string | null
  sortConfig: SortConfig
  onSort: (column: keyof Trade) => void
}

const MARK_SYMBOLS: Record<TradeType, string> = {
  BUY: "▲",
  SELL: "▽",
  CALL: "◆",
  PUT: "◇",
}

const COLS: { key: keyof Trade; label: string; align: "left" | "right"; mono: boolean }[] = [
  { key: "date", label: "Trade Date", align: "left", mono: true },
  { key: "insiderId", label: "Insider", align: "left", mono: false },
  { key: "ticker", label: "Ticker", align: "left", mono: true },
  { key: "type", label: "Type", align: "left", mono: true },
  { key: "notional", label: "Notional", align: "right", mono: true },
  { key: "disclosureLag", label: "Lag", align: "right", mono: true },
  { key: "priceAtTrade", label: "Price@Trade", align: "right", mono: true },
  { key: "priceNow", label: "Price Now", align: "right", mono: true },
  { key: "returnPct", label: "Stock △", align: "right", mono: true },
]

function LagBadge({ lag }: { lag: number }) {
  const color =
    lag > 30 ? "text-chart-2" : lag > 10 ? "text-primary" : "text-chart-1"
  return (
    <span className={cn("font-mono tabular-nums text-[12px]", color)}>
      {lag}d
    </span>
  )
}

function ReturnBadge({ pct }: { pct: number }) {
  const pos = pct >= 0
  return (
    <span className={cn("font-mono tabular-nums font-semibold text-[12px]", pos ? "text-chart-1" : "text-chart-2")}>
      {pos ? "+" : ""}{pct.toFixed(1)}%
    </span>
  )
}

function TypeBadge({ type }: { type: TradeType }) {
  const isUp = type === "BUY" || type === "CALL"
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-1.5 py-0.5 text-[11px] font-mono font-bold tracking-wide",
        isUp ? "text-chart-1 bg-chart-1/10" : "text-chart-2 bg-chart-2/10"
      )}
    >
      <span className="text-[10px]">{MARK_SYMBOLS[type]}</span>
      {type}
    </span>
  )
}

export function TradeTable({
  trades,
  insiders,
  selectedInsiderId,
  sortConfig,
  onSort,
}: Props) {
  function sortedTrades() {
    return [...trades].sort((a, b) => {
      const dir = sortConfig.direction === "asc" ? 1 : -1
      const av = a[sortConfig.column]
      const bv = b[sortConfig.column]
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir
      return String(av).localeCompare(String(bv)) * dir
    })
  }

  const sorted = sortedTrades()

  function SortIndicator({ col }: { col: keyof Trade }) {
    if (sortConfig.column !== col)
      return <span className="text-muted-foreground/25 ml-1">↕</span>
    return (
      <span className="text-primary ml-1">
        {sortConfig.direction === "asc" ? "↑" : "↓"}
      </span>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      <div className="px-4 py-2 border-b border-border flex items-center justify-between shrink-0">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
          Disclosures
        </span>
        <span className="font-mono text-[11px] text-muted-foreground">
          {sorted.length} records
          {selectedInsiderId && (
            <span className="text-primary ml-2">filtered</span>
          )}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-auto" tabIndex={0}>
        <table className="w-full min-w-[800px] border-collapse">
          <thead className="sticky top-0 z-10 bg-background">
            <tr className="border-b border-border">
              {COLS.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground cursor-pointer select-none whitespace-nowrap",
                    "hover:text-foreground transition-colors duration-100",
                    col.align === "right" ? "text-right" : "text-left"
                  )}
                  onClick={() => onSort(col.key)}
                >
                  {col.label}
                  <SortIndicator col={col.key} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((trade, idx) => {
              const insider = insiders.find((i) => i.id === trade.insiderId)
              const insiderColor = INSIDER_COLORS[trade.insiderId]
              const isSelected = selectedInsiderId === trade.insiderId
              const isDimmed = selectedInsiderId && !isSelected

              return (
                <tr
                  key={trade.id}
                  className={cn(
                    "border-b border-border/50 group transition-colors duration-75",
                    "hover:bg-accent/60",
                    isDimmed && "opacity-35",
                    idx % 2 === 0 ? "bg-background" : "bg-card"
                  )}
                >
                  <td className="px-3 py-2 font-mono text-[12px] tabular-nums text-foreground/70 whitespace-nowrap">
                    {formatDate(trade.date)}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: insiderColor }}
                      />
                      <span className="font-mono text-[12px] text-foreground whitespace-nowrap">
                        {insider?.name ?? trade.insiderId}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2 font-mono text-[13px] font-bold text-foreground">
                    {trade.ticker}
                  </td>
                  <td className="px-3 py-2">
                    <TypeBadge type={trade.type} />
                  </td>
                  <td className="px-3 py-2 font-mono text-[12px] tabular-nums text-right text-foreground/80">
                    {formatNotional(trade.notional)}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <LagBadge lag={trade.disclosureLag} />
                  </td>
                  <td className="px-3 py-2 font-mono text-[12px] tabular-nums text-right text-foreground/60">
                    ${trade.priceAtTrade.toFixed(0)}
                  </td>
                  <td className="px-3 py-2 font-mono text-[12px] tabular-nums text-right text-foreground/80">
                    ${trade.priceNow.toFixed(0)}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <ReturnBadge pct={trade.returnPct} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
