import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { TooltipProvider } from "../components/ui/tooltip";
import { SidebarProvider } from "../components/ui/sidebar";
import { Toaster } from "../components/ui/toaster";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation, Router } from "wouter"; // 👈 thêm Router
import { Button } from "../components/ui/button";
import { MessageSquare } from "lucide-react";
import AdminRouter from "../pages/admin/AdminRouter";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function AdminLayout() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [location] = useLocation();
  const vocabularyRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  const showChatButton = location === "/admin";

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme(t => t === "light" ? "dark" : "light") }}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SidebarProvider style={style}>
            <div className="flex h-screen w-full">
              <AdminSidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <AdminHeader onAddWord={() => vocabularyRef.current?.openAddDialog?.()} />

                <main className="flex-1 overflow-y-auto bg-background relative">
                  {/* ✅ BỌC ROUTER BASE */}
                  <Router base="/admin">
                    <AdminRouter vocabularyRef={vocabularyRef} />
                  </Router>

                  {showChatButton && (
                    <Button
                      className="fixed bottom-6 right-6 h-14 w-14 rounded-full"
                      size="icon"
                    >
                      <MessageSquare className="h-6 w-6 text-white" />
                    </Button>
                  )}
                </main>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeContext.Provider>
  );
}
