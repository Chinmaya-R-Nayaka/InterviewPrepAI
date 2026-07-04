import DashboardCard from "../components/dashboard/DashboardCards";

import {
    Code2,
    BrainCircuit,
    Flame,
    Mic,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Dashboard = () => {

    const { user } = useAuth();

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold">

                    Welcome back,
                    {" "}
                    {user?.name}
                    👋

                </h1>

                <p className="opacity-70 mt-2">

                    Ready for today's interview preparation?

                </p>

            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

                <DashboardCard
                    title="Problems Solved"
                    value="156"
                    icon={<Code2 size={34} />}
                    color="text-info"
                />

                <DashboardCard
                    title="AI Chats"
                    value="42"
                    icon={<BrainCircuit size={34} />}
                    color="text-success"
                />

                <DashboardCard
                    title="Mock Interviews"
                    value="7"
                    icon={<Mic size={34} />}
                    color="text-warning"
                />

                <DashboardCard
                    title="Current Streak"
                    value="15 🔥"
                    icon={<Flame size={34} />}
                    color="text-error"
                />

            </div>

        </div>

    );

};

export default Dashboard;