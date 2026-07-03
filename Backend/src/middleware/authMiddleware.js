const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    try{
        console.log(req.headers.authorization);
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Access Denied",
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);

        // .select("-password") --> means Fetch everything except password.
        const user = await User.findById(decoded.user_id).select("-password");
        console.log("User:", user);
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }
        req.user = user;
        next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }
};

module.exports = authMiddleware;