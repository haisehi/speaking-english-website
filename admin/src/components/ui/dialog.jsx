import * as React from "react"
import { X } from "lucide-react"

export const Dialog = ({ open, onOpenChange, children }) => {
    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60"
                onClick={() => onOpenChange(false)}
            />
            {/* Dialog Content */}
            <div className="relative z-50 w-full max-w-lg">
                {children}
            </div>
        </div>
    )
}

export const DialogContent = React.forwardRef(({ className, children, onClose, ...props }, ref) => (
    <div
        ref={ref}
        className={`relative bg-white rounded-xl shadow-xl w-full p-6 max-h-[90vh] overflow-y-auto text-gray-900 ${className || ''}`}
        {...props}
    >
        {children}
        <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity text-gray-600 hover:text-gray-900"
        >
            <X className="h-4 w-4" />
        </button>
    </div>
))
DialogContent.displayName = "DialogContent"

export const DialogHeader = ({ className, ...props }) => (
    <div className={`flex flex-col space-y-1.5 mb-4 ${className || ''}`} {...props} />
)

export const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h2
        ref={ref}
        className={`text-lg font-semibold leading-none tracking-tight text-gray-900 ${className || ''}`}
        {...props}
    />
))
DialogTitle.displayName = "DialogTitle"

export const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={`text-sm text-gray-500 ${className || ''}`}
        {...props}
    />
))
DialogDescription.displayName = "DialogDescription"

export const DialogFooter = ({ className, ...props }) => (
    <div className={`flex items-center justify-end gap-2 mt-4 ${className || ''}`} {...props} />
)