import DashboardCards from "../components/dashboard/DashboardCards";
import ProgressChart from "../components/dashboard/ProgressChart";
import RecentActivity from "../components/dashboard/RecentActivity";
import DailyGoal from "../components/dashboard/DailyGoal";
import QuickActions from "../components/dashboard/QuickActions";
import useDashboard from "../hooks/useDashboard";

import {Code2, BrainCircuit, Flame, Mic} from "lucide-react";
import { useAuth } from "../context/AuthContext";

// const { dashboard, loading, error} = useDashboard();
// if(loading){
//     return <div>Loading...</div>;
// }
// if(error){
//     return <div>Something went wrong.</div>;
// }

const Dashboard = () => {

    const { user } = useAuth();
    const { dashboard, loading, error } = useDashboard();

    if (loading) {
        return <div className="p-10">Loading Dashboard...</div>;
    }
    if(error){
        return <div>Something went wrong.</div>;
    }

    if (!dashboard) {
        return <div className="p-10">Unable to load dashboard.</div>;
    }

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

                <DashboardCards
                    title="Problems Solved"
                    value={dashboard.solved}
                    icon={<Code2 size={34} />}
                    color="text-info"
                />

                <DashboardCards
                    title="AI Chats"
                    value={0}
                    icon={<BrainCircuit size={34} />}
                    color="text-success"
                />

                <DashboardCards
                    title="Mock Interviews"
                    value={0}
                    icon={<Mic size={34} />}
                    color="text-warning"
                />

                <DashboardCards
                    title="Current Streak"
                    value={dashboard.revisionToday}
                    icon={<Flame size={34} />}
                    color="text-error"
                />

            </div>
            <div className="grid lg:grid-cols-3 gap-6 mt-8">

                <div className="lg:col-span-2">
                    <ProgressChart />
                </div>
                <DailyGoal />
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mt-8">
                <RecentActivity />
                <QuickActions />
            </div>

        </div>

    );

};

export default Dashboard;
