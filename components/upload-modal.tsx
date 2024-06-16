"use client"

import uniqid from "uniqid"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import Input from "@/components/ui/input"
import { useUser } from "@/hooks/use-user"
import Button from "@/components/ui/button"
import Modal from "@/components/global/modal"
import useUploadModal from "@/hooks/use-upload-modal"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

export default function UploadModal() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const supabaseClient = useSupabaseClient()
  const uploadModal = useUploadModal()
  const router = useRouter()
  const { user } = useUser()

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null
    }
  })

  const onChange = (open: boolean) => {
    if (!open) {
      reset()
      uploadModal.onClose()
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true)

      const songFile = values.song?.[0]
      const imageFile = values.image?.[0]

      if (!user || !songFile || !imageFile) {
        toast.error("Missing fields")
        return
      }
      const uniqueID = uniqid()

      // Upload Song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false
        })

      if (songError) {
        setIsLoading(false)
        return toast.error("Failed to upload song")
      }

      // Upload Image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false
          })

      if (imageError) {
        setIsLoading(false)
        return toast.error("Failed to upload image")
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path
        })

      if (supabaseError) {
        setIsLoading(false)
        return toast.error(supabaseError.message)
      }

      router.refresh()
      setIsLoading(false)
      toast.success("Song uploaded successfully")
      reset()
      uploadModal.onClose()
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 song"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          disabled={isLoading}
          id="title"
          {...register("title", { required: true })}
          placeholder="Song title"
        />
        <Input
          disabled={isLoading}
          id="author"
          {...register("author", { required: true })}
          placeholder="Song author"
        />

        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            disabled={isLoading}
            id="song"
            type="file"
            accept=".mp3"
            {...register("song", { required: true })}
          />
        </div>

        <div>
          <div className="pb-1">Select an Image</div>
          <Input
            disabled={isLoading}
            id="image"
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>

        <Button disabled={isLoading} type="submit">
          {isLoading ? "Uploading..." : "Upload"}
        </Button>
      </form>
    </Modal>
  )
}
