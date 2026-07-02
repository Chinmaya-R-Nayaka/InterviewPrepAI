const User = require('../models/User');
const {generateToken} = require('../utils/generateToken');
const { registerSchema, loginSchema } = require('../validators/authValidator');

const registerUser = async (req, res) =>{
    try{
        // Validate the user
        const validateData = registerSchema.parse(req.body);
        const {name, email, password} = validateData;

        const duplicate = await User.findOne({email});
        if(duplicate){
            // 409 --> The request conflicts with the current state of the server.
            return res.status(409).json({
                success : false,
                message : "User already exists",
            });
        }
        
        const user = await User.create({name, email, password});
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                streak: user.streak,
            },
        });
    }
    catch(error){
        if (error.name === "ZodError") {
            return res.status(400).json({
                success: false,
                errors: error.issues,
            });
        }

        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

const loginUser = async (req, res) =>{
    try{
        const validateData = loginSchema.parse(req.body);
        const {email, password} = validateData;

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid Email or Password"
            });
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid Email or Password"
            });
        }

        const token = generateToken(user._id);
        return res.status(200).json({
            success:true,
            message:"Login Successful",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                avatar:user.avatar,
                streak:user.streak
            }
        });
    }
    catch(error){
        if(error.name==="ZodError"){
            return res.status(400).json({
                success:false,
                errors:error.issues
            });
        }

        console.error(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
}

module.exports = {registerUser, loginUser};