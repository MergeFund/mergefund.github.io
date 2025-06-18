import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'MergeFund - The Developer $idehustle ',
  description: 'MergeFund incentivizes developers with cryptocurrency rewards for contributing to open-source projects. Build your reputation while earning real rewards.',
  icons: {
    icon: "/assets/roundedLogoNoWords.png",          
    shortcut: "/assets/roundedLogoNoWords.png",
    apple: "/assets/roundedLogoNoWords.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins`}>{children}</body>
    </html>
  )
} 