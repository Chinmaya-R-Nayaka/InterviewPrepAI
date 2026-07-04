import { Search, Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Topbar = () => {

    const { user } = useAuth();

    return (

        <header className="navbar bg-base-100 border-b border-base-300 px-8">

            <div className="flex-1">

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

                <div className="avatar placeholder">
                    <div className="w-11 rounded-full bg-primary text-primary-content flex items-center justify-center">
                        <span className="text-lg font-bold">
                            {user?.name?.charAt(0).toUpperCase()}
                        </span>
                    </div>
                </div>

                <div>

                    <p className="font-semibold">

                        {user?.name}

                    </p>

                    <p className="text-sm opacity-70">

                        {user?.email}

                    </p>

                </div>

            </div>

        </header>

    );

};

export default Topbar;