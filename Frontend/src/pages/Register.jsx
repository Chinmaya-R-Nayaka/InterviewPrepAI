import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { register } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Register = () => {

    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

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

            const res = await register(form);

            loginUser(res.user);

            toast.success("Registration Successful");

            navigate("/dashboard");

        } catch (err) {

            toast.error(
                err.response?.data?.message || "Registration Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-base-200 flex justify-center items-center">

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card w-[430px] bg-base-100 shadow-2xl"
            >

                <div className="card-body">

                    <div className="flex justify-center">

                        <BrainCircuit
                            size={55}
                            className="text-primary"
                        />

                    </div>

                    <h1 className="text-4xl font-bold text-center">

                        Create Account

                    </h1>

                    <p className="text-center text-base-content/70">

                        Start preparing smarter.

                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5 mt-6"
                    >

                        <label className="input input-bordered flex items-center gap-2">

                            <User size={18} />

                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />

                        </label>

                        <label className="input input-bordered flex items-center gap-2">

                            <Mail size={18} />

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

                            <Lock size={18} />

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
                            className={`btn btn-primary w-full ${
                                loading && "btn-disabled"
                            }`}
                        >

                            {

                                loading ?

                                <span className="loading loading-spinner" />

                                :

                                "Create Account"

                            }

                        </button>

                    </form>

                    <div className="divider">

                        OR

                    </div>

                    <p className="text-center">

                        Already have an account?

                        <Link
                            to="/login"
                            className="text-primary ml-2"
                        >

                            Login

                        </Link>

                    </p>

                </div>

            </motion.div>

        </div>

    );

};

export default Register;