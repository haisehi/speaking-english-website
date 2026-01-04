import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function CourseCompletionChart({ data }) {
    return (
        <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Course Completion Rate</h3>
            <ResponsiveContainer width="100%" height={320}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" vertical={false} />
                    <XAxis
                        dataKey="level"
                        tick={{ fontSize: 13 }}
                        tickLine={false}
                        axisLine={{ stroke: '#E0E0E0' }}
                    />
                    <YAxis
                        tick={{ fontSize: 13 }}
                        tickLine={false}
                        axisLine={{ stroke: '#E0E0E0' }}
                    />
                    <Tooltip
                        contentStyle={{
                            borderRadius: '8px',
                            border: '1px solid #E0E0E0',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                        formatter={(value) => `${value}%`}
                    />
                    <Bar dataKey="completion" radius={[8, 8, 0, 0]} barSize={48}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
}