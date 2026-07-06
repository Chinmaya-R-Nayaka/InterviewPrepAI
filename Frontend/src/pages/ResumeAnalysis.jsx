import { useEffect,useState } from "react";
import { getResumeAnalysis } from "../services/resumeService";

const ResumeAnalysis=()=>{

    const [analysis,setAnalysis]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        const loadAnalysis=async()=>{

            try{

                const data=await getResumeAnalysis();
                setAnalysis(data);

            }catch(err){
                console.log(err);
            }

            setLoading(false);

        };

        loadAnalysis();

    },[]);

    if(loading){
        return(
            <div className="flex justify-center items-center h-[80vh]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if(!analysis){
        return(
            <div className="text-center mt-20">
                No Resume Analysis Found
            </div>
        );
    }

    return(

        <div className="max-w-7xl mx-auto space-y-8">

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-4xl font-bold">
                        Resume Analysis
                    </h1>

                    <p className="opacity-70 mt-2">
                        AI Powered Resume Review
                    </p>

                </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

                <div className="card bg-base-200 shadow-xl">

                    <div className="card-body">

                        <h2 className="text-xl font-bold">
                            Resume Score
                        </h2>

                        <div className="text-6xl text-primary font-bold mt-6">
                            {analysis.score}/100
                        </div>

                    </div>

                </div>

                <div className="card bg-base-200 shadow-xl">

                    <div className="card-body">

                        <h2 className="text-xl font-bold">
                            ATS Score
                        </h2>

                        <div className="text-6xl text-success font-bold mt-6">
                            {analysis.atsScore}/100
                        </div>

                    </div>

                </div>

            </div>

            <div className="grid lg:grid-cols-2 gap-6">

                <div className="card bg-base-200">

                    <div className="card-body">

                        <h2 className="text-xl font-bold mb-3">
                            Skills
                        </h2>

                        <div className="flex flex-wrap gap-2">

                            {analysis.skills.map(skill=>(

                                <span
                                    key={skill}
                                    className="badge badge-primary badge-lg"
                                >
                                    {skill}
                                </span>

                            ))}

                        </div>

                    </div>

                </div>

                <div className="card bg-base-200">

                    <div className="card-body">

                        <h2 className="text-xl font-bold mb-3">
                            Missing Skills
                        </h2>

                        <div className="flex flex-wrap gap-2">

                            {analysis.missingSkills.map(skill=>(

                                <span
                                    key={skill}
                                    className="badge badge-error badge-lg"
                                >
                                    {skill}
                                </span>

                            ))}

                        </div>

                    </div>

                </div>

            </div>

            <div className="grid lg:grid-cols-3 gap-6">

                <div className="card bg-base-200">

                    <div className="card-body">

                        <h2 className="text-xl font-bold mb-4">
                            Strengths
                        </h2>

                        <ul className="space-y-2">

                            {analysis.strengths.map((item,index)=>(

                                <li key={index}>
                                    • {item}
                                </li>

                            ))}

                        </ul>

                    </div>

                </div>

                <div className="card bg-base-200">

                    <div className="card-body">

                        <h2 className="text-xl font-bold mb-4">
                            Weaknesses
                        </h2>

                        <ul className="space-y-2">

                            {analysis.weaknesses.map((item,index)=>(

                                <li key={index}>
                                    • {item}
                                </li>

                            ))}

                        </ul>

                    </div>

                </div>

                <div className="card bg-base-200">

                    <div className="card-body">

                        <h2 className="text-xl font-bold mb-4">
                            Suggestions
                        </h2>

                        <ul className="space-y-2">

                            {analysis.suggestions.map((item,index)=>(

                                <li key={index}>
                                    • {item}
                                </li>

                            ))}

                        </ul>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default ResumeAnalysis;