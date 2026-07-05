import { BrainCircuit } from "lucide-react";

const EmptyChat = () => {

    return (

        <div className="h-full flex flex-col items-center justify-center text-center">

            <BrainCircuit
                size={60}
                className="text-primary mb-6"
            />

            <h2 className="text-3xl font-bold">

                AI Interview Assistant

            </h2>

            <p className="opacity-70 mt-3">

                Ask anything about DSA, System Design, React,
                Node.js or Interview Preparation.

            </p>

        </div>

    );

};

export default EmptyChat;