import * as React from "react"
import { ChevronDown, Check } from "lucide-react"

export const Select = ({ value, onValueChange, defaultValue, children }) => {
    const [open, setOpen] = React.useState(false)
    const [selectedValue, setSelectedValue] = React.useState(defaultValue || value || "")

    const handleToggle = () => {
        setOpen(!open)
    }

    const handleSelect = (val) => {
        setSelectedValue(val)
        if (onValueChange) {
            onValueChange(val)
        }
        setOpen(false)
    }

    return (
        <div className="relative w-full">
            {React.Children.map(children, child => {
                if (!child) return null

                if (child.type === SelectTrigger) {
                    return React.cloneElement(child, {
                        onClick: handleToggle,
                        open,
                        selectedValue,
                        children: React.Children.map(children, c => {
                            if (c && c.type === SelectContent) {
                                const selectedItem = React.Children.toArray(c.props.children).find(
                                    item => item && item.props && item.props.value === selectedValue
                                )
                                return selectedItem ? selectedItem.props.children : child.props.children
                            }
                            return child.props.children
                        })
                    })
                }

                if (child.type === SelectContent) {
                    if (!open) return null
                    return React.cloneElement(child, {
                        onSelect: handleSelect,
                        value: selectedValue
                    })
                }

                return null
            })}
        </div>
    )
}

export const SelectTrigger = React.forwardRef(({ className, children, onClick, open, selectedValue, ...props }, ref) => {
    return (
        <button
            ref={ref}
            type="button"
            className={`flex h-10 w-full items-center justify-between whitespace-nowrap rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ''}`}
            onClick={onClick}
            {...props}
        >
            <span className="text-gray-900 dark:text-gray-100 truncate">{children}</span>
            <ChevronDown className={`h-4 w-4 ml-2 flex-shrink-0 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
    )
})
SelectTrigger.displayName = "SelectTrigger"

export const SelectValue = ({ placeholder }) => {
    return <span className="text-gray-500">{placeholder}</span>
}

export const SelectContent = ({ children, onSelect, value }) => {
    return (
        <div className="absolute z-50 mt-1 w-full min-w-[8rem] overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md">
            <div className="max-h-60 overflow-auto p-1">
                {React.Children.map(children, child => {
                    if (!child) return null
                    return React.cloneElement(child, {
                        onSelect,
                        isSelected: child.props.value === value
                    })
                })}
            </div>
        </div>
    )
}

export const SelectItem = ({ value, children, onSelect, isSelected }) => {
    return (
        <div
            className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none hover:bg-gray-100 dark:hover:bg-gray-700 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            onClick={() => {
                onSelect(value)
            }}
        >
            <span className="flex-1 text-gray-900 dark:text-gray-100">{children}</span>
            {isSelected && <Check className="h-4 w-4 text-blue-600" />}
        </div>
    )
}