import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Problems from "../pages/Problems";
import AI from "../pages/AIAssistant";
import MockInterview from "../pages/MockInterview";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import DashboardLayout from "../layouts/DashboardLayout";

import ProtectedRoute from "../components/common/ProtectedRoute";

const AppRoutes = () => {

    return (

        <Routes>

            <Route path="/" element={<Landing />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>

        <Route element={<DashboardLayout />}>

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />

            <Route
                path="/problems"
                element={<Problems />}
            />

            <Route
                path="/ai"
                element={<AI />}
            />

            <Route
                path="/mock-interview"
                element={<MockInterview />}
            />

            <Route
                path="/profile"
                element={<Profile />}
            />

        </Route>

    </Route>
            <Route path="*" element={<NotFound />} />

        </Routes>

    );

};

export default AppRoutes;