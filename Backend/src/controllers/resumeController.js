const asyncHandler=require("../utils/asyncHandler");
const Resume=require("../models/Resume");
const uploadResume=require("../utils/uploadResume");
const extractResumeText=require("../utils/extractResumeText");
const {resumeAnalysisPrompt}=require("../prompts/resumePrompt");
const {generateAIResponse}=require("../services/aiService");

exports.upload=asyncHandler(async(req,res)=>{

    if(!req.file){
        return res.status(400).json({
            success:false,
            message:"Resume required"
        });
    }

    const uploaded=await uploadResume(req.file.buffer);

    const resumeText=(await extractResumeText(req.file.buffer)).slice(0,8000);

    let analysis;

    try{

        const aiResponse=await generateAIResponse(
            resumeAnalysisPrompt(resumeText)
        );

        analysis=JSON.parse(
            aiResponse.replace(/```json|```/g,"").trim()
        );

    }
    catch(err){

        console.error("Resume Analysis Error:",err);

        analysis={
            score:0,
            atsScore:0,
            skills:[],
            missingSkills:[],
            strengths:[],
            weaknesses:[],
            suggestions:[
                "AI analysis is temporarily unavailable. Please try again later."
            ]
        };

    }

    const resume=await Resume.create({
        user:req.user._id,
        fileUrl:uploaded.secure_url,
        publicId:uploaded.public_id,
        originalName:req.file.originalname,
        text:resumeText,
        analysis
    });

    res.status(201).json({
        success:true,
        resume
    });

});

exports.getResumeAnalysis=asyncHandler(async(req,res)=>{

    const resume=await Resume.findOne({
        user:req.user._id
    });

    if(!resume){
        return res.status(404).json({
            success:false,
            message:"Resume not found"
        });
    }

    res.status(200).json({
        success:true,
        analysis:resume.analysis
    });

});


exports.getResumeHistory=asyncHandler(async(req,res)=>{

    const resumes=await Resume.find({
        user:req.user._id
    }).sort({
        createdAt:-1
    });

    res.status(200).json({
        success:true,
        resumes
    });

});

exports.deleteResume=asyncHandler(async(req,res)=>{

    const resume=await Resume.findOne({
        _id:req.params.id,
        user:req.user._id
    });

    if(!resume){
        return res.status(404).json({
            success:false,
            message:"Resume not found"
        });
    }

    await Resume.findByIdAndDelete(resume._id);

    res.status(200).json({
        success:true,
        message:"Resume deleted successfully"
    });

});