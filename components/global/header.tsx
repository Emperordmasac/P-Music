"use client"

import toast from "react-hot-toast"
import { HiHome } from "react-icons/hi"
import { twMerge } from "tailwind-merge"
import { BiSearch } from "react-icons/bi"
import { useRouter } from "next/navigation"
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

import { useUser } from "@/hooks/use-user"
import Button from "@/components/ui/button"
import useAuthModal from "@/hooks/use-auth-modal"
import { FaUserAlt } from "react-icons/fa"

interface HeaderProps {
  className?: string
  children: React.ReactNode
}

export default function Header({ className, children }: HeaderProps) {
  const router = useRouter()
  const authModal = useAuthModal()

  const supabaseClient = useSupabaseClient()
  const { user } = useUser()

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut()
    //--TODO Reset any playing songs in the future
    router.refresh()
    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Logged out!")
    }
  }

  return (
    <div
      className={twMerge(
        " h-fit bg-gradient-to-b from-emerald-800 p-6",
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className=" rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft size={35} className=" text-white" />
          </button>
          <button
            onClick={() => router.forward()}
            className=" rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight size={35} className=" text-white" />
          </button>
        </div>

        <div className="flex md:hidden gap-x-2 items-center">
          <button className=" rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome className=" text-black " size={20} />
          </button>

          <button className=" rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch className=" text-black " size={20} />
          </button>
        </div>

        <div className="flex items-center justify-between gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button onClick={handleLogout} className=" bg-white px-6 py-2">
                Logout
              </Button>
              <Button onClick={() => router.push("/account")}>
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className=" bg-transparent text-neutral-300 font-medium"
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className=" bg-white px-6 py-2"
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {children}
    </div>
  )
}
