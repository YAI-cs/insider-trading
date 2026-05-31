"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import InsiderInsightsLogo from "@/components/logo"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setPending(true)

    const { error: authError } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    })

    if (authError) {
      setError(authError.message ?? "Authentication failed. Check credentials and retry.")
      setPending(false)
      return
    }

    router.push("/")
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="mb-10 flex flex-col items-center gap-3">
        <InsiderInsightsLogo size={1} className="text-primary" />
        <div className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
          Trade Intelligence Terminal
        </div>
      </div>

      <div className="w-full max-w-[340px] border border-border bg-card">
        <div className="px-5 py-3 border-b border-border">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Session Authentication
          </span>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-5 space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground"
            >
              Identifier
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              autoFocus
              className="w-full bg-background border border-border px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/35 focus:outline-none focus:border-primary transition-colors duration-100"
              placeholder="user@example.com"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground"
            >
              Passphrase
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-background border border-border px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/35 focus:outline-none focus:border-primary transition-colors duration-100"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="font-mono text-[11px] tracking-wide border border-destructive/30 bg-destructive/8 px-3 py-2 text-destructive">
              <span className="opacity-50">ERR</span>{" "}
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full font-mono text-[12px] uppercase tracking-[0.18em] border px-4 py-2.5 transition-colors duration-100 disabled:opacity-40 bg-primary/10 border-primary/40 text-primary hover:bg-primary/18 cursor-pointer"
          >
            {pending ? "Authenticating…" : "Authenticate"}
          </button>
        </form>

        <div className="px-5 py-3 border-t border-border">
          <span className="font-mono text-[11px] text-muted-foreground">
            No account?{" "}
            <Link
              href="/sign-up"
              className="text-primary hover:opacity-75 transition-opacity duration-100"
            >
              Register
            </Link>
          </span>
        </div>
      </div>

    </main>
  )
}
