import axios from "./api";

export const uploadResume=async(file)=>{
    const formData=new FormData();
    formData.append("resume",file);

    const res=await axios.post(
        "/resume/upload",
        formData,
        {
            headers:{
                "Content-Type":"multipart/form-data",
            },
            onUploadProgress(progressEvent){
                const percent=Math.round(
                    (progressEvent.loaded*100)/
                    progressEvent.total
                );
                console.log(percent);
            },
        }
    );

    return res.data;
};

export const getResumeAnalysis=async()=>{
    const res=await axios.get("/resume/analysis");
    return res.data.analysis;
};