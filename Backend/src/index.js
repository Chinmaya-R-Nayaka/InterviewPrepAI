const express = require('express');
require('dotenv').config();
const app = express();
const main = require('./config/db');
const cookieParser = require('cookie-parser');
// const cors = require('cors');
const userRouter = require('./routes/authRoutes');
const problemRouter = require("./routes/problemRoutes");
const dashboardRouter = require("./routes/dashboardRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const aiRouter = require("./routes/aiRoutes");

// app.use(cors({
//     origin : 'http://localhost:5173', // origin : '*' --> any website can access antha
//     credentials : true
// }))


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/test", authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: "Protected Route",
        user: req.user
    });
});

app.use("/api/auth", userRouter);
app.use("/api/problems", problemRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/ai", aiRouter);
// for debuging
// app.use("/problem",(req, res, next) => {
//     console.log("Route HIT: problem");
//     next();
// }, problemRouter);
app.use(errorMiddleware);

const initializeConnection = async ()=>{
    try{ //client.connect(), 
        await Promise.all([main()]); // Connects Parllely
        console.log("Connected to DB");

        app.listen(process.env.PORT, ()=>{
            console.log(`Listening at Port number ${process.env.PORT}`);
        })
    }
    catch(err){
        console.log("Error: "+err);
    }
}

initializeConnection();