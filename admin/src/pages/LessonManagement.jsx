import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    BookOpen,
    Plus,
    TrendingUp,
    Search,
    Filter,
    Pencil,
    Trash2,
    FileText,
    ChevronLeft,
    ChevronRight,
    Upload,
    Link2,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useEffect, useState } from "react";

/* ===== APIs ===== */
import {
    getAllLessons,
    createLesson,
    updateLesson,
    deleteLesson,
} from "@/services/lesson.service.js";
import { getAllCourses } from "@/services/course.service";


export default function LessonManagement() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCourse, setFilterCourse] = useState("all");
    const [sortOrder, setSortOrder] = useState("default");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState("add");
    const [editingLesson, setEditingLesson] = useState(null);

    /* ===== DATA FROM API ===== */
    const [allLessons, setAllLessons] = useState([]);
    const [courses, setCourses] = useState([]);

    // Form states
    const [formData, setFormData] = useState({
        lessonName: "",
        lessonContent: "",
        level: "",
        course: "",
        attachmentUrl: "",
        imageUrl: "",
    });
    const itemsPerPage = 6;

        // Pie chart data
    const levelDistribution = [
        { name: "Level 1", value: 33, color: "#60A5FA" },
        { name: "Level 2", value: 17, color: "#34D399" },
        { name: "Level 3", value: 17, color: "#FBBF24" },
        { name: "Level 4", value: 16, color: "#F87171" },
        { name: "Level 5", value: 17, color: "#F472B6" },
    ];

    const levelDetails = [
        { level: "Level 1", count: 1, color: "#34D399" },
        { level: "Level 2", count: 2, color: "#60A5FA" },
        { level: "Level 3", count: 1, color: "#FBBF24" },
        { level: "Level 4", count: 1, color: "#F87171" },
        { level: "Level 5", count: 1, color: "#F472B6" },
    ];



    /* ===== FETCH LESSONS ===== */
    const fetchLessons = async () => {
        try {
            const res = await getAllLessons();

            // Map API data -> UI data (giữ layout)
            const mappedData = res.data.map((item) => ({
                id: item.lessonId,
                title: item.lessonName,
                learners: item.learners || 0,
                content: item.content,
                fullContent: item.content,
                level: `Level ${item.level}`,
                levelValue: `level${item.level}`,
                levelColor:
                    item.level === 1
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : item.level === 2
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                            : "bg-yellow-100 text-yellow-700",
                files: item.attachments ? 1 : 0,
                course: `Course ${item.courseId}`,
                courseValue: String(item.courseId),
                status: "Active",
                image:
                    item.image ||
                    "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=100&h=100&fit=crop",
                attachmentUrl: item.attachments,
            }));

            setAllLessons(mappedData);
        } catch (error) {
            console.error("Failed to fetch lessons", error);
        }
    };

    /* ===== FETCH COURSES ===== */
    const fetchCourses = async () => {
        try {
            const res = await getAllCourses();
            setCourses(res.data);
        } catch (error) {
            console.error("Fetch courses failed", error);
        }
    };

    useEffect(() => {
        if (isDialogOpen) {
            fetchCourses();
        }
    }, [isDialogOpen]);


    useEffect(() => {
        fetchLessons();
    }, []);

    const totalPages = Math.ceil(allLessons.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentLessons = allLessons.slice(startIndex, endIndex);

    const handleOpenAddDialog = () => {
        setDialogMode("add");
        setEditingLesson(null);
        setFormData({
            lessonName: "",
            lessonContent: "",
            level: "",
            course: "",
            attachmentUrl: "",
            imageUrl: "",
        });
        setIsDialogOpen(true);
    };

    const handleOpenEditDialog = (lesson) => {
        setDialogMode("update");
        setEditingLesson(lesson);
        setFormData({
            lessonName: lesson.title,
            lessonContent: lesson.fullContent,
            level: lesson.levelValue,
            course: lesson.courseValue,
            attachmentUrl: lesson.attachmentUrl,
            imageUrl: lesson.image,
        });
        setIsDialogOpen(true);
    };

    /* ===== CREATE / UPDATE ===== */
    const handleSaveLesson = async () => {
        if (!formData.course) {
            alert("Please select a course before saving the lesson.");
            return;
        }

        try {
            if (dialogMode === "add") {
                await createLesson(formData);
            } else {
                await updateLesson(editingLesson.id, formData);
            }

            await fetchLessons();
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Save lesson failed", error);
        }
    };


    /* ===== DELETE ===== */
    const handleDeleteLesson = async (id) => {
        try {
            await deleteLesson(id);
            await fetchLessons();
        } catch (error) {
            console.error("Delete lesson failed", error);
        }
    };

    return (
        <div className="p-8 max-w-[1400px] mx-auto">
            {/* ===== HEADER + STATS + UI GIỮ NGUYÊN ===== */}
                        {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Lesson Management</h1>
                <p className="text-muted-foreground">
                    Manage lessons, organize content, and track learner engagement.
                </p>
            </div>

            {/* Stats + Pie Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Left: Stats Cards */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <Card key={index} className="p-5" style={{ backgroundColor: stat.iconBg }}>
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                                style={{ backgroundColor: stat.iconColor }}
                            >
                                <stat.icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-2xl font-bold mb-1 text-gray-900">{stat.value}</div>
                            <div className="text-sm font-semibold mb-1 text-gray-800">{stat.label}</div>
                            <div className="text-xs text-gray-700">{stat.description}</div>
                        </Card>
                    ))}
                </div>

                {/* Right: Pie Chart */}
                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Lessons by Level</h3>
                    <p className="text-sm text-muted-foreground mb-4">Distribution across difficulty</p>

                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={levelDistribution}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {levelDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value}%`} />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Legend */}
                    <div className="space-y-2 mt-4">
                        {levelDetails.map((item, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span className="text-gray-700 dark:text-gray-300">{item.level}</span>
                                </div>
                                <span className="font-semibold dark:text-gray-200">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
            {/* --- PHẦN UI BÊN DƯỚI GIỮ NGUYÊN 100% --- */}

            {/* All Lessons Table */}
            <Card className="overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b">
                    <div>
                        <h3 className="text-xl font-semibold">All Lessons</h3>
                        <p className="text-sm text-muted-foreground">
                            {allLessons.length} total lessons
                        </p>
                    </div>
                    <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={handleOpenAddDialog}
                    >
                        + Add New Lesson
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <tbody>
                            {currentLessons.map((lesson) => (
                                <tr key={lesson.id} className="border-b">
                                    <td className="px-6 py-4">
                                        {lesson.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 rounded-md">
                                                <AvatarImage src={lesson.image} />
                                                <AvatarFallback>
                                                    {lesson.title[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">
                                                    {lesson.title}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {lesson.content}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge
                                            className={`${lesson.levelColor}`}
                                        >
                                            {lesson.level}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleOpenEditDialog(
                                                        lesson
                                                    )
                                                }
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleDeleteLesson(
                                                        lesson.id
                                                    )
                                                }
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-3 border-t">
                    <div className="text-sm text-muted-foreground">
                        Showing {startIndex + 1} to{" "}
                        {Math.min(endIndex, allLessons.length)} of{" "}
                        {allLessons.length} lessons
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setCurrentPage((p) => Math.max(1, p - 1))
                            }
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Previous
                        </Button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                (page) => (
                                    <Button
                                        key={page}
                                        variant={
                                            currentPage === page
                                                ? "default"
                                                : "outline"
                                        }
                                        size="sm"
                                        className="w-9 h-9"
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </Button>
                                )
                            )}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setCurrentPage((p) =>
                                    Math.min(totalPages, p + 1)
                                )
                            }
                            disabled={currentPage === totalPages}
                        >
                            Next
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>

            </Card>

            {/* Add/Update Lesson Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            {dialogMode === "add"
                                ? "Add New Lesson"
                                : "Update Lesson"}
                        </DialogTitle>
                        <DialogDescription>
                            Enter lesson information
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 mt-4">
                        {/* Lesson Name */}
                        <div>
                            <Label htmlFor="lessonName" className="text-gray-900 mb-2 block">Lesson Name</Label>
                            <Input
                                id="lessonName"
                                placeholder="e.g. Introduction to Greetings"
                                value={formData.lessonName}
                                onChange={(e) => setFormData({ ...formData, lessonName: e.target.value })}
                            />
                        </div>

                        {/* Lesson Content */}
                        <div>
                            <Label htmlFor="lessonContent" className="text-white-900 mb-2 block">Lesson Content</Label>
                            <Textarea
                                className="bg-white-900"
                                id="lessonContent"
                                placeholder="Describe the lesson content and learning objectives..."
                                value={formData.lessonContent}
                                onChange={(e) => setFormData({ ...formData, lessonContent: e.target.value })}
                            />
                        </div>

                        {/* Level & Course */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="level" className="text-gray-900 mb-2 block">Level</Label>
                                <Select value={formData.level} onValueChange={(val) => setFormData({ ...formData, level: val })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="level1">Level 1 - Beginner</SelectItem>
                                        <SelectItem value="level2">Level 2</SelectItem>
                                        <SelectItem value="level3">Level 3</SelectItem>
                                        <SelectItem value="level4">Level 4</SelectItem>
                                        <SelectItem value="level5">Level 5</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label className="text-gray-900 mb-2 block">Course</Label>
                                <Select
                                    value={formData.course}
                                    onValueChange={(val) =>
                                        setFormData({ ...formData, course: val })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select course" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {courses.map((course) => (
                                            <SelectItem
                                                key={course.id}
                                                value={String(course.courseId)}
                                                
                                            >
                                                {course.courseName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>

                        {/* Attachments URL */}
                        <div>
                            <Label htmlFor="attachmentUrl" className="text-gray-900 mb-2 block">Attachments URL</Label>
                            <div className="relative">
                                <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="attachmentUrl"
                                    placeholder="https://example.com/lesson-file.pdf"
                                    className="pl-10 pr-10"
                                    value={formData.attachmentUrl}
                                    onChange={(e) => setFormData({ ...formData, attachmentUrl: e.target.value })}
                                />
                                <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>
                        </div>

                        {/* Lesson Image URL */}
                        <div>
                            <Label htmlFor="imageUrl" className="text-gray-900 mb-2 block">Lesson Image URL</Label>
                            <div className="relative">
                                <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="imageUrl"
                                    placeholder="https://example.com/image.png"
                                    className="pl-10 pr-10"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                />
                                <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>
                        </div>

                        {/* Preview (chỉ hiển thị khi có imageUrl) */}
                        {formData.imageUrl && (
                            <div>
                                <Label className="text-gray-900 mb-2 block">Preview</Label>
                                <div className="rounded-lg overflow-hidden bg-gray-100 border">
                                    <img
                                        src={formData.imageUrl}
                                        alt="Preview"
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/400x200?text=Image+Not+Found";
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter className="mt-6">
                        <Button
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={handleSaveLesson}
                            disabled={!formData.course}
                        >
                            <BookOpen className="h-4 w-4 mr-2" />
                            {dialogMode === "add"
                                ? "Create Lesson"
                                : "Update Lesson"}
                        </Button>

                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

    // Stats data
    const stats = [
        {
            icon: BookOpen,
            iconBg: "#E3F2FD",
            iconColor: "#2196F3",
            value: "6",
            label: "Total Lessons",
            description: "Active lessons",
        },
        {
            icon: Plus,
            iconBg: "#E8F5E9",
            iconColor: "#4CAF50",
            value: "+3",
            label: "Added This Week",
            description: "New this week",
        },
        {
            icon: TrendingUp,
            iconBg: "#FFF3E0",
            iconColor: "#FF9800",
            value: "Introduction to Greetings",
            label: "245 learners",
            description: "Most Popular",
        },
    ];

