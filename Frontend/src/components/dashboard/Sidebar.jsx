import {
    LayoutDashboard,
    Code2,
    BrainCircuit,
    Mic,
    User,
    LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {

    const { logoutUser } = useAuth();

    const menu = [

        {
            title: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            link: "/dashboard",
        },

        {
            title: "Problems",
            icon: <Code2 size={20} />,
            link: "/problems",
        },

        {
            title: "AI Assistant",
            icon: <BrainCircuit size={20} />,
            link: "/ai",
        },

        {
            title: "Mock Interview",
            icon: <Mic size={20} />,
            link: "/interview",
        },

        {
            title: "Profile",
            icon: <User size={20} />,
            link: "/profile",
        },
    ];

    return (

        <aside className="w-72 bg-base-100 border-r border-base-300 flex flex-col">

            <div className="p-6">

                <h1 className="text-3xl font-bold text-primary">

                    InterviewPrep AI

                </h1>

            </div>

            <ul className="menu flex-1 p-4 gap-2">

                {

                    menu.map((item) => (

                        <li key={item.title}>

                            <NavLink

                                to={item.link}

                                className={({ isActive }) =>

                                    isActive

                                        ?

                                        "active"

                                        :

                                        ""

                                }

                            >

                                {item.icon}

                                {item.title}

                            </NavLink>

                        </li>

                    ))

                }

            </ul>

            <div className="p-5">

                <button

                    onClick={logoutUser}

                    className="btn btn-error w-full"

                >

                    <LogOut size={18} />

                    Logout

                </button>

            </div>

        </aside>

    );

};

export default Sidebar;