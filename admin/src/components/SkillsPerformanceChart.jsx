import { Card } from "@/components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";

export default function SkillsPerformanceChart({ data }) {
    return (
        <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Skills Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="#E0E0E0" />
                    <PolarAngleAxis
                        dataKey="skill"
                        tick={{ fontSize: 14, fontWeight: 500 }}
                    />
                    <Radar
                        name="Score"
                        dataKey="score"
                        stroke="#00BCD4"
                        fill="#00BCD4"
                        fillOpacity={0.3}
                        strokeWidth={3}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </Card>
    );
}