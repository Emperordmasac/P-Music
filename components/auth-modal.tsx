"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Auth } from "@supabase/auth-ui-react"
import {
  useSessionContext,
  useSupabaseClient
} from "@supabase/auth-helpers-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"

import Modal from "@/components/global/modal"
import useAuthModal from "@/hooks/use-auth-modal"

export default function AuthModal() {
  const supabaseClient = useSupabaseClient()
  const session = useSessionContext()
  const router = useRouter()
  const { onClose, isOpen } = useAuthModal()

  useEffect(() => {
    if (session) {
      router.refresh()
      onClose()
    }
  }, [router, onClose, session])

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <Modal
      title="Welcome back"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="dark"
        magicLink
        providers={["google", "github"]}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",

                brandAccent: "#22c55e"
              }
            }
          }
        }}
      />
    </Modal>
  )
}
