const express=require("express");
const isAuthenticated=require("../middleware/isAuthenticated.js")
const upload=require("../middleware/multer.js")
const {addNewPost, getAllPost, getUserPost, likePost, dislikePost, addComment, getCommentsOfPost, deletePost, bookmarkPost}=require("../controller/post.controller.js")
const postRouter=express.Router();

postRouter.post("/addpost",isAuthenticated,upload.single("image"),addNewPost)
postRouter.get("/all",isAuthenticated,getAllPost);
postRouter.get("/userpost/all",isAuthenticated,getUserPost);
postRouter.get("/:id/like",isAuthenticated,likePost);
postRouter.get("/:id/dislike",isAuthenticated,dislikePost);
postRouter.post("/:id/comment",isAuthenticated,addComment);
postRouter.post("/:id/commet/all",isAuthenticated,getCommentsOfPost);
postRouter.delete("/delete/:id",isAuthenticated,deletePost);
postRouter.post("/:id/bookmark",isAuthenticated,bookmarkPost);



module.exports=postRouter;