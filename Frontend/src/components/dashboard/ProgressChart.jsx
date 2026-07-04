import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import { motion } from "framer-motion";
import Card from "../common/Card";

const data = [
    { day: "Mon", solved: 2 },
    { day: "Tue", solved: 5 },
    { day: "Wed", solved: 4 },
    { day: "Thu", solved: 8 },
    { day: "Fri", solved: 6 },
    { day: "Sat", solved: 10 },
    { day: "Sun", solved: 12 },
];

const ProgressChart = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card>

                <div className="flex items-center justify-between mb-6">

                    <div>

                        <h2 className="text-2xl font-bold">
                            Weekly Progress
                        </h2>

                        <p className="text-base-content/60 mt-1">
                            Problems solved this week
                        </p>

                    </div>

                    <span className="badge badge-success badge-outline">
                        +18%
                    </span>

                </div>

                <ResponsiveContainer width="100%" height={320}>

                    <AreaChart data={data}>

                        <defs>

                            <linearGradient
                                id="colorSolved"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="5%"
                                    stopColor="#3B82F6"
                                    stopOpacity={0.5}
                                />

                                <stop
                                    offset="95%"
                                    stopColor="#3B82F6"
                                    stopOpacity={0}
                                />

                            </linearGradient>

                        </defs>

                        <CartesianGrid
                            strokeDasharray="4 4"
                            stroke="#374151"
                        />

                        <XAxis
                            dataKey="day"
                            tick={{ fill: "#9CA3AF" }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            tick={{ fill: "#9CA3AF" }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip
                            contentStyle={{
                                background: "#1F2937",
                                border: "none",
                                borderRadius: "12px",
                                color: "#fff",
                            }}
                            labelStyle={{
                                color: "#fff",
                            }}
                            itemStyle={{
                                color: "#fff",
                            }}
                            cursor={{
                                stroke: "#3B82F6",
                                strokeWidth: 1,
                            }}
                        />

                        <Area
                            type="monotone"
                            dataKey="solved"
                            stroke="#3B82F6"
                            strokeWidth={3}
                            fill="url(#colorSolved)"
                            activeDot={{
                                r: 7,
                            }}
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </Card>
        </motion.div>
    );
};

export default ProgressChart;