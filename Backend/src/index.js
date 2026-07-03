require("dotenv").config();

const app = require("./app");
const main = require('./config/db');

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