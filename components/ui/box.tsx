import { twMerge } from "tailwind-merge"

interface BoxProps {
  className?: string
  children: React.ReactNode
}

export default function Box({ className, children }: BoxProps) {
  return (
    <div
      className={twMerge(" bg-neutral-900 rounded-lg h-fit w-full", className)}
    >
      {children}
    </div>
  )
}
