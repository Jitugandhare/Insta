const express = require("express");
const connection = require("./utils/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user.route.js"); 
const postRoute=require("./routes/post.route.js");
const messageRoute=require("./routes/message.route.js")
const {app,server} =require('./socket/socket.js')
const dotenv = require("dotenv");
dotenv.config();



app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Setting up CORS with options
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Data from backend",
        success: true,
    });
});

// Use user routes
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/message", messageRoute);


server.listen(8080, async () => {
    try {
        await connection; 
        console.log("Connected to DB");
        console.log(`Server is running on port 8080`);
    } catch (err) {
        console.log("Error connecting to the database:", err);
    }
});
