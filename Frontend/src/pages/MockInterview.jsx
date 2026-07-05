import { useState } from "react";

import useInterview from "../hooks/useInterview";
import InterviewScreen from "../components/interview/InterviewScreen";

const topics = ["Arrays", "Strings", "Linked List", "Trees", "Graph", "DP",
    "Binary Search", "Greedy", "OOP", "DBMS", "OS", "CN" ];

const MockInterview = () => {

    const [role, setRole] = useState("SDE Intern");
    const [difficulty, setDifficulty] = useState("Medium");
    const [duration, setDuration] = useState("20");
    const [selectedTopics, setSelectedTopics] = useState([]);

    const interview = useInterview();

    const toggleTopic = (topic) => {
        if(selectedTopics.includes(topic)){
            setSelectedTopics(
                selectedTopics.filter(t => t !== topic)
            );
        } 
        else{
            setSelectedTopics([ ...selectedTopics, topic ]);
        }
    };

    if(interview.sessionId){
        return( 
            <InterviewScreen interview={interview}/>
        );
    }
    return(
        <div className="max-w-5xl mx-auto">
            <div className="card bg-base-100 shadow-xl border border-base-300">
                <div className="card-body space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold">Mock Interview</h1>
                        <p className="opacity-70 mt-2">Prepare for real coding interviews.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-5">
                        <div>
                            <label className="font-medium">Role</label>
                            <select className="select select-bordered w-full mt-2"
                                value={role} onChange={(e)=>setRole(e.target.value)}>
                                <option>SDE Intern</option>
                                <option>SDE I</option>
                                <option>SDE II</option>
                            </select>
                        </div>

                        <div>
                            <label className="font-medium">Difficulty</label>
                            <select className="select select-bordered w-full mt-2"
                                value={difficulty} onChange={(e)=>setDifficulty(e.target.value)}>
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                        </div>

                        <div>
                            <label className="font-medium">Duration</label>
                            <select className="select select-bordered w-full mt-2"
                                value={duration} onChange={(e)=>setDuration(e.target.value)}>
                                <option value="10">10 Minutes</option>
                                <option value="20">20 Minutes</option>
                                <option value="30">30 Minutes</option>
                                <option value="45">45 Minutes</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <h2 className="font-semibold text-xl mb-5">Select Topics</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            { topics.map(topic=>(
                                    <label key={topic}
                                        className="cursor-pointer flex items-center gap-3 p-3 rounded-xl border border-base-300 hover:bg-base-200">
                                        <input type="checkbox" className="checkbox checkbox-primary"
                                            checked={selectedTopics.includes(topic)} onChange={()=>toggleTopic(topic)}/>
                                        {topic}
                                    </label>
                                ))
                            }
                        </div>
                    </div>

                    <button className="btn btn-primary btn-lg w-full"
                        disabled={interview.loading}
                        onClick={() =>
                            interview.start({
                                topic: selectedTopics.join(", "),
                                difficulty, totalQuestions: 5,
                            })
                        }>
                        {interview.loading? "Generating Questions..." : "Start Interview"}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default MockInterview;