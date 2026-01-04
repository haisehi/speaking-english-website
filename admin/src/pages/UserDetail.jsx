import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import {
    ArrowLeft,
    Mail,
    Phone,
    Calendar,
    Clock,
    BookOpen,
    Target,
    TrendingUp,
    Lightbulb,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import { getUserById } from "@/services/user.service";

export default function UserDetail() {
    const [, params] = useRoute("/user/:id");
    const [, setLocation] = useLocation();
    const userId = params?.id;

    /* =========================
       API: GET USER DETAIL
    ========================== */
    const { data: apiUser } = useQuery({
        queryKey: ["user-detail", userId],
        queryFn: () => getUserById(userId),
        enabled: !!userId,
        select: (res) => res.data,
    });

    /* =========================
       MAP API → UI DATA
       (GIỮ NGUYÊN SHAPE)
    ========================== */
    const userData = {
        id: userId,
        name: apiUser?.fullName || "—",
        avatar: apiUser?.avatar || "",
        email: apiUser?.email || "—",
        phone: apiUser?.phone || "—",
        level: "Level —",
        status: apiUser?.status === 1 ? "Active" : "Inactive",
        joined: apiUser?.createDate || "-",
        lastLogin: "—",
    };

    /* =========================
       MOCK DATA (GIỮ NGUYÊN)
    ========================== */
    const courseProgress = [
        { name: "English for Beginners", progress: 85, lessons: 24 },
        { name: "Business English", progress: 60, lessons: 18 },
        { name: "Advanced Grammar", progress: 42, lessons: 15 },
    ];

    const weeklyStudyData = [
        { day: "Mon", hours: 5 },
        { day: "Tue", hours: 6 },
        { day: "Wed", hours: 4 },
        { day: "Thu", hours: 7 },
        { day: "Fri", hours: 6 },
        { day: "Sat", hours: 7.5 },
        { day: "Sun", hours: 6 },
    ];

    const quickStats = [
        { label: "Courses", value: "3", icon: BookOpen },
        { label: "Tests Passed", value: "18", icon: Target },
        { label: "Leaderboard", value: "#47", icon: TrendingUp },
        { label: "Total XP", value: "6,845", icon: Target },
    ];

    const suggestions = [
        {
            title: "Strong in Reading & Writing",
            description:
                "User shows excellent progress in written skills. Consider advanced reading materials.",
        },
        {
            title: "Needs Practice in Listening",
            description:
                "Recommend more podcast exercises and video lessons to improve listening comprehension.",
        },
    ];

    const recentActivity = [
        { title: "Completed Lesson 24", time: "2 hours ago" },
        { title: "Passed Grammar Test", time: "1 day ago" },
        { title: "Started Business English", time: "3 days ago" },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Header với nút Back */}
            <div className="border-b bg-background px-6 py-4">
                <Button
                    variant="ghost"
                    className="gap-2"
                    onClick={() => setLocation("/")}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Button>
            </div>

            <div className="p-8 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Cột trái */}
                    <div className="lg:col-span-1">
                        <Card className="p-6">
                            <div className="flex flex-col items-center text-center mb-6">
                                <Avatar className="h-24 w-24 mb-4">
                                    <AvatarImage
                                        src={userData.avatar}
                                        alt={userData.name}
                                    />
                                    <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                                        {userData.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <h2 className="text-xl font-bold mb-1">
                                    {userData.name}
                                </h2>
                                <p className="text-sm text-muted-foreground mb-2">
                                    {userData.level}
                                </p>
                                <Badge className="bg-green-100 text-green-700">
                                    {userData.status}
                                </Badge>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    <span>{userData.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <Phone className="h-4 w-4" />
                                    <span>{userData.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>Joined: {userData.joined}</span>
                                </div>
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>Last login: {userData.lastLogin}</span>
                                </div>
                            </div>
                        </Card>

                        {/* Quick Stats */}
                        <Card className="p-6 mt-6">
                            <h3 className="font-semibold mb-4">Quick Stats</h3>
                            <div className="space-y-3">
                                {quickStats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-2">
                                            <stat.icon className="h-4 w-4 text-blue-600" />
                                            <span className="text-sm">
                                                {stat.label}
                                            </span>
                                        </div>
                                        <span className="font-semibold">
                                            {stat.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Cột phải */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">
                                Weekly Study Time
                            </h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={weeklyStudyData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                    />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="hours"
                                        stroke="#8B5CF6"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Card>

                        {/* Recent Activity */}
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                            <div className="space-y-3"> {
                                recentActivity.map((activity, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                                        <div className="flex-1"> <p className="text-sm font-medium">{activity.title}</p>
                                            <p className="text-xs text-muted-foreground">{activity.time}</p> </div> </div>))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
