import { useState } from "react";
import MarkdownMessage from "../ai/MarkdownMessage";

const BottomPanel = ({ interview }) => {

    const [tab, setTab] = useState("feedback");

    return (

        <div className="h-full flex flex-col bg-base-100">

            <div className="tabs tabs-boxed rounded-none bg-base-200 p-2">

                <button
                    className={`tab ${tab==="feedback" ? "tab-active" : ""}`}
                    onClick={()=>setTab("feedback")}
                >
                    AI Feedback
                </button>

                <button
                    className={`tab ${tab==="console" ? "tab-active" : ""}`}
                    onClick={()=>setTab("console")}
                >
                    Console
                </button>

            </div>

            <div className="flex-1 overflow-y-auto p-6">

                {

                    tab==="feedback" && (

                        interview?.feedback ?

                        <div className="max-h-full overflow-y-auto">

                            <MarkdownMessage
                                content={interview.feedback}
                            />

                        </div>

                        :

                        <div className="opacity-60">

                            Submit your code to receive AI feedback.

                        </div>

                    )

                }

                {

                    tab==="console" && (

                        <div className="font-mono opacity-70">

                            No logs available.

                        </div>

                    )

                }

            </div>

        </div>

    );

};

export default BottomPanel;