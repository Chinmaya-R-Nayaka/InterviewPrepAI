const Problem = require("../models/Problem");
const asyncHandler = require("../utils/asyncHandler");
const { problemSchema } = require("../validators/problemValidator");

const addProblem = asyncHandler(async (req, res) => {

    const problem = await Problem.create({
        ...req.body,
        user: req.user._id
    });

    res.status(201).json({
        success: true,
        message: "Problem Added Successfully",
        problem
    });

});

const getAllProblems = asyncHandler(async (req, res) => {

    const { search = "", difficulty, status,
        platform, topic, sort = "newest", page = 1, limit = 10 } = req.query;

    const query = { user: req.user._id };

    if(search){
        query.$or = [
            {title: { $regex: search,
                    $options: "i" // Case insensitive
                }},
            {topic: { $regex: search, $options: "i" }},
            {platform: { $regex: search, $options: "i" }},
        ]; // $or --> match atleast one condition
    }

    if(difficulty) query.difficulty = difficulty;
    if(status) query.status = status;
    if(platform) query.platform = platform;
    if(topic) query.topic = topic;

    const problems = await Problem.find(query)
        .sort({createdAt: -1})
        .skip((page - 1) * limit)
        .limit(Number(limit));

    const total = await Problem.countDocuments(query);
    const solved = await Problem.countDocuments({
        user: req.user._id, status: "Solved",
    });
    const attempted = await Problem.countDocuments({
        user: req.user._id, status: "Attempted",
    });
    const todo = await Problem.countDocuments({
        user: req.user._id, status: "Todo",
    });
    const easy = await Problem.countDocuments({
        user: req.user._id, difficulty: "Easy",
    });
    const medium = await Problem.countDocuments({
        user: req.user._id, difficulty: "Medium",
    });
    const hard = await Problem.countDocuments({
        user: req.user._id, difficulty: "Hard",
    });

    res.status(200).json({
        success: true,
        total, solved, attempted, todo, easy, medium, hard,
        page: Number(page),
        totalPages: Math.ceil(total / limit),
        problems
    });

});

// get single problem
const getProblem = async (req,res)=>{
    try{
        // to check the ownership --> like this problem was actually solved by this user only 
        // if user A copies ProblemId of user B then he still get 404 error --> adhike .findOne()
        const problem = await Problem.findOne({_id:req.params.id,user:req.user._id});
        if(!problem){
            return res.status(404).json({
                success:false,
                message:"Problem not found"
            });
        }
        res.status(200).json({
            success:true,
            problem
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
}

const updateProblem = asyncHandler(async (req, res) => {

    const updatedProblem = await Problem.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id, },
        req.body,
        { new: true, runValidators: true, }
    );

    if(!updatedProblem){
        return res.status(404).json({
            success: false,
            message: "Problem not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "Problem updated successfully",
        problem: updatedProblem,
    });
});

const deleteProblem = asyncHandler(async (req, res) => {

    const deletedProblem = await Problem.findOneAndDelete({_id: req.params.id,user: req.user._id,});
    if(!deletedProblem){
        return res.status(404).json({
            success: false,
            message: "Problem not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "Problem deleted successfully",
    });
});

module.exports = {addProblem, getAllProblems, getProblem, 
    updateProblem, deleteProblem};



// Notes
// Notice I never wrote Problem.findById(req.params.id) 
// Instead, I always use: Problem.findOne({_id: req.params.id,user: req.user._id,});
// becz suppose User A owns Probelem X & User B knows the ID of Problem X.
// if we use: Problem.findById(id) User B could access User A's data.
// so that's why By always querying with both: {_id: req.params.id,user: req.user._id,}
// the database itself enforces ownership