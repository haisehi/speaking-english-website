import { Card } from "@/components/ui/card";

export default function InsightCard({
    icon: Icon,
    iconBgColor,
    iconColor,
    title,
    value,
    description,
    cardBgColor,
}) {
    return (
        <Card className="p-5 h-32" style={{ backgroundColor: cardBgColor }}>
            <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: iconBgColor }}
            >
                <Icon className="w-5 h-5" style={{ color: iconColor }} />
            </div>
            <div className="text-base font-semibold mb-1 text-gray-900 dark:text-gray-100">
                {title}
            </div>
            <div className="text-xs text-gray-700 dark:text-gray-300">
                {description}
            </div>
        </Card>
    );
}