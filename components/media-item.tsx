"use client"

import useLoadImage from "@/hooks/use-load-image"
import { Song } from "@/types"
import Image from "next/image"

interface MediaItemProps {
  song: Song
  onClick?: (id: string) => void
}

export default function MediaItem({ song, onClick }: MediaItemProps) {
  const imageUrl = useLoadImage(song)

  const handleClick = () => {
    if (onClick) {
      return onClick(song.id)
    }

    // -- TODO: Default turn on player
  }

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          src={imageUrl || "/images/liked.png"}
          alt="media image"
          fill
          className=" object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className=" text-white truncate">{song.title}</p>
        <p className=" text-neutral-400 text-sm truncate">{song.author}</p>
      </div>
    </div>
  )
}
