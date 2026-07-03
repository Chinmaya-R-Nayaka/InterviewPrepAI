const mongoose = require("mongoose");

const interviewSessionSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    topic:{
        type:String,
        required:true
    },

    difficulty:{
        type:String,
        enum:["Easy","Medium","Hard"],
        default:"Medium"
    },

    totalQuestions:{
        type:Number,
        default:5
    },

    currentQuestion:{
        type:Number,
        default:1
    },

    score:{
        type:Number,
        default:0
    },

    completed:{
        type:Boolean,
        default:false
    },

    history:[
        {
            question:String,
            answer:String,
            feedback:String,
            score:Number
        }
    ]
},
{
    timestamps:true
});

module.exports = mongoose.model(
    "InterviewSession",
    interviewSessionSchema
);