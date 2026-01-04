import { Search, Bell, Moon, Sun } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/App";
import { useLocation } from "wouter";

export default function AdminHeader({ onAddWord }) {
    const { theme, toggleTheme } = useTheme();
    const [location] = useLocation();

    // Chỉ hiển thị nút "Add New Word" khi ở trang Vocabulary
    const showAddWordButton = location === "/vocabulary";

    return (
        <header className="border-b bg-background px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                    <SidebarTrigger data-testid="button-sidebar-toggle" />
                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search users, courses..."
                            className="pl-10"
                            data-testid="input-search"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                    {/* Hàng 1: Notification, Dark Mode, Avatar */}
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative"
                            data-testid="button-notifications"
                        >
                            <Bell className="h-5 w-5" />
                            <Badge
                                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs"
                            >
                                3
                            </Badge>
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            data-testid="button-theme-toggle"
                        >
                            {theme === "dark" ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </Button>

                        <Avatar className="h-10 w-10 cursor-pointer" data-testid="avatar-admin">
                            <AvatarFallback>AU</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </div>
        </header>
    );
}