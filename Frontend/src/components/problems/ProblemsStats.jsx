import {
    ListChecks,
    CheckCircle2,
    Clock3,
    CircleDashed,
    Smile,
    Frown,
    Flame,
} from "lucide-react";

import AnimatedNumber from "../common/AnimatedNumber";

const cardStyle =
    "bg-base-100 rounded-2xl border border-base-300 shadow-md p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl";

const ProblemsStats = ({ stats }) => {

    const cards = [
        {
            title: "Total",
            value: stats.total || 0,
            icon: <ListChecks size={24} />,
            color: "text-primary",
        },
        {
            title: "Solved",
            value: stats.solved || 0,
            icon: <CheckCircle2 size={24} />,
            color: "text-success",
        },
        {
            title: "Attempted",
            value: stats.attempted || 0,
            icon: <Clock3 size={24} />,
            color: "text-warning",
        },
        {
            title: "Todo",
            value: stats.todo || 0,
            icon: <CircleDashed size={24} />,
            color: "text-info",
        },
        {
            title: "Easy",
            value: stats.easy || 0,
            icon: <Smile size={24} />,
            color: "text-success",
        },
        {
            title: "Medium",
            value: stats.medium || 0,
            icon: <Flame size={24} />,
            color: "text-warning",
        },
        {
            title: "Hard",
            value: stats.hard || 0,
            icon: <Frown size={24} />,
            color: "text-error",
        },
    ];

    return (

        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className={cardStyle}
                >

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-sm opacity-60">
                                {card.title}
                            </p>

                            <h2 className="text-3xl font-bold mt-3">

                                <AnimatedNumber
                                    value={card.value}
                                />

                            </h2>

                        </div>

                        <div className={card.color}>
                            {card.icon}
                        </div>

                    </div>

                </div>

            ))}

        </div>

    );

};

export default ProblemsStats;