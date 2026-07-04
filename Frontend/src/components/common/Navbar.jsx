import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-6">

            <div className="flex-1">

                <Link
                    to="/"
                    className="text-2xl font-bold text-primary"
                >
                    InterviewPrep AI
                </Link>

            </div>

            <div className="flex gap-3">

                <Link
                    to="/login"
                    className="btn btn-ghost"
                >
                    Login
                </Link>

                <Link
                    to="/register"
                    className="btn btn-primary"
                >
                    Get Started
                </Link>

            </div>

        </div>
    );
};

export default Navbar;