import type { Metadata } from "next"
import { Figtree } from "next/font/google"

import "./globals.css"

import Siderbar from "@/components/global/sidebar"

const font = Figtree({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "P-Music",
  description: "Listen to the music you love"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Siderbar>{children}</Siderbar>
      </body>
    </html>
  )
}