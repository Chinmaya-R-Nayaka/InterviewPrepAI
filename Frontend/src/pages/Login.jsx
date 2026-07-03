import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login = () => {

    const navigate = useNavigate();

    const { loginUser } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await login(form);

            loginUser(res.user);

            toast.success("Login Successful");

            navigate("/dashboard");

        } catch (err) {

            toast.error(
                err.response?.data?.message || "Login Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-base-200 flex justify-center items-center">

            <motion.div

                initial={{ opacity:0, scale:0.9 }}

                animate={{ opacity:1, scale:1 }}

                className="card w-[420px] bg-base-100 shadow-2xl"

            >

                <div className="card-body">

                    <div className="flex justify-center mb-3">

                        <BrainCircuit
                            size={55}
                            className="text-primary"
                        />

                    </div>

                    <h1 className="text-4xl font-bold text-center">

                        Welcome Back

                    </h1>

                    <p className="text-center text-base-content/70">

                        Continue your interview preparation

                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5 mt-6"
                    >

                        <label className="input input-bordered flex items-center gap-2">

                            <Mail size={18}/>

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"

                                value={form.email}

                                onChange={handleChange}

                                required
                            />

                        </label>

                        <label className="input input-bordered flex items-center gap-2">

                            <Lock size={18}/>

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"

                                value={form.password}

                                onChange={handleChange}

                                required
                            />

                        </label>

                        <button

                            className={`btn btn-primary w-full ${loading && "btn-disabled"}`}

                        >

                            {

                                loading

                                ?

                                <span className="loading loading-spinner"/>

                                :

                                "Login"

                            }

                        </button>

                    </form>

                    <div className="divider">

                        OR

                    </div>

                    <p className="text-center">

                        Don't have an account?

                        <Link
                            to="/register"
                            className="text-primary ml-2"
                        >

                            Register

                        </Link>

                    </p>

                </div>

            </motion.div>

        </div>

    );

};

export default Login;