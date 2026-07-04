import {
    animate,
    useMotionValue,
    useTransform,
} from "framer-motion";

import {
    useEffect,
    useState,
} from "react";

const AnimatedNumber = ({ value }) => {

    const motionValue = useMotionValue(0);

    const rounded = useTransform(
        motionValue,
        (latest) => Math.round(latest)
    );

    const [display, setDisplay] = useState(0);

    useEffect(() => {

        const unsubscribe = rounded.on("change", (latest) => {
            setDisplay(latest);
        });

        const controls = animate(
            motionValue,
            value,
            {
                duration: 1.5,
            }
        );

        return () => {
            unsubscribe();
            controls.stop();
        };

    }, [value]);

    return <span>{display}</span>;

};

export default AnimatedNumber;