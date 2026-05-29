export type Insider = {
  id: string
  name: string
  title: string
  affiliation: string
  party: 'R' | 'D' | 'I' | 'N'
  tradeCount: number
  lastTradeDate: string
  estimatedEdge: number
}

export type TradeType = 'BUY' | 'SELL' | 'CALL' | 'PUT'

export type Trade = {
  id: string
  insiderId: string
  date: string
  disclosureDate: string
  ticker: string
  company: string
  type: TradeType
  notional: number
  disclosureLag: number
  priceAtTrade: number
  priceNow: number
  returnPct: number
}

export type MarketEvent = {
  date: string
  label: string
  category: 'policy' | 'earnings' | 'announcement' | 'political'
}

export const INSIDER_COLORS: Record<string, string> = {
  trump: 'oklch(0.75 0.17 70)',
  pelosi: 'oklch(0.67 0.12 185)',
  musk: 'oklch(0.70 0.17 45)',
  rfk: 'oklch(0.63 0.12 305)',
}

export const insiders: Insider[] = [
  {
    id: 'trump',
    name: 'Donald Trump',
    title: '47th President',
    affiliation: 'Executive Office',
    party: 'R',
    tradeCount: 14,
    lastTradeDate: '2025-02-14',
    estimatedEdge: 87.3,
  },
  {
    id: 'pelosi',
    name: 'Nancy Pelosi',
    title: 'House Minority Leader',
    affiliation: 'US House, D-CA',
    party: 'D',
    tradeCount: 9,
    lastTradeDate: '2025-04-18',
    estimatedEdge: 61.2,
  },
  {
    id: 'musk',
    name: 'Elon Musk',
    title: 'CEO, Tesla / X / SpaceX',
    affiliation: 'DOGE Advisor',
    party: 'N',
    tradeCount: 11,
    lastTradeDate: '2025-05-12',
    estimatedEdge: 34.8,
  },
  {
    id: 'rfk',
    name: 'Robert F. Kennedy Jr.',
    title: 'Secretary of HHS',
    affiliation: 'HHS, Cabinet',
    party: 'N',
    tradeCount: 6,
    lastTradeDate: '2025-05-01',
    estimatedEdge: 22.1,
  },
]

export const trades: Trade[] = [
  // Trump
  { id: 't1', insiderId: 'trump', date: '2024-01-22', disclosureDate: '2024-01-30', ticker: 'DJT', company: 'Trump Media & Technology', type: 'BUY', notional: 1_200_000, disclosureLag: 8, priceAtTrade: 12, priceNow: 42, returnPct: 250.0 },
  { id: 't2', insiderId: 'trump', date: '2024-03-04', disclosureDate: '2024-03-10', ticker: 'DJT', company: 'Trump Media & Technology', type: 'SELL', notional: 2_800_000, disclosureLag: 6, priceAtTrade: 58, priceNow: 42, returnPct: -27.6 },
  { id: 't3', insiderId: 'trump', date: '2024-06-15', disclosureDate: '2024-06-27', ticker: 'DJT', company: 'Trump Media & Technology', type: 'CALL', notional: 520_000, disclosureLag: 12, priceAtTrade: 26, priceNow: 42, returnPct: 61.5 },
  { id: 't4', insiderId: 'trump', date: '2024-09-08', disclosureDate: '2024-09-13', ticker: 'DJT', company: 'Trump Media & Technology', type: 'BUY', notional: 890_000, disclosureLag: 5, priceAtTrade: 19, priceNow: 42, returnPct: 121.1 },
  { id: 't5', insiderId: 'trump', date: '2024-11-18', disclosureDate: '2024-11-22', ticker: 'DJT', company: 'Trump Media & Technology', type: 'SELL', notional: 3_200_000, disclosureLag: 4, priceAtTrade: 38, priceNow: 42, returnPct: -10.5 },
  { id: 't6', insiderId: 'trump', date: '2025-01-25', disclosureDate: '2025-01-30', ticker: 'DJT', company: 'Trump Media & Technology', type: 'BUY', notional: 2_100_000, disclosureLag: 5, priceAtTrade: 28, priceNow: 42, returnPct: 50.0 },
  { id: 't7', insiderId: 'trump', date: '2025-02-14', disclosureDate: '2025-02-23', ticker: 'DJT', company: 'Trump Media & Technology', type: 'PUT', notional: 650_000, disclosureLag: 9, priceAtTrade: 41, priceNow: 42, returnPct: -2.4 },
  // Pelosi
  { id: 'p1', insiderId: 'pelosi', date: '2024-01-08', disclosureDate: '2024-02-22', ticker: 'NVDA', company: 'NVIDIA Corporation', type: 'CALL', notional: 4_200_000, disclosureLag: 45, priceAtTrade: 50, priceNow: 135, returnPct: 170.0 },
  { id: 'p2', insiderId: 'pelosi', date: '2024-05-20', disclosureDate: '2024-06-17', ticker: 'AAPL', company: 'Apple Inc.', type: 'BUY', notional: 1_800_000, disclosureLag: 28, priceAtTrade: 189, priceNow: 214, returnPct: 13.2 },
  { id: 'p3', insiderId: 'pelosi', date: '2024-08-14', disclosureDate: '2024-09-05', ticker: 'GOOGL', company: 'Alphabet Inc.', type: 'CALL', notional: 2_100_000, disclosureLag: 22, priceAtTrade: 170, priceNow: 195, returnPct: 14.7 },
  { id: 'p4', insiderId: 'pelosi', date: '2024-11-02', disclosureDate: '2024-12-04', ticker: 'AAPL', company: 'Apple Inc.', type: 'SELL', notional: 2_400_000, disclosureLag: 32, priceAtTrade: 225, priceNow: 214, returnPct: -4.9 },
  { id: 'p5', insiderId: 'pelosi', date: '2025-02-10', disclosureDate: '2025-03-04', ticker: 'NVDA', company: 'NVIDIA Corporation', type: 'CALL', notional: 3_500_000, disclosureLag: 22, priceAtTrade: 88, priceNow: 135, returnPct: 53.4 },
  { id: 'p6', insiderId: 'pelosi', date: '2025-04-18', disclosureDate: '2025-05-03', ticker: 'MSFT', company: 'Microsoft Corp.', type: 'CALL', notional: 2_200_000, disclosureLag: 15, priceAtTrade: 380, priceNow: 425, returnPct: 11.8 },
  // Musk
  { id: 'm1', insiderId: 'musk', date: '2024-02-14', disclosureDate: '2024-02-17', ticker: 'TSLA', company: 'Tesla, Inc.', type: 'SELL', notional: 8_500_000, disclosureLag: 3, priceAtTrade: 195, priceNow: 286, returnPct: 46.7 },
  { id: 'm2', insiderId: 'musk', date: '2024-04-22', disclosureDate: '2024-04-24', ticker: 'TSLA', company: 'Tesla, Inc.', type: 'BUY', notional: 12_100_000, disclosureLag: 2, priceAtTrade: 162, priceNow: 286, returnPct: 76.5 },
  { id: 'm3', insiderId: 'musk', date: '2024-08-05', disclosureDate: '2024-08-06', ticker: 'TSLA', company: 'Tesla, Inc.', type: 'SELL', notional: 18_200_000, disclosureLag: 1, priceAtTrade: 218, priceNow: 286, returnPct: 31.2 },
  { id: 'm4', insiderId: 'musk', date: '2025-01-15', disclosureDate: '2025-01-17', ticker: 'TSLA', company: 'Tesla, Inc.', type: 'BUY', notional: 6_800_000, disclosureLag: 2, priceAtTrade: 364, priceNow: 286, returnPct: -21.4 },
  { id: 'm5', insiderId: 'musk', date: '2025-03-08', disclosureDate: '2025-03-09', ticker: 'TSLA', company: 'Tesla, Inc.', type: 'SELL', notional: 15_200_000, disclosureLag: 1, priceAtTrade: 312, priceNow: 286, returnPct: -8.3 },
  { id: 'm6', insiderId: 'musk', date: '2025-05-12', disclosureDate: '2025-05-15', ticker: 'TSLA', company: 'Tesla, Inc.', type: 'BUY', notional: 9_400_000, disclosureLag: 3, priceAtTrade: 244, priceNow: 286, returnPct: 17.2 },
  // RFK
  { id: 'r1', insiderId: 'rfk', date: '2025-02-08', disclosureDate: '2025-02-26', ticker: 'XLV', company: 'Health Care SPDR ETF', type: 'SELL', notional: 890_000, disclosureLag: 18, priceAtTrade: 158, priceNow: 142, returnPct: -10.1 },
  { id: 'r2', insiderId: 'rfk', date: '2025-03-22', disclosureDate: '2025-04-03', ticker: 'XBI', company: 'SPDR Biotech ETF', type: 'CALL', notional: 1_200_000, disclosureLag: 12, priceAtTrade: 87, priceNow: 96, returnPct: 10.3 },
  { id: 'r3', insiderId: 'rfk', date: '2025-04-15', disclosureDate: '2025-04-24', ticker: 'UNH', company: 'UnitedHealth Group', type: 'SELL', notional: 2_100_000, disclosureLag: 9, priceAtTrade: 512, priceNow: 441, returnPct: -13.9 },
  { id: 'r4', insiderId: 'rfk', date: '2025-05-01', disclosureDate: '2025-05-08', ticker: 'MRNA', company: 'Moderna, Inc.', type: 'BUY', notional: 680_000, disclosureLag: 7, priceAtTrade: 38, priceNow: 44, returnPct: 15.8 },
]

export const marketEvents: MarketEvent[] = [
  { date: '2024-01-29', label: 'DJT SPAC merger filed', category: 'announcement' },
  { date: '2024-02-20', label: 'TSLA Q4 earnings miss', category: 'earnings' },
  { date: '2024-03-14', label: 'Truth Social merger closed', category: 'announcement' },
  { date: '2024-04-25', label: 'TSLA Q1 beat', category: 'earnings' },
  { date: '2024-06-10', label: 'Apple WWDC AI reveal', category: 'announcement' },
  { date: '2024-08-05', label: 'Global market selloff', category: 'political' },
  { date: '2024-11-05', label: 'US Election Day', category: 'political' },
  { date: '2025-01-20', label: 'Inauguration / DOGE created', category: 'political' },
  { date: '2025-01-29', label: 'TSLA Q4 beat', category: 'earnings' },
  { date: '2025-02-05', label: 'RFK confirmed as HHS Sec.', category: 'political' },
  { date: '2025-02-26', label: 'NVDA Q4 earnings +10%', category: 'earnings' },
  { date: '2025-03-08', label: 'DOGE federal cuts announced', category: 'policy' },
  { date: '2025-04-15', label: 'UNH fraud probe opened', category: 'announcement' },
  { date: '2025-05-01', label: 'FDA restructured under RFK', category: 'policy' },
  { date: '2025-05-21', label: 'NVDA Q1 +15%', category: 'earnings' },
]

export function formatNotional(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

export function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
}
