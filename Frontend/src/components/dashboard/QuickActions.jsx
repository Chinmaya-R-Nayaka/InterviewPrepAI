import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Card from "../common/Card";
import { Upload, Brain, Code } from "lucide-react";
import { uploadResume } from "../../services/resumeService";

const QuickActions = () => {

    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const handleResumeUpload = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        try {

            toast.loading("Uploading Resume...", {
                id: "resume",
            });

            await uploadResume(file);

            toast.success("Resume Uploaded Successfully!", {
                id: "resume",
            });
            navigate("/resume-analysis");
        }

        catch (err) {

            console.error(err);

            toast.error("Upload Failed", {
                id: "resume",
            });

        }

    };

    const actions = [

        {
            icon: <Upload size={30} />,
            title: "Upload Resume",
            color: "bg-blue-500/10",
            onClick: () => fileInputRef.current.click(),
        },

        {
            icon: <Brain size={30} />,
            title: "AI Interview",
            color: "bg-green-500/10",
            onClick: () => navigate("/mock-interview"),
        },

        {
            icon: <Code size={30} />,
            title: "Solve Problems",
            color: "bg-purple-500/10",
            onClick: () => navigate("/problems"),
        },

    ];

    return (

        <Card>

            <h2 className="text-xl font-semibold text-white mb-6">
                Quick Actions
            </h2>

            <div className="grid grid-cols-3 gap-5">

                {actions.map((item, index) => (

                    <button
                        key={index}
                        onClick={item.onClick}
                        className={`
                            ${item.color}
                            rounded-xl
                            h-36
                            hover:scale-105
                            hover:shadow-xl
                            transition-all
                            duration-300
                            flex
                            flex-col
                            justify-center
                            items-center
                            gap-4
                        `}
                    >

                        {item.icon}

                        <span className="text-white font-medium">
                            {item.title}
                        </span>

                    </button>

                ))}

            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                hidden
                onChange={handleResumeUpload}
            />

        </Card>

    );

};

export default QuickActions;