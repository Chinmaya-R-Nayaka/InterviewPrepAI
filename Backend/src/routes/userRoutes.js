const express = require("express");
const userRouter = express.Router();
const auth = require("../middleware/authMiddleware");

const{getProfile, updateProfile}=require("../controllers/userController");
const { getUserStats } = require("../controllers/userStatsController");
const authMiddleware = require("../middleware/authMiddleware");

userRouter.get("/profile", auth, getProfile);
userRouter.put("/profile", auth, updateProfile);
userRouter.get("/stats", authMiddleware, getUserStats);

module.exports = userRouter;