import Card from "../common/Card";
import {
    Upload,
    Brain,
    Code,
} from "lucide-react";

const actions = [
    {
        icon: <Upload size={30} />,
        title: "Upload Resume",
        color: "bg-blue-500/10",
    },
    {
        icon: <Brain size={30} />,
        title: "AI Interview",
        color: "bg-green-500/10",
    },
    {
        icon: <Code size={30} />,
        title: "Solve Problems",
        color: "bg-purple-500/10",
    },
];

const QuickActions = () => {
    return (
        <Card>

            <h2 className="text-xl font-semibold text-white mb-6">
                Quick Actions
            </h2>

            <div className="grid grid-cols-3 gap-5">

                {actions.map((item, index) => (

                    <button
                        key={index}
                        className={`
                            ${item.color}
                            rounded-xl
                            h-36
                            hover:scale-105
                            transition-all
                            duration-300
                            flex
                            flex-col
                            justify-center
                            items-center
                            gap-4
                        `}
                    >

                        {item.icon}

                        <span className="text-white">
                            {item.title}
                        </span>

                    </button>

                ))}

            </div>

        </Card>
    );
};

export default QuickActions;