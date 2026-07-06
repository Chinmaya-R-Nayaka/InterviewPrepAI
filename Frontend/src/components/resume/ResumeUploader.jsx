import { useRef } from "react";
import { Upload } from "lucide-react";
import { uploadResume } from "../../services/resumeService";

export default function ResumeUploader(){
    const ref=useRef();
    const choose=()=>ref.current.click();

    const handle=async(e)=>{
        const file=e.target.files[0];
        if(!file) return;
        await uploadResume(file);
        alert("Resume Uploaded");
    };

    return(
        <>
            <input type="file" accept=".pdf" hidden ref={ref} onChange={handle}/>
            <button className="btn btn-primary" onClick={choose}>
                <Upload size={18}/>Upload Resume
            </button>
        </>
    );

}