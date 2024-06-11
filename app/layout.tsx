import type { Metadata } from "next"
import { Figtree } from "next/font/google"

import "./globals.css"

import Siderbar from "@/components/global/sidebar"
import UserProvider from "@/providers/user-provider"
import ModalProvider from "@/providers/modal-provider"
import SupabaseProvider from "@/providers/supabase-provider"
import ToasterProvider from "@/providers/toaster-provider"

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
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Siderbar>{children}</Siderbar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
