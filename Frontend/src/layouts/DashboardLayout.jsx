import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen bg-base-200">

            <Sidebar />

            <div className="flex-1 flex flex-col">

                <Topbar />

                <main className="p-8 overflow-y-auto">
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default DashboardLayout;