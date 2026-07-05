import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Code2,
    BrainCircuit,
    Mic,
    User,
    LogOut,
    X,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const GlobalSidebar = ({ open, setOpen }) => {

    const { logoutUser } = useAuth();
    useEffect(() => {

    const handleKeyDown = (e) => {

            if (e.key === "Escape") {

                setOpen(false);

            }

        };

        window.addEventListener("keydown", handleKeyDown);

        return () =>
            window.removeEventListener("keydown", handleKeyDown);

    }, [setOpen]);

    const menus = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Problems",
            path: "/problems",
            icon: Code2,
        },
        {
            name: "AI Assistant",
            path: "/ai",
            icon: BrainCircuit,
        },
        {
            name: "Mock Interview",
            path: "/mock",
            icon: Mic,
        },
        {
            name: "Profile",
            path: "/profile",
            icon: User,
        },
    ];

    return (

        <AnimatePresence>

            {open && (

                <>

                    <motion.div

                        className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40"

                        initial={{ opacity: 0 }}

                        animate={{ opacity: 1 }}

                        exit={{ opacity: 0 }}

                        onClick={() => setOpen(false)}

                    />

                    <motion.div

                        initial={{ x: -320 }}

                        animate={{ x: 0 }}

                        exit={{ x: -320 }}

                        transition={{
                            type: "spring",
                            stiffness: 250,
                            damping: 25,
                        }}

                        className="fixed left-0 top-0 h-screen w-72 bg-base-200 border-r border-base-300 z-50 flex flex-col"

                    >

                        <div className="flex items-center justify-between p-6">

                            <div>

                                <h1 className="text-3xl font-bold text-primary">

                                    InterviewPrep AI

                                </h1>

                                <p className="text-sm opacity-60 mt-1">

                                    Crack Your Dream Job 🚀

                                </p>

                            </div>

                            <button
                                className="btn btn-ghost btn-circle"
                                onClick={() => setOpen(false)}
                            >
                                <X />
                            </button>

                        </div>

                        <div className="flex-1 px-3 space-y-2">

                            {menus.map((menu) => {

                                const Icon = menu.icon;

                                return (

                                    <NavLink

                                        key={menu.path}

                                        to={menu.path}

                                        onClick={() => setOpen(false)}

                                        className={({ isActive }) =>
                                            `flex items-center gap-4 p-4 rounded-xl transition ${
                                                isActive
                                                    ? "bg-primary text-white"
                                                    : "hover:bg-base-300"
                                            }`
                                        }

                                    >

                                        <Icon size={22} />

                                        {menu.name}

                                    </NavLink>

                                );

                            })}

                        </div>

                        <div className="p-5">

                            <button
                                onClick={logoutUser}
                                className="btn btn-error w-full"
                            >

                                <LogOut size={18} />

                                Logout

                            </button>

                        </div>

                    </motion.div>

                </>

            )}

        </AnimatePresence>

    );

};

export default GlobalSidebar;