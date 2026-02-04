import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ShadowTrust - Agent Reputation Ledger',
  description: 'Unified reputation layer for autonomous agents on Solana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
