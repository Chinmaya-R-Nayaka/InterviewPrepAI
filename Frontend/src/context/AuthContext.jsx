import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is already logged in
    useEffect(() => {

        const fetchCurrentUser = async () => {

            try {

                const res = await api.get("/auth/me");

                setUser(res.data.user);

            } catch (err) {

                setUser(null);

            } finally {

                setLoading(false);

            }

        };

        fetchCurrentUser();

    }, []);

    const loginUser = (user) => {

        setUser(user);

    };

    const logoutUser = async () => {

        try {
            await api.post("/auth/logout");
        } catch (err) {}

        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                loginUser,
                logoutUser
            }}
        >
            {children}
        </AuthContext.Provider>

    );
};

export const useAuth = () => useContext(AuthContext);