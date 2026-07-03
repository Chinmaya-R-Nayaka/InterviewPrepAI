const express = require('express');
const { registerUser, loginUser, logoutUser, getCurrentUser } = require('../controllers/authController');
const { registerSchema, loginSchema } = require('../validators/authValidator');
const validate = require('../middleware/validate');
const authMiddleware = require('../middleware/authMiddleware');
const userRouter = express.Router();

userRouter.post("/register", validate(registerSchema), registerUser);
userRouter.post("/login", validate(loginSchema), loginUser);
userRouter.post("/logout", authMiddleware, logoutUser);
userRouter.get("/me", authMiddleware, getCurrentUser);

module.exports = userRouter;