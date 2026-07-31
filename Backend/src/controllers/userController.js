const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");

exports.getProfile = asyncHandler(async(req,res)=>{

    const user=await User.findById(req.user._id).select("-password");
    res.status(200).json({
        success:true,
        user
    });

});

exports.updateProfile = asyncHandler(async(req,res)=>{

    const{name, bio, college, branch, graduationYear, github,
        leetcode, codeforces, linkedin, skills} = req.body;

    const user = await User.findById(req.user._id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        });
    }

    user.name = name??user.name;
    user.bio = bio??user.bio;
    user.college = college??user.college;
    user.branch = branch??user.branch;
    user.graduationYear = graduationYear??user.graduationYear;
    user.github = github??user.github;
    user.leetcode = leetcode??user.leetcode;
    user.codeforces = codeforces??user.codeforces;
    user.linkedin = linkedin??user.linkedin;
    user.skills = skills??user.skills;

    await user.save();
    res.status(200).json({
        success:true,
        user
    });

});