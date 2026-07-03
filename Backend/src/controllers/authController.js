const User = require("../models/User");
const { generateToken } = require("../utils/generateToken");
const asyncHandler = require("../utils/asyncHandler");
const cookieOptions = require("../utils/cookieOptions");


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const duplicate = await User.findOne({ email });
    if (duplicate){
        const err = new Error("User already exists");
        err.statusCode = 409;
        throw err;
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);
    res.cookie("token", token, cookieOptions);

    res.status(201).json({
        success: true,
        message: "User Registered Successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            streak: user.streak,
        },
    });
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user){
        const err = new Error("Invalid Email or Password");
        err.statusCode = 401;
        throw err;
    }

    const match = await user.comparePassword(password);
    if(!match){
        const err = new Error("Invalid Email or Password");
        err.statusCode = 401;
        throw err;
    }

    const token = generateToken(user._id);
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
        success: true,
        message: "Login Successful",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            streak: user.streak,
        },
    });
});


const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("token", cookieOptions);
    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});


const getCurrentUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
});


module.exports = {registerUser, loginUser, logoutUser, getCurrentUser};