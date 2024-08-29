const express=require("express");
const connection=require("./utils/db")
const cors =require("cors");
const cookieparser= require("cookie-parser");
const dotenv=require("dotenv");
dotenv.config()

const app=express();
app.get("/",(req,res)=>{
    return res.status(200).json({
        message:"data from backend",
        success:true
    })

})
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({extended:true}))
app.use(cors());

const corsOptions={
    origin:"http://localhost:5173",
    credentials:true
}







app.listen(8080,async()=>{
    try{
        console.log(`server is running on port 8080`);
        console.log("connected to DB");
    }catch(err){
        console.log(err)
    }
})