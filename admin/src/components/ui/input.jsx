import * as React from "react"

export const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            ref={ref}
            {...props}
            className={`flex h-10 w-full rounded-md 
                bg-white dark:bg-white 
                border border-gray-300 
                px-3 py-2 text-sm 
                text-gray-900 placeholder:text-gray-400
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500
                disabled:cursor-not-allowed disabled:opacity-50
                ${className || ""}`}
        />
    )
})

Input.displayName = "Input"
