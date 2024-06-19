"use client"

import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { useSessionContext } from "@supabase/auth-helpers-react"

import { useUser } from "@/hooks/use-user"
import useAuthModal from "@/hooks/use-auth-modal"

interface LikeButtonProps {
  songId: string
}

export default function LikeButton({ songId }: LikeButtonProps) {
  const router = useRouter()

  const { supabaseClient } = useSessionContext()

  const authModal = useAuthModal()
  const { user } = useUser()

  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (!user?.id) {
      return
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single()

      if (!error && data) {
        setIsLiked(true)
      }
    }

    fetchData()
  }, [user?.id, supabaseClient, songId])

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen()
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId)

      if (error) {
        toast.error(error.message)
      } else {
        setIsLiked(false)
        toast.success("Remove from liked songs")
      }
    } else {
      const { error } = await supabaseClient.from("liked_songs").insert({
        song_id: songId,
        user_id: user.id
      })

      if (error) {
        toast.error(error.message)
      } else {
        setIsLiked(true)
        toast.success("Added to liked songs")
      }
    }
  }

  return (
    <button onClick={handleLike} className=" transition hover:opacity-75">
      <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
    </button>
  )
}
