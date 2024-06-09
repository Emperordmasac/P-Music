import type { Metadata } from "next"
import { Figtree } from "next/font/google"

import "./globals.css"

import Siderbar from "@/components/global/sidebar"
import UserProvider from "@/providers/user-provider"
import SupabaseProvider from "@/providers/supabase-provider"

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
        <SupabaseProvider>
          <UserProvider>
            <Siderbar>{children}</Siderbar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
