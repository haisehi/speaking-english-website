import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";

import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";

import Dashboard from "@/pages/Dashboard";
import UserDetail from "@/pages/UserDetail";
import CourseManagement from "@/pages/CourseManagement";
import LessonManagement from "@/pages/LessonManagement";
import VocabularyManagement from "@/pages/VocabularyManagement";
import ExerciseManagement from "@/pages/ExerciseManagement";
import QuestionsManagement from "@/pages/QuestionsManagement";
import AnswersManagement from "@/pages/AnswersManagement";
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import SpeakingTopicsManagement from "@/pages/SpeakingTopicsManagement";
import PrivateRoute from "@/components/PrivateRoute";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import SpeakingLessonsManagement from "./pages/SpeakingLessonsManagement";
import SpeakingSentencesManagement from "./pages/SpeakingSentencesManagement";

// ===== THEME CONTEXT (GIỮ NGUYÊN) =====
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

// ===== ROUTER ADMIN =====
function AdminRouter({ vocabularyRef }) {
  return (
    <Switch>
      <PrivateRoute path="/" component={Dashboard} />
      <PrivateRoute path="/user/:id" component={UserDetail} />
      <PrivateRoute path="/courses" component={CourseManagement} />
      <PrivateRoute path="/lessons" component={LessonManagement} />
      <PrivateRoute path="/speakingTopic" component={SpeakingTopicsManagement} />
      <PrivateRoute path="/vocabulary">
        {() => <VocabularyManagement ref={vocabularyRef} />}
      </PrivateRoute>
      <PrivateRoute path="/exercises" component={ExerciseManagement} />
      <PrivateRoute path="/questions/:testId" component={QuestionsManagement} />
      <PrivateRoute path="/answers/:id" component={AnswersManagement} />
      <PrivateRoute path="/speaking-lessons/:topicId" component={SpeakingLessonsManagement} />
      <PrivateRoute
  path="/speaking-sentences/:lessonId"
  component={SpeakingSentencesManagement}
/>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [location] = useLocation();
  const vocabularyRef = useRef(null);

  const isLoginPage = location === "/login";

  useEffect(() => {
    const root = document.documentElement;
    theme === "dark" ? root.classList.add("dark") : root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme(t => t === "light" ? "dark" : "light") }}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {!isLoginPage ? (
            <SidebarProvider style={style}>
              <div className="flex h-screen w-full">
                <AdminSidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                  <AdminHeader />
                  <main className="flex-1 overflow-y-auto bg-background relative">
                    <AdminRouter vocabularyRef={vocabularyRef} />
                    {location === "/" && (
                      <Button className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600" size="icon">
                        <MessageSquare className="h-6 w-6 text-white" />
                      </Button>
                    )}
                  </main>
                </div>
              </div>
            </SidebarProvider>
          ) : (
            <Switch>
              <Route path="/login" component={Login} />
            </Switch>
          )}
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeContext.Provider>
  );
}

export default App;
