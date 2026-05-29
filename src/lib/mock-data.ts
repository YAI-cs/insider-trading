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

export type InsiderNewsItem = {
  id: string
  insiderId: string
  date: string
  headline: string
  source: string
  category: 'trade' | 'political' | 'market' | 'regulatory'
}

export const insiderNews: InsiderNewsItem[] = [
  // Trump
  { id: 'tn1', insiderId: 'trump', date: '2025-02-14', headline: 'Trump discloses PUT option on DJT, first bearish disclosure since taking office', source: 'EDGAR Form 4', category: 'trade' },
  { id: 'tn2', insiderId: 'trump', date: '2025-01-25', headline: 'Trump acquires $2.1M in DJT shares days after inauguration', source: 'EDGAR Form 4', category: 'trade' },
  { id: 'tn3', insiderId: 'trump', date: '2025-01-20', headline: 'Trump inaugurated as 47th President, launches DOGE advisory board', source: 'White House', category: 'political' },
  { id: 'tn4', insiderId: 'trump', date: '2024-11-18', headline: 'Post-election sell: Trump discloses $3.2M DJT liquidation', source: 'EDGAR Form 4', category: 'trade' },
  { id: 'tn5', insiderId: 'trump', date: '2024-11-05', headline: 'Trump wins 2024 presidential election, DJT shares surge 30%', source: 'Associated Press', category: 'political' },
  { id: 'tn6', insiderId: 'trump', date: '2024-09-08', headline: 'DJT rebounds to $19; Trump accumulates shares amid campaign polling gains', source: 'EDGAR Form 4', category: 'trade' },
  { id: 'tn7', insiderId: 'trump', date: '2024-06-27', headline: 'Trump discloses CALL position in DJT — 12-day lag flags potential STOCK Act concern', source: 'Citizens for Responsibility', category: 'regulatory' },
  { id: 'tn8', insiderId: 'trump', date: '2024-03-14', headline: 'Truth Social merger officially closed; DJT begins trading on NASDAQ', source: 'Reuters', category: 'market' },
  // Pelosi
  { id: 'pn1', insiderId: 'pelosi', date: '2025-05-03', headline: 'Pelosi discloses $2.2M MSFT CALL options; Microsoft AI deal with DOD pending vote', source: 'EDGAR Form 4', category: 'trade' },
  { id: 'pn2', insiderId: 'pelosi', date: '2025-03-04', headline: 'Pelosi discloses NVDA CALL with 22-day lag — 53% gain since purchase', source: 'EDGAR Form 4', category: 'trade' },
  { id: 'pn3', insiderId: 'pelosi', date: '2025-02-26', headline: 'NVIDIA Q4 earnings beat sends shares up 10%; Pelosi CALL position up 53%', source: 'Bloomberg', category: 'market' },
  { id: 'pn4', insiderId: 'pelosi', date: '2024-12-04', headline: 'Pelosi AAPL sell disclosed 32 days late; watchdog files STOCK Act complaint', source: 'POGO', category: 'regulatory' },
  { id: 'pn5', insiderId: 'pelosi', date: '2024-09-05', headline: 'Pelosi discloses GOOGL CALL bought in August before DOJ antitrust ruling', source: 'EDGAR Form 4', category: 'trade' },
  { id: 'pn6', insiderId: 'pelosi', date: '2024-06-10', headline: 'Apple reveals AI integrations at WWDC; AAPL surges 8%', source: 'The Verge', category: 'market' },
  { id: 'pn7', insiderId: 'pelosi', date: '2024-02-22', headline: 'Pelosi NVDA CALL disclosed 45 days after purchase — regulators take note', source: 'Unusual Whales', category: 'regulatory' },
  { id: 'pn8', insiderId: 'pelosi', date: '2024-01-08', headline: 'Pelosi buys $4.2M in NVDA CALLs as AI chip bill heads to committee', source: 'EDGAR Form 4', category: 'trade' },
  // Musk
  { id: 'mn1', insiderId: 'musk', date: '2025-05-15', headline: 'Musk discloses $9.4M TSLA buy after stock hits 6-month low', source: 'EDGAR Form 4', category: 'trade' },
  { id: 'mn2', insiderId: 'musk', date: '2025-03-09', headline: 'Musk sells $15.2M TSLA one day after DOGE federal spending cuts announcement', source: 'EDGAR Form 4', category: 'trade' },
  { id: 'mn3', insiderId: 'musk', date: '2025-03-08', headline: 'DOGE announces sweeping federal contractor cuts; TSLA contract exposure questioned', source: 'Washington Post', category: 'political' },
  { id: 'mn4', insiderId: 'musk', date: '2025-01-29', headline: 'TSLA Q4 beat: EPS $0.73 vs $0.60 est; deliveries record high', source: 'Tesla IR', category: 'market' },
  { id: 'mn5', insiderId: 'musk', date: '2025-01-17', headline: 'Musk discloses $6.8M TSLA purchase ahead of DOGE announcement', source: 'EDGAR Form 4', category: 'trade' },
  { id: 'mn6', insiderId: 'musk', date: '2024-08-06', headline: 'Musk sells $18.2M in TSLA amid global market selloff', source: 'EDGAR Form 4', category: 'trade' },
  { id: 'mn7', insiderId: 'musk', date: '2024-04-24', headline: 'Musk buys $12.1M TSLA after stock drops 35% YTD on delivery miss concerns', source: 'EDGAR Form 4', category: 'trade' },
  { id: 'mn8', insiderId: 'musk', date: '2024-02-20', headline: 'TSLA Q4 2023 earnings miss — EPS $0.71 vs $0.74 est; Musk sells $8.5M', source: 'EDGAR Form 4', category: 'trade' },
  // RFK
  { id: 'rn1', insiderId: 'rfk', date: '2025-05-08', headline: 'RFK discloses $680K MRNA buy — weeks after FDA restructuring memo leaked', source: 'EDGAR Form 4', category: 'trade' },
  { id: 'rn2', insiderId: 'rfk', date: '2025-05-01', headline: 'HHS announces FDA restructuring under RFK; vaccine division reorganized', source: 'HHS Press Release', category: 'political' },
  { id: 'rn3', insiderId: 'rfk', date: '2025-04-24', headline: 'RFK sells $2.1M UNH weeks before DOJ fraud probe surfaces publicly', source: 'EDGAR Form 4', category: 'trade' },
  { id: 'rn4', insiderId: 'rfk', date: '2025-04-15', headline: 'DOJ opens UnitedHealth fraud probe; UNH drops 12% in one session', source: 'Wall Street Journal', category: 'regulatory' },
  { id: 'rn5', insiderId: 'rfk', date: '2025-04-03', headline: 'RFK discloses XBI CALL amid leaked biotech deregulation briefing at HHS', source: 'EDGAR Form 4', category: 'trade' },
  { id: 'rn6', insiderId: 'rfk', date: '2025-02-26', headline: 'RFK discloses XLV sell 18 days after trade — coincides with HHS budget cuts', source: 'EDGAR Form 4', category: 'trade' },
  { id: 'rn7', insiderId: 'rfk', date: '2025-02-05', headline: 'Senate confirms RFK Jr. as Secretary of Health and Human Services 52–48', source: 'C-SPAN', category: 'political' },
  { id: 'rn8', insiderId: 'rfk', date: '2025-02-08', headline: 'RFK sells health care ETF XLV days after being confirmed at HHS — ethics questions raised', source: 'ProPublica', category: 'regulatory' },
]

export function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
}
