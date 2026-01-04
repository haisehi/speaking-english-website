import * as React from "react"

export const Card = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={`rounded-lg border bg-card text-card-foreground shadow-sm p-6 ${className || ''}`}
        {...props}
    />
))
Card.displayName = "Card"