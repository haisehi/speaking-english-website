import {
  Users,
  UserPlus,
  TrendingUp,
  Award,
  Lightbulb,
  Flame,
  TrendingUp as TrendIcon,
  Clock,
} from "lucide-react";

import StatCard from "@/components/StatCard";
import InsightCard from "@/components/InsightCard";
import UserGrowthChart from "@/components/UserGrowthChart";
import CourseCompletionChart from "@/components/CourseCompletionChart";
import UserStatusChart from "@/components/UserStatusChart";
import SkillsPerformanceChart from "@/components/SkillsPerformanceChart";
import UserManagementTable from "@/components/UserManagementTable";
import TopLearnersCard from "@/components/TopLearnersCard";

import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getLeaderboard } from "@/services/user.service";

export default function Dashboard() {
  /* =========================
     SECTION 1: STAT CARDS
     (Tạm thời vẫn là mock vì backend chưa có API thống kê)
  ========================== */
  const statsData = [
    {
      icon: Users,
      iconBgColor: "#E3F2FD",
      iconColor: "#2196F3",
      value: "—",
      label: "Total Users",
      change: "",
      changeColor: "text-green-600",
    },
    {
      icon: UserPlus,
      iconBgColor: "#F3E5F5",
      iconColor: "#9C27B0",
      value: "—",
      label: "New Sign-ups",
      change: "",
      changeColor: "text-green-600",
    },
    {
      icon: TrendingUp,
      iconBgColor: "#E8F5E9",
      iconColor: "#4CAF50",
      value: "—",
      label: "Monthly Growth",
      change: "",
      changeColor: "text-green-600",
    },
    {
      icon: Award,
      iconBgColor: "#FFF9C4",
      iconColor: "#F57F17",
      value: "—",
      label: "Completion Rate",
      change: "",
      changeColor: "text-green-600",
    },
  ];

  /* =========================
     SECTION 2: INSIGHTS
     (Vẫn là mock – chưa có API tương ứng)
  ========================== */
  const insightsData = [
    {
      icon: Lightbulb,
      iconBgColor: "#FFF9C4",
      iconColor: "#F57F17",
      title: "At Risk Users",
      value: "—",
      description: "Users inactive for 7+ days",
      cardBgColor: "#FFFEF0",
    },
    {
      icon: Flame,
      iconBgColor: "#FFEBEE",
      iconColor: "#D32F2F",
      title: "Most Consistent",
      value: "—",
      description: "Daily active learners",
      cardBgColor: "#FFF5F5",
    },
    {
      icon: TrendIcon,
      iconBgColor: "#F3E5F5",
      iconColor: "#7B1FA2",
      title: "Learning Trend",
      value: "—",
      description: "Weekly engagement",
      cardBgColor: "#FAF5FF",
    },
    {
      icon: Clock,
      iconBgColor: "#E0F2F1",
      iconColor: "#00796B",
      title: "Study Time",
      value: "—",
      description: "Avg time per user",
      cardBgColor: "#F0FAF9",
    },
  ];

  /* =========================
     SECTION 3: CHART DATA
     (Mock – backend chưa có)
  ========================== */
  const userGrowthData = [
    { week: "Week 1", users: 400 },
    { week: "Week 2", users: 600 },
    { week: "Week 3", users: 800 },
    { week: "Week 4", users: 950 },
    { week: "Week 5", users: 1100 },
    { week: "Week 6", users: 1400 },
  ];

  const courseCompletionData = [
    { level: "Beginner", completion: 75, color: "#7C4DFF" },
    { level: "Intermediate", completion: 65, color: "#7C4DFF" },
    { level: "Advanced", completion: 48, color: "#7C4DFF" },
    { level: "Business", completion: 52, color: "#7C4DFF" },
  ];

  const userStatusData = [
    { name: "Active", value: 66, color: "#4CAF50", percentage: "66%" },
    { name: "Inactive", value: 23, color: "#F44336", percentage: "23%" },
    { name: "Pending", value: 11, color: "#FFC107", percentage: "11%" },
  ];

  const skillsData = [
    { skill: "Listening", score: 85 },
    { skill: "Speaking", score: 90 },
    { skill: "Reading", score: 75 },
    { skill: "Writing", score: 80 },
  ];

  /* =========================
     SECTION 4: USERS (API)
     GET /api/v1/users
  ========================== */
  const { data: usersData = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    select: (res) =>
      res.data.map((user) => ({
        id: user.id,
        name: user.fullName,
        email: user.email,
        phone: user.phone,
        status: user.status === 1 ? "active" : "inactive",
        lastLogin: "—",
      })),
  });

  /* =========================
     SECTION 5: LEADERBOARD (API)
     GET /api/v1/user-test/leaderboard
     (Cần access token)
  ========================== */
  const { data: topLearnersData = [] } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: getLeaderboard,
    select: (res) =>
      res.data.map((item) => ({
        id: item.userId,
        rank: item.rank,
        name: item.fullName,
        level: "—",
        xp: item.totalScore,
        avatar: item.avatar,
      })),
  });

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* ===== SECTION 1: OVERVIEW ===== */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground mb-6">
          Welcome back! Here's what's happening with your platform today.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>

      {/* ===== SECTION 2: CHARTS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <UserGrowthChart data={userGrowthData} />
        <CourseCompletionChart data={courseCompletionData} />
      </div>

      {/* ===== SECTION 3: MORE CHARTS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <UserStatusChart data={userStatusData} />
        <SkillsPerformanceChart data={skillsData} />
      </div>

      {/* ===== SECTION 4: USER TABLE ===== */}
      <div className="mb-8">
        <UserManagementTable
          users={usersData}
          loading={usersLoading}
          onAddUser={() => console.log("Add new user")}
          onEditUser={(id) => console.log("Edit user:", id)}
          onDeleteUser={(id) => console.log("Delete user:", id)}
        />
      </div>

      {/* ===== SECTION 5: LEADERBOARD ===== */}
      <div>
        <TopLearnersCard learners={topLearnersData} />
      </div>
    </div>
  );
}
