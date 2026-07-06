const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/authRoutes");
const problemRouter = require("./routes/problemRoutes");
const dashboardRouter = require("./routes/dashboardRoutes");
const aiRouter = require("./routes/aiRoutes");
const resumeRouter=require("./routes/resumeRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");
const app = express();

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
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
// for debuging
// app.use("/problem",(req, res, next) => {
//     console.log("Route HIT: problem");
//     next();
// }, problemRouter);

// Error Middleware
app.use(errorMiddleware);

module.exports = app;