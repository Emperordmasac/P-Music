"use client"

import { useMemo } from "react"
import { HiHome } from "react-icons/hi"
import { BiSearch } from "react-icons/bi"
import { usePathname } from "next/navigation"

import Box from "@/components/ui/box"
import SongLibrary from "@/components/song-library"
import SidebarItem from "@/components/global/sidebar-item"

interface SidebarProps {
  children: React.ReactNode
}

export default function Siderbar({ children }: SidebarProps) {
  const pathname = usePathname()

  const routes = useMemo(
    () => [
      {
        label: "Home",
        icon: HiHome,
        active: pathname !== "/search",
        href: "/"
      },
      {
        label: "Search",
        icon: BiSearch,
        active: pathname == "/search",
        href: "/search"
      }
    ],
    [pathname]
  )
  return (
    <div className="flex h-full">
      <div className="hidden md:flex flex-col h-full gap-y-2 bg-black w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className=" overflow-y-auto h-full">
          <SongLibrary />
        </Box>
      </div>
      <main className=" h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  )
}
