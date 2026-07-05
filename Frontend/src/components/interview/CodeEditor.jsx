import { useState } from "react";
import {
    Play,
    Loader2,
    CheckCircle2,
    XCircle,
} from "lucide-react";

const CodeEditor = ({ interview }) => {

    const [code, setCode] = useState("");

    const [status, setStatus] = useState("idle");

    const handleSubmit = () => {

        setStatus("running");

        setTimeout(() => {

            const ok = Math.random() > 0.3;

            setStatus(ok ? "accepted" : "wrong");

        }, 2500);

    };

    return (

        <div className="h-full flex flex-col bg-base-100">

            {/* Header */}

            <div className="border-b border-base-300 px-6 py-4 flex justify-between items-center">

                <div className="flex gap-3">

                    <select className="select select-bordered select-sm">

                        <option>C++17</option>

                        <option>Java</option>

                        <option>Python</option>

                    </select>

                </div>

                <button

                    className="btn btn-primary"

                    onClick={handleSubmit}

                    disabled={status === "running"}

                >

                    <Play size={18}/>

                    Submit

                </button>

            </div>

            {/* Editor */}

            <textarea

                value={code}

                onChange={(e)=>setCode(e.target.value)}

                className="
                    flex-1
                    p-6
                    resize-none
                    outline-none
                    font-mono
                    text-[15px]
                    bg-base-100
                "

                placeholder="// Write your solution here..."

            />

            {/* Console */}

            <div className="border-t border-base-300 p-5 bg-base-200 min-h-36">

                {

                    status==="idle" && (

                        <p className="opacity-60">

                            Click Submit to run your solution.

                        </p>

                    )

                }

                {

                    status==="running" && (

                        <div className="flex items-center gap-3">

                            <Loader2

                                className="animate-spin"

                                size={20}

                            />

                            <span>

                                Running Test Cases...

                            </span>

                        </div>

                    )

                }

                {

                    status==="accepted" && (

                        <div className="flex items-center gap-3 text-success">

                            <CheckCircle2 size={22}/>

                            <span className="font-semibold">

                                Accepted

                            </span>

                        </div>

                    )

                }

                {

                    status==="wrong" && (

                        <div className="flex items-center gap-3 text-error">

                            <XCircle size={22}/>

                            <span className="font-semibold">

                                Wrong Answer

                            </span>

                        </div>

                    )

                }

            </div>

        </div>

    );

};

export default CodeEditor;