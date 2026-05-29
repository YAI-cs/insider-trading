"use client"

import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { Sun, Moon } from "lucide-react"
import { type TradeType } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Props = {
  typeFilter: TradeType | "ALL"
  onTypeFilterChange: (type: TradeType | "ALL") => void
}

const FILTER_META: Record<
  TradeType | "ALL",
  { label: string; title: string; description: string }
> = {
  ALL: {
    label: "ALL",
    title: "All trade types",
    description:
      "Show every disclosed transaction — buys, sells, calls, and puts — across all tracked insiders.",
  },
  BUY: {
    label: "BUY",
    title: "Direct stock purchases",
    description:
      "Insider acquired shares outright at market price. Signals conviction in the company's near-term prospects.",
  },
  SELL: {
    label: "SELL",
    title: "Direct stock sales",
    description:
      "Insider disposed of shares. Elevated disclosure lag on sells can indicate strategic timing ahead of news.",
  },
  CALL: {
    label: "CALL",
    title: "Call option purchases",
    description:
      "Bullish leveraged bet on upside. The insider pays a premium for the right to buy shares at a set strike price.",
  },
  PUT: {
    label: "PUT",
    title: "Put option purchases",
    description:
      "Bearish or hedging position. The insider pays a premium for the right to sell shares — often a hedge against existing longs.",
  },
}

const TYPES: (TradeType | "ALL")[] = ["ALL", "BUY", "SELL", "CALL", "PUT"]

export function TopBar({ typeFilter, onTypeFilterChange }: Props) {
  const { resolvedTheme, setTheme } = useTheme()
  const router = useRouter()
  const { data: session } = authClient.useSession()

  async function handleSignOut() {
    await authClient.signOut()
    router.push("/sign-in")
    router.refresh()
  }

  return (
    <header className="h-16 border-b border-border bg-background flex items-center px-5 gap-6 shrink-0">
      <div className="flex items-center gap-3">
        <h1 className="font-mono text-base font-bold tracking-[0.14em] text-primary uppercase select-none whitespace-nowrap">
          Insider Insights
        </h1>
      </div>

      <div className="h-4 w-px bg-border" />

      <div className="flex items-center gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mr-1">
          Instrument
        </span>
        {TYPES.map((t) => {
          const meta = FILTER_META[t]
          return (
            <Tooltip key={t} delayDuration={300}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onTypeFilterChange(t)}
                  className={cn(
                    "px-2.5 py-0.5 font-mono text-[11px] tracking-wider border transition-colors duration-100",
                    typeFilter === t
                      ? "bg-primary/15 border-primary/50 text-primary"
                      : "border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground"
                  )}
                >
                  {meta.label}
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                align="start"
                sideOffset={8}
                className="max-w-[240px] py-2.5 px-3"
              >
                <div className="font-mono">
                  <div className="text-[11px] font-bold mb-1 opacity-100">
                    {meta.title}
                  </div>
                  <div className="text-[10px] leading-relaxed opacity-70 whitespace-normal">
                    {meta.description}
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>

      <div className="ml-auto flex items-center gap-4 text-[10px] font-mono text-muted-foreground tracking-wide">
        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="flex items-center justify-center w-6 h-6 text-muted-foreground hover:text-foreground transition-colors duration-100"
          aria-label="Toggle theme"
        >
          {resolvedTheme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        <span className="text-foreground/15">|</span>
        <span>
          <span className="text-muted-foreground">SRC</span>{" "}
          SEC EDGAR (Form 4) · STOCK Act
        </span>
        <span className="text-foreground/25">|</span>
        <span>
          <span className="text-muted-foreground">UPD</span>{" "}
          29 May 2026 11:42 UTC
        </span>
        {session?.user && (
          <>
            <span className="text-foreground/15">|</span>
            <span className="text-muted-foreground/70 max-w-[160px] truncate">
              {session.user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="px-2 py-0.5 font-mono text-[10px] tracking-wider border border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground transition-colors duration-100 uppercase"
            >
              Exit
            </button>
          </>
        )}
      </div>
    </header>
  )
}
