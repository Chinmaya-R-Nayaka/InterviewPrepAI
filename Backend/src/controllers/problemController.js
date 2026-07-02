const Problem = require("../models/Problem");
const { problemSchema } = require("../validators/problemValidator");

const addProblem = async (req, res) => {
    try{
        const validatedData = problemSchema.parse(req.body);

        const problem = await Problem.create({
            ...validatedData,
            user: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Problem Added Successfully",
            problem,
        });
    } 
    catch(error){
        console.error(error);
        if(error.name === "ZodError"){
            return res.status(400).json({
                success: false,
                errors: error.issues,
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = {addProblem};