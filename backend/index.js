const express=require("express");
const cors =require("cors");
const cookieparser= require("cookie-parser");

const app=express();







app.listen(8080,async()=>{
    try{
        console.log("server is running on port 8080")
    }catch(err){
        console.log(err)
    }
})