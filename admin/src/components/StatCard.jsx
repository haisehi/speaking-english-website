import { Card } from "@/components/ui/card";

export default function StatCard({
    icon: Icon,
    iconBgColor,
    iconColor,
    value,
    label,
    change,
    changeColor,
}) {
    return (
        <Card className="p-6 relative">
            <div className="absolute top-4 right-4">
                <span className={`text-sm font-semibold ${changeColor} flex items-center gap-1`}>
                    {change}
                </span>
            </div>
            <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: iconBgColor }}
            >
                <Icon className="w-6 h-6" style={{ color: iconColor }} />
            </div>
            <div className="text-3xl font-bold mb-1 tabular-nums">{value}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
        </Card>
    );
}