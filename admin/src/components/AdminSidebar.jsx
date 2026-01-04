import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

import {
  LayoutDashboard,
  BookOpen,
  FileText,
  BookMarked,
  Dumbbell,
  Mic,
  BarChart3,
  Settings,
  Globe,
  LogOut,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Course Management", icon: BookOpen, path: "/courses" },
  { title: "Lesson Management", icon: FileText, path: "/lessons" },
  { title: "Vocabulary Management", icon: BookMarked, path: "/vocabulary" },
  { title: "Exercise Management", icon: Dumbbell, path: "/exercises" },
  { title: "Speaking Practice", icon: Mic, path: "/speakingTopic" },
];

export default function AdminSidebar() {
  const [location, setLocation] = useLocation();
  const admin = JSON.parse(localStorage.getItem("admin_info") || "{}");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="font-semibold text-lg">EnglishApp</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={location === item.path}
                    onClick={() => setLocation(item.path)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t mt-auto">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={admin.avatar} />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium">{admin.full_name}</div>
            <div className="text-xs text-muted-foreground">{admin.email}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <Button variant="ghost" size="sm" className="flex-1 gap-2">
            <Globe className="h-4 w-4" /> EN
          </Button>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
