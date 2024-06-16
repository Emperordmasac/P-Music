"use client"

import { TbPlaylist } from "react-icons/tb"
import { AiOutlinePlus } from "react-icons/ai"

import { useUser } from "@/hooks/use-user"
import useAuthModal from "@/hooks/use-auth-modal"
import useUploadModal from "@/hooks/use-upload-modal"

export default function SongLibrary() {
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()
  const { user } = useUser()

  const handleUpload = () => {
    if (!user) {
      return authModal.onOpen()
    }
    // -- TODO: Check for subsription
    return uploadModal.onOpen()
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className=" text-neutral-400" size={26} />
          <p className=" text-neutral-400 font-medium text-md">Your library</p>
        </div>
        <AiOutlinePlus
          size={20}
          onClick={handleUpload}
          className=" text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>

      <div className="flex flex-col gap-y-2 mt-4 px-3">List of songs</div>
    </div>
  )
}
