import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TrendingUp, TrendingDown, Users, Pencil, Trash2, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllCourses, createCourse, updateCourse } from "@/services/course.service";


export default function CourseManagement() {
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [formData, setFormData] = useState({
        courseName: "",
        courseCode: "",
        maxQuantity: "",
        status: "Active",
        imageUrl: "",
    });

    const itemsPerPage = 6;

    // Mock data - Top Performing Courses
    const topCourses = [
        {
            id: 1,
            title: "English for Beginners",
            code: "ENG-101",
            students: 100,
            enrolled: 85,
            trend: "up",
            status: "Active",
            image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&h=300&fit=crop",
        },
        {
            id: 2,
            title: "Conversational English",
            code: "CON-102",
            students: 80,
            enrolled: 72,
            trend: "down",
            status: "Active",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=300&fit=crop",
        },
        {
            id: 3,
            title: "Business English Mastery",
            code: "BUS-201",
            students: 75,
            enrolled: 68,
            trend: "up",
            status: "Active",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop",
        },
    ];

    // Mock data - All Courses Table
const queryClient = useQueryClient();

const { data: allCourses = [] } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourses,
    select: (res) =>
        res.data.map((course) => ({
            id: course.courseId,
            title: course.courseName,
            code: course.courseCode,
            capacity: `0 / ${course.maxQuantity}`,
            currentStudents: 0,
            maxStudents: course.maxQuantity,
            status: course.status === 1 ? "Active" : "Inactive",
            image: course.image || "",
        })),
});


    const totalPages = Math.ceil(allCourses.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCourses = allCourses.slice(startIndex, endIndex);

const createCourseMutation = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
        queryClient.invalidateQueries(["courses"]);
        setShowAddDialog(false);
        setFormData({
            courseName: "",
            courseCode: "",
            maxQuantity: "",
            status: "Active",
            imageUrl: "",
        });
    },
});

const handleAddCourse = () => {
    createCourseMutation.mutate(formData);
};

const [editingCourseId, setEditingCourseId] = useState(null);


const handleEditCourse = (course) => {
    setEditingCourseId(course.id);
    setFormData({
        courseName: course.title,
        courseCode: course.code,
        maxQuantity: course.maxStudents.toString(),
        status: course.status,
        imageUrl: course.image,
    });
    setShowEditDialog(true);
};

const updateCourseMutation = useMutation({
    mutationFn: ({ id, data }) => updateCourse(id, data),
    onSuccess: () => {
        queryClient.invalidateQueries(["courses"]);
        setShowEditDialog(false);
        setEditingCourseId(null);
        setFormData({
            courseName: "",
            courseCode: "",
            maxQuantity: "",
            status: "Active",
            imageUrl: "",
        });
    },
});


const handleUpdateCourse = () => {
    if (!editingCourseId) return;
    updateCourseMutation.mutate({
        id: editingCourseId,
        data: formData,
    });
};


    return (
        <div className="p-8 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Course Management</h1>
                <p className="text-muted-foreground">
                    Manage your courses, track enrollment, and monitor performance.
                </p>
            </div>

            {/* Top Performing Courses */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Top Performing Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {topCourses.map((course) => (
                        <Card key={course.id} className="overflow-hidden">
                            <div className="relative h-40 bg-gradient-to-br from-blue-400 to-purple-500">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white text-4xl font-bold bg-gradient-to-br from-blue-400 to-purple-500">${course.title.split(" ")[0]}</div>`;
                                    }}
                                />
                                <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-500">
                                    {course.status}
                                </Badge>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold mb-1">{course.title}</h3>
                                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                                    <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4" />
                                        <span>{course.enrolled} / {course.students} learners</span>
                                    </div>
                                    {course.trend === "up" ? (
                                        <TrendingUp className="h-4 w-4 text-green-600" />
                                    ) : (
                                        <TrendingDown className="h-4 w-4 text-red-600" />
                                    )}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    <span>Course Code</span>
                                    <span className="ml-16">{course.code}</span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* All Courses Table */}
            <Card className="overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b">
                    <div>
                        <h3 className="text-xl font-semibold">All Courses</h3>
                        <p className="text-sm text-muted-foreground">{allCourses.length} total courses</p>
                    </div>
                    <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => setShowAddDialog(true)}
                    >
                        + Add New Course
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b bg-muted/50">
                                <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Course</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Course Code</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Capacity</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCourses.map((course, index) => (
                                <tr key={course.id} className="border-b hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="text-muted-foreground">#{startIndex + index + 1}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 rounded-md">
                                                <AvatarImage src={course.image} />
                                                <AvatarFallback className="rounded-md bg-blue-100 text-blue-600">
                                                    {course.title.split(" ")[0][0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{course.title}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {course.currentStudents} active learners
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">{course.code}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{course.capacity}</td>
                                    <td className="px-6 py-4">
                                        <Badge
                                            className={
                                                course.status === "Active"
                                                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                                                    : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                                            }
                                        >
                                            {course.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEditCourse(course)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon">
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
                        Showing {startIndex + 1} to {Math.min(endIndex, allCourses.length)} of {allCourses.length} courses
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Previous
                        </Button>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Button
                                    key={page}
                                    variant={currentPage === page ? "default" : "outline"}
                                    size="sm"
                                    className="w-9 h-9"
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </Button>
                            ))}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Add Course Dialog */}
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogContent onClose={() => setShowAddDialog(false)}>
                    <DialogHeader>
                        <DialogTitle>Add New Course</DialogTitle>
                        <DialogDescription>Fill in the course information</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="courseName">Course Name</Label>
                            <Input
                                id="courseName"
                                placeholder="e.g., English for Beginners"
                                value={formData.courseName}
                                onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="courseCode">Course Code</Label>
                            <Input
                                id="courseCode"
                                placeholder="e.g., ENG-101"
                                value={formData.courseCode}
                                onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="maxQuantity">Max Quantity (Students)</Label>
                            <Input
                                id="maxQuantity"
                                type="number"
                                placeholder="40"
                                value={formData.maxQuantity}
                                onChange={(e) => setFormData({ ...formData, maxQuantity: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => setFormData({ ...formData, status: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" value={formData.status} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="imageUrl">Course Image URL</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="imageUrl"
                                    placeholder="https://example.com/image.png"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                />
                                <Button variant="outline" size="icon">
                                    <Upload className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowAddDialog(false)}
                            className="border-gray-300"
                        >
                            ✕ Cancel
                        </Button>
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={handleAddCourse}
                        >
                            💾 Create Course
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Course Dialog */}
            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <DialogContent onClose={() => setShowEditDialog(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Course</DialogTitle>
                        <DialogDescription>Edit the course details below</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="editCourseName">Course Name</Label>
                            <Input
                                id="editCourseName"
                                placeholder="e.g., English for Beginners"
                                value={formData.courseName}
                                onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="editCourseCode">Course Code</Label>
                            <Input
                                id="editCourseCode"
                                placeholder="e.g., ENG-101"
                                value={formData.courseCode}
                                onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="editMaxQuantity">Max Quantity (Students)</Label>
                            <Input
                                id="editMaxQuantity"
                                type="number"
                                placeholder="40"
                                value={formData.maxQuantity}
                                onChange={(e) => setFormData({ ...formData, maxQuantity: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="editStatus">Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => setFormData({ ...formData, status: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" value={formData.status} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="editImageUrl">Course Image URL</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="editImageUrl"
                                    placeholder="https://example.com/image.png"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                />
                                <Button variant="outline" size="icon">
                                    <Upload className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Preview */}
                        {formData.imageUrl && (
                            <div className="space-y-2">
                                <Label>Preview</Label>
                                <div className="w-full h-40 rounded-lg overflow-hidden bg-gray-100">
                                    <img
                                        src={formData.imageUrl}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400 text-sm">Invalid image URL</div>';
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowEditDialog(false)}
                            className="border-gray-300"
                        >
                            ✕ Cancel
                        </Button>
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={handleUpdateCourse}
                        >
                            💾 Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}