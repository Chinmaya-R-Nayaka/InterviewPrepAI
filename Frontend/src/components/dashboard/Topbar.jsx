import { Search, Bell, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Topbar = ({ setSidebarOpen }) => {

    const { user } = useAuth();

    return (

        <header className="navbar bg-base-100 border-b border-base-300 px-8">

            <div className="flex items-center gap-4 flex-1">

                <button
                    className="btn btn-ghost btn-circle"
                    onClick={() => setSidebarOpen(true)}
                >
                    <Menu size={22} />
                </button>

                <label className="input input-bordered flex items-center gap-2 w-96">

                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Search..."
                    />

                </label>

            </div>

            <div className="flex items-center gap-5">

                <button className="btn btn-circle btn-ghost">

                    <Bell size={20} />

                </button>

                <button
                    onClick={() => setSidebarOpen(true)}
                    className="flex items-center gap-3 hover:bg-base-200 rounded-xl px-3 py-2 transition"
                >

                    <div className="avatar placeholder">

                        <div className="w-11 rounded-full bg-primary text-primary-content">

                            <span className="text-lg font-bold">

                                {user?.name?.charAt(0).toUpperCase()}

                            </span>

                        </div>

                    </div>

                    <div className="text-left">

                        <p className="font-semibold">

                            {user?.name}

                        </p>

                        <p className="text-sm opacity-70">

                            {user?.email}

                        </p>

                    </div>

                </button>

            </div>

        </header>

    );

};

export default Topbar;