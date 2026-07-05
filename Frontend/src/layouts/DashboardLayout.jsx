import { useState } from "react";
import { Outlet } from "react-router-dom";

import Topbar from "../components/dashboard/Topbar";
import GlobalSidebar from "../components/layout/GlobalSidebar";

const DashboardLayout = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div className="min-h-screen bg-base-200">

            <GlobalSidebar
                open={sidebarOpen}
                setOpen={setSidebarOpen}
            />

            <div className="flex flex-col min-h-screen">

                <Topbar
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="flex-1 p-8 overflow-y-auto">

                    <Outlet />

                </main>

            </div>

        </div>

    );

};

export default DashboardLayout;