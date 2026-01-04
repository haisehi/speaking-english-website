import * as React from "react"

export const SidebarProvider = ({ children, style }) => {
    return <div style={style}>{children}</div>
}

export const Sidebar = ({ children, className }) => {
    return (
        <aside className={`w-64 border-r bg-background ${className || ''}`}>
            {children}
        </aside>
    )
}

export const SidebarHeader = ({ children, className }) => {
    return <div className={className}>{children}</div>
}

export const SidebarContent = ({ children }) => {
    return <div className="flex-1 overflow-auto py-2">{children}</div>
}

export const SidebarFooter = ({ children, className }) => {
    return <div className={className}>{children}</div>
}

export const SidebarGroup = ({ children }) => {
    return <div className="px-3 py-2">{children}</div>
}

export const SidebarGroupContent = ({ children }) => {
    return <div>{children}</div>
}

export const SidebarMenu = ({ children }) => {
    return <ul className="space-y-1">{children}</ul>
}

export const SidebarMenuItem = ({ children }) => {
    return <li>{children}</li>
}

export const SidebarMenuButton = React.forwardRef(({ asChild, isActive, children, className, ...props }, ref) => {
    const activeClass = isActive ? "bg-accent text-accent-foreground" : ""

    if (asChild) {
        return React.cloneElement(children, {
            className: `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent ${activeClass} ${className || ''}`,
            ref,
            ...props
        })
    }

    return (
        <button
            ref={ref}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent ${activeClass} ${className || ''}`}
            {...props}
        >
            {children}
        </button>
    )
})
SidebarMenuButton.displayName = "SidebarMenuButton"

export const SidebarTrigger = ({ className, ...props }) => {
    return (
        <button
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-10 w-10 ${className || ''}`}
            {...props}
        >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
        </button>
    )
}