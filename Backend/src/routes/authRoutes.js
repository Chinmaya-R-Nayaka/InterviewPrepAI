const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { registerSchema, loginSchema } = require('../validators/authValidator');
const validate = require('../middleware/validate');
const userRouter = express.Router();

userRouter.post("/register", validate(registerSchema), registerUser);
userRouter.post("/login", validate(loginSchema), loginUser);

module.exports = userRouter;