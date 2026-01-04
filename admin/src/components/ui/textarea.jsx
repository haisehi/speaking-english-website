import * as React from "react"

export const Textarea = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <textarea
            ref={ref}
            {...props}
            className={`
                flex min-h-[120px] w-full resize-none rounded-md
                border border-gray-200 dark:border-gray-700
                bg-white text-black
                dark:bg-black dark:text-white
                px-3 py-2 text-sm
                placeholder:text-gray-400 dark:placeholder:text-gray-500
                focus:outline-none focus:ring-2 focus:ring-blue-500
                disabled:cursor-not-allowed disabled:opacity-50
                ${className || ""}
            `}
        />
    )
})

Textarea.displayName = "Textarea"
