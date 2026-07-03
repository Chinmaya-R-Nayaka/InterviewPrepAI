import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
    return (
        <section className="hero min-h-[90vh]">

            <div className="hero-content text-center">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="max-w-4xl"
                >

                    <div className="badge badge-primary badge-lg mb-6">
                        AI Powered Interview Preparation
                    </div>

                    <h1 className="text-6xl font-extrabold">

                        Crack Your Dream Tech Job

                    </h1>

                    <p className="py-8 text-lg text-gray-400">

                        Master DSA, solve coding problems,
                        practice AI mock interviews,
                        track your progress,
                        and prepare smarter.

                    </p>

                    <div className="flex justify-center gap-5">

                        <Link
                            to="/register"
                            className="btn btn-primary btn-lg"
                        >
                            Start Free
                        </Link>

                        <a
                            href="https://github.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-outline btn-lg"
                        >
                            GitHub
                        </a>

                    </div>

                </motion.div>

            </div>

        </section>
    );
};

export default Hero;