import Card from "../common/Card";
import {
    Clock,
    FileText,
    Bot,
    Code,
} from "lucide-react";

const activities = [
    {
        icon: <FileText size={18} />,
        title: "Uploaded Resume",
        time: "2 mins ago",
    },
    {
        icon: <Bot size={18} />,
        title: "AI Interview Completed",
        time: "1 hour ago",
    },
    {
        icon: <Code size={18} />,
        title: "Solved Binary Search",
        time: "Yesterday",
    },
];

const RecentActivity = () => {
    return (
        <Card>

            <h2 className="text-xl font-semibold text-white mb-5">
                Recent Activity
            </h2>

            <div className="space-y-5">

                {activities.map((item, index) => (

                    <div
                        key={index}
                        className="flex justify-between items-center border-b border-gray-700 pb-4"
                    >

                        <div className="flex gap-3 items-center">

                            <div className="text-blue-400">
                                {item.icon}
                            </div>

                            <div>

                                <h3 className="text-white">
                                    {item.title}
                                </h3>

                                <p className="text-gray-500 text-sm flex items-center gap-1">

                                    <Clock size={14} />

                                    {item.time}

                                </p>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </Card>
    );
};

export default RecentActivity;