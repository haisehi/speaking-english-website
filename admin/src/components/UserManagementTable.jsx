import { useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

export default function UserManagementTable({
    users,
    onAddUser,
    onEditUser,
    onDeleteUser,
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [, setLocation] = useLocation();
    const itemsPerPage = 5;
    const totalPages = Math.ceil(users.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = users.slice(startIndex, endIndex);

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    const handleUserClick = (userId) => {
        setLocation(`/user/${userId}`);
    };

    return (
        <Card className="overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-xl font-semibold">User Management</h3>
                <Button
                    onClick={onAddUser}
                    className="bg-blue-600 hover:bg-blue-700"
                    data-testid="button-add-user"
                >
                    + Add New User
                </Button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-muted/50">
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                                User
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                                Phone
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user) => (
                            <tr
                                key={user.id}
                                className="border-b hover-elevate transition-colors"
                                data-testid={`row-user-${user.id}`}
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <Avatar
                                            className="h-11 w-11 border-2 cursor-pointer hover:opacity-80 transition-opacity"
                                            onClick={() => handleUserClick(user.id)}
                                        >
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                        </Avatar>
                                        <span
                                            className="font-medium cursor-pointer hover:text-blue-600 transition-colors"
                                            onClick={() => handleUserClick(user.id)}
                                        >
                                            {user.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                                <td className="px-6 py-4 text-muted-foreground">{user.phone}</td>
                                <td className="px-6 py-4">
                                    <Badge
                                        className={`min-w-20 justify-center ${user.status === "active"
                                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                                            }`}
                                        data-testid={`status-${user.status}`}
                                    >
                                        {user.status}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onEditUser?.(user.id)}
                                            data-testid={`button-edit-${user.id}`}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onDeleteUser?.(user.id)}
                                            data-testid={`button-delete-${user.id}`}
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

            <div className="flex items-center justify-between px-6 py-3 border-t">
                <div className="text-sm text-muted-foreground">
                    Showing {startIndex + 1} to {Math.min(endIndex, users.length)} of {users.length} users
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        data-testid="button-previous"
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
                                data-testid={`button-page-${page}`}
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
                        data-testid="button-next"
                    >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>
            </div>
        </Card>
    );
}