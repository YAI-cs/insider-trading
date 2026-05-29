import { insiders } from "@/lib/mock-data"
import { InsiderProfile } from "@/components/insider/insider-profile"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return insiders.map((insider) => ({ id: insider.id }))
}

export default async function InsiderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const insider = insiders.find((i) => i.id === id)
  if (!insider) notFound()
  return <InsiderProfile id={id} />
}
