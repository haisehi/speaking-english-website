import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function UserGrowthChart({ data }) {
    return (
        <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">User Growth (Weekly)</h3>
            <ResponsiveContainer width="100%" height={320}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" vertical={false} />
                    <XAxis
                        dataKey="week"
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
                    />
                    <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#2196F3"
                        strokeWidth={3}
                        dot={{ fill: '#2196F3', r: 5 }}
                        activeDot={{ r: 7 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    );
}
