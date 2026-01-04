import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    FileText,
    CheckCircle,
    TrendingUp,
    Trophy,
    Clock,
    Edit,
    Trash2,
    ClipboardList,
    Users,
} from "lucide-react";

/* ===== APIs ===== */
import {
    getAllTests,
    createTest,
    updateTest,
    deleteTest,
} from "@/services/test.service";
import { getAllCourses } from "@/services/course.service";

export default function ExerciseManagement() {
    const [, setLocation] = useLocation();

    const [testsData, setTestsData] = useState([]);
    const [courses, setCourses] = useState([]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState("add");

    const [formData, setFormData] = useState({
        testName: "",
        description: "",
        examTime: "",
        type: "Quiz",
        maxExams: "",
        level: "Beginner",
        passing: "",
        status: "Active",
        courseId: "",
    });

    /* ===== FETCH TESTS ===== */
    const fetchTests = async () => {
        const res = await getAllTests();
        const mapped = res.data.map((item) => ({
            id: item.testId,
            testName: item.testName,
            description: item.description,
            examTime: item.examTime,
            type: item.type,
            maxExams: item.maxNumberOfExams,
            level: item.level,
            passing: item.passingScore,
            status: item.status === 1 ? "Active" : "Inactive",
            courseId: String(item.courseId),
            course: `Course ${item.courseId}`,
            stats: "1",
            statsLabel: "",
            statusBadge:
                item.status === 1
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700",
            typeBadge:
                item.type === "Quiz"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-orange-100 text-orange-700",
            levelBadge:
                item.level === "Beginner"
                    ? "bg-green-100 text-green-700"
                    : item.level === "Intermediate"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700",
        }));
        setTestsData(mapped);
    };

    const fetchCourses = async () => {
        const res = await getAllCourses();
        setCourses(res.data);
    };

    useEffect(() => {
        fetchTests();
    }, []);

    /* ===== HANDLERS ===== */
    const handleOpenAdd = async () => {
        setDialogMode("add");
        setFormData({
            testName: "",
            description: "",
            examTime: "",
            type: "Quiz",
            maxExams: "",
            level: "Beginner",
            passing: "",
            status: "Active",
            courseId: "",
        });
        await fetchCourses();
        setIsDialogOpen(true);
    };

    const handleOpenEdit = async (test) => {
        setDialogMode("update");
        setFormData({
            id: test.id,
            testName: test.testName,
            description: test.description,
            examTime: test.examTime,
            type: test.type,
            maxExams: test.maxExams,
            level: test.level,
            passing: test.passing,
            status: test.status,           // "Active" | "Inactive"
            courseId: String(test.courseId) // ⚠️ PHẢI LÀ STRING cho Select
        });
        await fetchCourses();
        setIsDialogOpen(true);
    };

    const handleSubmit = async () => {
        const payload = {
            testName: formData.testName,
            description: formData.description,
            examTime: Number(formData.examTime),
            type: formData.type,
            maxNumberOfExams: Number(formData.maxExams),
            level: formData.level,
            passingScore: Number(formData.passing),
            status: formData.status === "Active" ? 1 : 0,
            courseId: Number(formData.courseId),
        };

        if (dialogMode === "add") {
            await createTest(payload);
        } else {
            await updateTest(formData.id, payload);
        }

        await fetchTests();
        setIsDialogOpen(false);
    };

    const handleDelete = async (id) => {
        await deleteTest(id);
        await fetchTests();
    };


const handleQuestionsClick = (test) => {
  setLocation(`/questions/${test.id}`);
};

    /* ===== STATS ===== */
    const stats = [
        {
            icon: FileText,
            iconBg: "#E3F2FD",
            iconColor: "#2196F3",
            value: testsData.length,
            label: "Total Tests",
            badge: "Total",
            badgeColor: "bg-blue-100 text-blue-700",
        },
        {
            icon: CheckCircle,
            iconBg: "#E8F5E9",
            iconColor: "#4CAF50",
            value: testsData.filter((t) => t.status === "Active").length,
            label: "Active Tests",
            badge: "Active",
            badgeColor: "bg-green-100 text-green-700",
        },
        {
            icon: TrendingUp,
            iconBg: "#F3E5F5",
            iconColor: "#9C27B0",
            value: "—",
            label: "Total Attempts",
            badge: "Attempts",
            badgeColor: "bg-purple-100 text-purple-700",
        },
        {
            icon: Trophy,
            iconBg: "#FFF3E0",
            iconColor: "#FF9800",
            value: "—",
            label: "Avg Passing Score",
            badge: "Score",
            badgeColor: "bg-orange-100 text-orange-700",
        },
    ];

    return (
        <div className="p-8 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Exercise Management</h1>
                <p className="text-muted-foreground">
                    Create and manage tests, quizzes, and assessments for your courses.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <Card key={i} className="p-5" style={{ backgroundColor: stat.iconBg }}>
                        <div className="flex items-start justify-between mb-3">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: stat.iconColor }}
                            >
                                <stat.icon className="w-5 h-5 text-white" />
                            </div>
                            <Badge className={`${stat.badgeColor}`}>{stat.badge}</Badge>
                        </div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-sm">{stat.label}</div>
                    </Card>
                ))}
            </div>



            {/* Tests Table */}
            <Card className="overflow-hidden">

                <div className="flex items-center justify-between p-6 border-b">
                    <div>
                        <h3 className="text-xl font-semibold">All Tests & Quizzes</h3>
                        <p className="text-sm text-muted-foreground">{testsData.length} total tests</p>
                    </div>
                    <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={handleOpenAdd}
                    >
                        + Add Test
                    </Button>

                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b bg-muted/50">
                                <th className="px-6 py-4 text-left text-sm font-semibold">ID Test</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Test Name</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Time</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Level</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Passing</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Course</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Stats</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testsData.map((test) => (
                                <tr key={test.id} className="border-b hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="font-medium">{test.id}</div>

                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="font-medium">{test.name}</div>
                                            <div className="text-xs text-muted-foreground">Max {test.maxExams} exams</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-muted-foreground max-w-xs truncate">
                                            {test.description}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <Clock className="h-4 w-4" />
                                            <span className="text-sm">{test.examTime}m</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge className={`${test.typeBadge} hover:${test.typeBadge}`}>
                                            {test.type}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge className={`${test.levelBadge} hover:${test.levelBadge}`}>
                                            {test.level}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">{test.passing}%</td>
                                    <td className="px-6 py-4 text-muted-foreground">{test.course}</td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="font-medium">
                                                <span className="inline-flex items-center gap-1">
                                                    <Users className="h-3 w-3" />
                                                    {test.stats}
                                                </span>
                                            </div>
                                            {test.statsLabel && (
                                                <div className="text-xs text-muted-foreground">{test.statsLabel}</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge className={`${test.statusBadge} hover:${test.statusBadge}`}>
                                            {test.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                                                onClick={() => handleQuestionsClick(test)}
                                            >
                                                <ClipboardList className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                onClick={() => handleOpenEdit(test)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                onClick={() => handleDelete(test.id)}>
                                                <Trash2 className="h-4 w-4" />

                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* ADD / UPDATE DIALOG */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="!bg-white !text-gray-900 max-w-md">
                    <DialogHeader>
                        <DialogTitle className="!text-gray-900">
                            {dialogMode === "add" ? "Add Test" : "Update Test"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        {/* Test Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-1.5">
                                Test Name <span className="text-red-500">*</span>
                            </label>
                            <Input
                                value={formData.testName}
                                onChange={(e) =>
                                    setFormData({ ...formData, testName: e.target.value })
                                }
                                className="!bg-gray-50 !text-gray-900 !border-2 !border-gray-300 rounded-lg"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-1.5">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <Textarea
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                className="!bg-gray-50 !text-gray-900 !border-2 !border-gray-300 rounded-lg min-h-[70px]"
                            />
                        </div>

                        {/* Exam Time & Type */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                                    Exam Time (minutes) <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="number"
                                    value={formData.examTime}
                                    onChange={(e) =>
                                        setFormData({ ...formData, examTime: e.target.value })
                                    }
                                    className="!bg-gray-50 !text-gray-900 !border-2 !border-gray-300 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                                    Type <span className="text-red-500">*</span>
                                </label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(val) =>
                                        setFormData({ ...formData, type: val })
                                    }
                                >
                                    <SelectTrigger className="!bg-gray-50 !text-gray-900 !border-2 !border-gray-300 rounded-lg">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Quiz">Quiz</SelectItem>
                                        <SelectItem value="Exam">Exam</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Max Exams & Level */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                                    Max Number of Exams <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="number"
                                    value={formData.maxExams}
                                    onChange={(e) =>
                                        setFormData({ ...formData, maxExams: e.target.value })
                                    }
                                    className="!bg-gray-50 !text-gray-900 !border-2 !border-gray-300 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                                    Level <span className="text-red-500">*</span>
                                </label>
                                <Select
                                    value={formData.level}
                                    onValueChange={(val) =>
                                        setFormData({ ...formData, level: val })
                                    }
                                >
                                    <SelectTrigger className="!bg-gray-50 !text-gray-900 !border-2 !border-gray-300 rounded-lg">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                                        <SelectItem value="Advanced">Advanced</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Passing Score & Status */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                                    Passing Score (%) <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="number"
                                    value={formData.passing}
                                    onChange={(e) =>
                                        setFormData({ ...formData, passing: e.target.value })
                                    }
                                    className="!bg-gray-50 !text-gray-900 !border-2 !border-gray-300 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                                    Status <span className="text-red-500">*</span>
                                </label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(val) =>
                                        setFormData({ ...formData, status: val })
                                    }
                                >
                                    <SelectTrigger className="!bg-gray-50 !text-gray-900 !border-2 !border-gray-300 rounded-lg">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Active</SelectItem>
                                        <SelectItem value="0">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Course – FIX COURSE ID NULL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-1.5">
                                Associated Course <span className="text-red-500">*</span>
                            </label>
                            <Select
                                value={formData.courseId}
                                onValueChange={(val) =>
                                    setFormData({ ...formData, courseId: val })
                                }
                            >
                                <SelectTrigger className="!bg-gray-50 !text-gray-900 !border-2 !border-gray-300 rounded-lg">
                                    <SelectValue placeholder="Select course" />
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.map((course) => (
                                        <SelectItem
                                            key={course.courseId}
                                            value={String(course.courseId)}
                                        >
                                            {course.courseName}
                                        </SelectItem>

                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter className="mt-6">
                        <Button
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                            className="!bg-white !text-gray-900 !border-2 border-gray-300"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="bg-blue-600 text-white hover:bg-blue-700"
                        >
                            {dialogMode === "add" ? "Create Test" : "Update Test"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
}