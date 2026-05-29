"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"

export default function SignUpPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setPending(true)

    const { error: authError } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "/",
    })

    if (authError) {
      setError(authError.message ?? "Registration failed. Try a different email.")
      setPending(false)
      return
    }

    router.push("/")
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="mb-10 text-center">
        <h1 className="font-mono text-base font-bold tracking-[0.14em] text-primary uppercase select-none">
          Insider Insights
        </h1>
        <div className="mt-1.5 font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
          Trade Intelligence Terminal
        </div>
      </div>

      <div className="w-full max-w-[340px] border border-border bg-card">
        <div className="px-5 py-3 border-b border-border">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Create Session Profile
          </span>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-5 space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="name"
              className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
            >
              Display Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              autoFocus
              className="w-full bg-background border border-border px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/35 focus:outline-none focus:border-primary transition-colors duration-100"
              placeholder="J. Smith"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
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
              className="w-full bg-background border border-border px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/35 focus:outline-none focus:border-primary transition-colors duration-100"
              placeholder="user@example.com"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
            >
              Passphrase
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full bg-background border border-border px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/35 focus:outline-none focus:border-primary transition-colors duration-100"
              placeholder="min. 8 characters"
            />
          </div>

          {error && (
            <div className="font-mono text-[10px] tracking-wide border border-destructive/30 bg-destructive/8 px-3 py-2 text-destructive">
              <span className="opacity-50">ERR</span>{" "}
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full font-mono text-[11px] uppercase tracking-[0.18em] border px-4 py-2.5 transition-colors duration-100 disabled:opacity-40 bg-primary/10 border-primary/40 text-primary hover:bg-primary/18 cursor-pointer"
          >
            {pending ? "Creating profile…" : "Create Account"}
          </button>
        </form>

        <div className="px-5 py-3 border-t border-border">
          <span className="font-mono text-[10px] text-muted-foreground">
            Already registered?{" "}
            <Link
              href="/sign-in"
              className="text-primary hover:opacity-75 transition-opacity duration-100"
            >
              Authenticate
            </Link>
          </span>
        </div>
      </div>

      <div className="mt-8 font-mono text-[10px] text-muted-foreground/30 tracking-[0.18em] uppercase">
        SEC Edgar (Form 4) · Stock Act
      </div>
    </main>
  )
}
