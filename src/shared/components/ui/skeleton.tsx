import { cn } from "@/shared/utils"

export interface SkeletonProps extends React.ComponentProps<"div"> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-primary/10 animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }