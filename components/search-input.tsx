"use client"

import { useEffect, useState } from "react"
import qs from "query-string"
import { useRouter } from "next/navigation"

import Input from "@/components/ui/input"
import { useDebounce } from "@/hooks/use-debounce"

export default function SearchInput() {
  const router = useRouter()
  const [value, setValue] = useState<string>("")

  const debouncedValue = useDebounce<string>(value, 500)

  useEffect(() => {
    const query = {
      title: debouncedValue
    }

    const url = qs.stringifyUrl({
      url: "/search",
      query: query
    })

    router.push(url)
  }, [debouncedValue, router])

  return (
    <Input
      placeholder="What do you want to listen to ?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}