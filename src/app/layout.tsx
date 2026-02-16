import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wedding POV - Share Your Memories',
  description: 'Capture and share your point of view from our special wedding day. Upload photos, videos, and messages to create lasting memories.',
  keywords: 'wedding, photos, memories, pov, guest photos, wedding gallery',
  authors: [{ name: 'Wedding POV' }],
  openGraph: {
    title: 'Wedding POV - Share Your Memories',
    description: 'Share your POV from our special day',
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#8b5cf6" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
