const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/authRoutes");
const problemRouter = require("./routes/problemRoutes");
const dashboardRouter = require("./routes/dashboardRoutes");
const aiRouter = require("./routes/aiRoutes");
const resumeRouter = require("./routes/resumeRoutes");
const userRouter = require("./routes/userRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");
const app = express();

console.log("CLIENT_URL =", process.env.CLIENT_URL);
// Middlewares
// app.use(cors({
//     origin: ["http://localhost:5173", process.env.CLIENT_URL],
//     credentials: true,
// }));


const allowedOrigins = [
    "http://localhost:5173",
    "https://interview-prep-ai-blush-pi.vercel.app",
    "https://interview-prep-8fzqgyvno-chinmaya-projects.vercel.app",
];

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/problems", problemRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/ai", aiRouter);
app.use("/api/resume",resumeRouter);
app.use("/api/user", userRouter);
// for debuging
// app.use("/problem",(req, res, next) => {
//     console.log("Route HIT: problem");
//     next();
// }, problemRouter);

// Error Middleware
app.use(errorMiddleware);

module.exports = app;