const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    url:String,

    publicId:String,

    text:String,

    analysis:{
        score:Number,
        atsScore:Number,
        skills:[String],
        missingSkills:[String],
        strengths:[String],
        weaknesses:[String],
        suggestions:[String]
    }

},{
    timestamps:true
});

module.exports=mongoose.model("Resume",resumeSchema);