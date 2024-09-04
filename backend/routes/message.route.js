const express=require("express");
const isAuthenticated=require("../middleware/isAuthenticated.js")
const {sendMessage, getMessage}=require("../controller/message.controller.js")
const messageRouter=express.Router();

messageRouter.post("/send/:id",isAuthenticated,sendMessage)

messageRouter.get("/all/:id",isAuthenticated,getMessage)


module.exports=messageRouter