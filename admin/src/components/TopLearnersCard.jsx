import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Award } from "lucide-react";
import { useLocation } from "wouter";

export default function TopLearnersCard({ learners }) {
    const [, setLocation] = useLocation();

    const getRankIcon = (rank) => {
        if (rank === 1) {
            return (
                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                    <Trophy className="h-4 w-4 text-white" />
                </div>
            );
        } else if (rank === 2) {
            return (
                <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                    <Medal className="h-4 w-4 text-white" />
                </div>
            );
        } else if (rank === 3) {
            return (
                <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center">
                    <Award className="h-4 w-4 text-white" />
                </div>
            );
        }
        return (
            <div className="w-8 h-8 flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    #{rank}
                </span>
            </div>
        );
    };

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    const getBackgroundColor = (rank) => {
        if (rank === 1) return "bg-yellow-50 dark:bg-yellow-900/30";
        if (rank === 2) return "bg-gray-100 dark:bg-gray-700/30";
        if (rank === 3) return "bg-orange-50 dark:bg-orange-900/30";
        return "bg-white dark:bg-gray-700/20";
    };

    const handleUserClick = (userId) => {
        setLocation(`/user/${userId}`);
    };

    return (
        <Card className="p-6 w-full">
            <div className="flex items-center gap-2 mb-6">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <h3 className="text-lg font-semibold">Top Learners</h3>
            </div>

            <div className="space-y-3">
                {learners.map((learner) => (
                    <div
                        key={learner.id}
                        className={`flex items-center gap-3 p-3 rounded-lg ${getBackgroundColor(
                            learner.rank
                        )}`}
                        data-testid={`learner-${learner.id}`}
                    >
                        {getRankIcon(learner.rank)}

                        <Avatar
                            className="h-10 w-10 cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => handleUserClick(learner.id)}
                        >
                            <AvatarImage src={learner.avatar} alt={learner.name} />
                            <AvatarFallback className="text-sm bg-gray-300 text-gray-800">
                                {getInitials(learner.name)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                            <div
                                className="font-medium text-sm text-gray-900 dark:text-gray-100 cursor-pointer hover:text-blue-600 transition-colors"
                                onClick={() => handleUserClick(learner.id)}
                            >
                                {learner.name}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                {learner.level}
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-base font-bold tabular-nums text-gray-900 dark:text-gray-100">
                                {learner.xp.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                XP
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
