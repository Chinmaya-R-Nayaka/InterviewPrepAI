import { motion } from "framer-motion";
import AnimatedNumber from "../common/AnimatedNumber";

const DashboardCards = ({
    title,
    value,
    icon,
    color = "text-primary",
}) => {

    const numericValue =
        typeof value === "number"
            ? value
            : parseInt(value);

    return (

        <motion.div

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            whileHover={{
                y: -6,
                scale: 1.02,
            }}

            transition={{
                duration: 0.3,
            }}

            className="
                bg-base-100
                border
                border-base-300
                rounded-2xl
                shadow-lg
                p-6
                cursor-pointer
            "

        >

            <div className="flex justify-between items-start">

                <div>

                    <p className="text-sm text-base-content/70 font-medium">

                        {title}

                    </p>

                    <h2 className="text-4xl font-bold mt-4">

                        {

                            Number.isNaN(numericValue)

                                ?

                                value

                                :

                                <AnimatedNumber value={numericValue} />

                        }

                    </h2>

                </div>

                <div

                    className={`
                        h-14
                        w-14
                        rounded-xl
                        bg-base-200
                        flex
                        items-center
                        justify-center
                        ${color}
                    `}

                >

                    {icon}

                </div>

            </div>

        </motion.div>

    );

};

export default DashboardCards;