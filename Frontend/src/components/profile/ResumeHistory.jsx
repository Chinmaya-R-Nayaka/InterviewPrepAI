import {useEffect,useState} from "react";
import {Trash2,Eye,Download} from "lucide-react";
import {deleteResume,getResumeHistory} from "../../services/resumeService";
import toast from "react-hot-toast";

const ResumeHistory=()=>{

    const[resumes,setResumes]=useState([]);

    useEffect(()=>{
        loadResumes();
    },[]);

    const loadResumes=async()=>{
        const data=await getResumeHistory();
        setResumes(data);
    };

    const handleDelete=async(id)=>{

        if(!window.confirm("Delete this resume?")) return;

        await deleteResume(id);

        toast.success("Resume Deleted");

        loadResumes();

    };

    return(

        <div className="bg-[#1E2530] rounded-xl p-6">

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl text-white font-semibold">

                    Resume History

                </h2>

                <span className="badge badge-primary">

                    {resumes.length}

                </span>

            </div>

            <div className="space-y-4">

                {

                    resumes.map((resume,index)=>(

                        <div
                            key={resume._id}
                            className="bg-[#252E3C] rounded-xl p-5 flex justify-between items-center"
                        >

                            <div>

                                <div className="flex gap-3 items-center">

                                    <h3 className="text-white font-semibold">

                                        {resume.originalName}

                                    </h3>

                                    {

                                        index===0&&(

                                            <span className="badge badge-success">

                                                Latest

                                            </span>

                                        )

                                    }

                                </div>

                                <p className="text-gray-400 mt-2">

                                    Uploaded {" "}
                                    {new Date(resume.createdAt).toLocaleDateString()}

                                </p>

                                <p className="text-indigo-400 mt-1">

                                    Resume Score : {resume.analysis?.score??0}/100

                                </p>

                            </div>

                            <div className="flex gap-3">

                                <a
                                    href={resume.fileUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-circle btn-primary"
                                >

                                    <Eye size={18}/>

                                </a>

                                <a
                                    href={resume.fileUrl}
                                    download
                                    className="btn btn-circle btn-info"
                                >

                                    <Download size={18}/>

                                </a>

                                <button
                                    onClick={()=>handleDelete(resume._id)}
                                    className="btn btn-circle btn-error"
                                >

                                    <Trash2 size={18}/>

                                </button>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

};

export default ResumeHistory;