import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, suffix, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-11 w-full rounded-xl border border-input bg-transparent px-4 py-2 text-sm shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50",
            suffix && "pr-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {suffix}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
