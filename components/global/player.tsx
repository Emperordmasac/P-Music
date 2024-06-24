"use client"

import usePlayer from "@/hooks/use-player"
import { useGetSongById } from "@/hooks/use-get-song-by-id"
import { useLoadSupabaseSong } from "@/hooks/user-load-supabase-song"
import PlayerContent from "@/components/player-content"

export default function Player() {
  const player = usePlayer()

  const { song } = useGetSongById(player.activeId)

  const songUrl = useLoadSupabaseSong(song!)

  if (!song || !songUrl || !player.activeId) {
    return null
  }

  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  )
}
