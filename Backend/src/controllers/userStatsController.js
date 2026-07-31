const asyncHandler=require("../utils/asyncHandler");
const Resume=require("../models/Resume");
const Problem=require("../models/Problem");
const InterviewSession=require("../models/InterviewSession");

exports.getUserStats=asyncHandler(async(req,res)=>{

    const user=req.user._id;

    const resumes=await Resume.countDocuments({user});

    const problems=await Problem.countDocuments({
        user,
        status:"Solved"
    });

    const interviews=await InterviewSession.countDocuments({
        user
    });

    const latestResume=await Resume.findOne({
        user
    }).sort({
        createdAt:-1
    });

    res.status(200).json({

        success:true,

        stats:{

            resumes,

            problems,

            interviews,

            latestResumeScore:latestResume?.analysis?.score||0

        }

    });

});