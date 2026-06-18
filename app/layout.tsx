import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GKFXL — From Zero to Company Owner',
  description: 'We transform beginners into company owners by teaching mindset, skills, and real startup building step-by-step.',
  keywords: 'startup, founder, learn, build company, entrepreneurship',
  openGraph: {
    title: 'GKFXL — From Zero to Company Owner',
    description: 'Transform beginners into company owners.',
    type: 'website',
  },
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
