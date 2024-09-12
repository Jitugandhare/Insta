const express = require("express");
const userRoute = express.Router();
const { register, login, getProfile, logout, editProfile, getSuggestedUsers, followOrUnfollow } = require("../controller/user.controller.js");
const isAuthenticated = require("../middleware/isAuthenticated.js")
const upload = require("../middleware/multer.js")

// Define routes
userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.get("/logout", logout)

userRoute.get("/:id/profile", isAuthenticated, getProfile);
userRoute.post("/profile/edit", isAuthenticated, upload.single("profilePicture"), editProfile);
userRoute.get("/suggested", isAuthenticated, getSuggestedUsers);
userRoute.post("/followersorunfollow/:id", isAuthenticated, followOrUnfollow);

module.exports =  userRoute ; 
