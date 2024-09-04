const express = require("express");
const sharp = require('sharp');
const cloudinary = require('../utils/cloudinary');
const Post = require("../model/post.model");
const User = require("../model/user.model");
const Comment=require("../model/comment.model");

const addNewPost = async (req, res) => {
    try {
        const { caption } = req.body;
        const image = req.file;
        const authorId = req.id;

        if (!image) {
            return res.status(400).json({
                message: "Image required"
            });
        }

        // Image processing and uploading...
        const optimizedImageBuffer = await sharp(image.buffer)
            .resize({ width: 800, height: 800, fit: 'inside' })
            .toFormat('jpeg', { quality: 80 })
            .toBuffer();

        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUri);

        const post = await Post.create({
            caption,
            image: cloudResponse.secure_url,
            author: authorId
        });

        const user = await User.findById(authorId);
        if (user) {
            user.posts.push(post._id);
            await user.save();
        }

        await post.populate({ path: 'author', select: "-password" });

        return res.status(201).json({
            message: "New post added",
            success: true,
            post
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate({ path: 'author', select: 'username, profilePicture' })
            .populate({
                path: 'comments',
                sort: { createdAt: -1 },
                populate: {
                    path: 'author',
                    select: 'username, profilePicture'
                }
            });

        return res.status(200).json({
            message: "Posts retrieved successfully",
            success: true,
            posts
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const getUserPost = async (req, res) => {
    try {
        const authorId = req.id;
        const posts = await Post.find({ author: authorId }).sort({ createdAt: -1 }).populate({
            path: 'author',
            select: 'username, profilePicture'
        }).populate({
            path: 'comments',
            sort: { createdAt: -1 },
            populate: {
                path: 'author',
                select: 'username, profilePicture'
            }
        })
        return res.status(200).json({

            success: true,
            posts
        });

    } catch (err) {
        console.log(err)
    }
}


const likePost=async(req,res)=>{
    try{
        const likeKrnewala=req.id;
        const postId=req.params.id;
        const post=await Post.findById(postId);
        if(!post){
            return res.status(404).json({
                message:"Post is not found",
                success:false
            })
        }
        // like
        await post.updateOne({$addToSet:{likes:likeKrnewala}})
        await post.save()

        // implement real time notification using socket.io

        return res.status().json({
            message:"Post liked",
            success:true
        })

    }catch(err){
        console.log(err)
    }
}

const dislikePost=async(req,res)=>{
    try{
        const likeKrnewala=req.id;
        const postId=req.params.id;
        const post=await Post.findById(postId);
        if(!post){
            return res.status(404).json({
                message:"Post is not found",
                success:false
            })
        }
        // like
        await post.updateOne({$pull:{likes:likeKrnewala}})
        await post.save()

        // implement real time notification using socket.io

        return res.status().json({
            message:"Post liked",
            success:true
        })

    }catch(err){
        console.log(err)
    }
}


// comments

const addComment = async (req, res) => {
    try {
      const postId = req.params.id;
      const commentKrneWalaUserKiId = req.id;
  
      const { text } = req.body;
  
      const post = await Post.findById(postId);
  
      if (!text) 
        return res.status(400).json({ message: 'text is required', success: false });
  
      const comment = await Comment.create({
        text,
        author: commentKrneWalaUserKiId,
        post: postId
      }).populate({
        path: 'author',
        select: "username, profilePicture"
      });
  
      post.comments.push(comment._id);
      await post.save();
  
      return res.status(201).json({ message: 'Comment added successfully', success: true, comment });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server error', success: false });
    }
  };
  
// comments of post

const getCommentsOfPost=async(req,res)=>{
    try{
        const postId=req.params.id;
        const comments=await Comment.find({post:postId}).populate('author','username,profilePicture')
        if(!comments){
            return res.status(404).json({
                message:"No comments found",
                success:false
            })
        }

        return res.status(200).json({
            comments,
            success:true
        })

    }catch(err){
        console.log(err)
    }
}

//  delete Post


const deletePost=async(req,res)=>{
    try{
        const postId=req.params.id;
        const authorId=req.id;
        const post=await Post.findById(postId);
        if(!post){
            return res.status(404).json({
                message:"Post is not found",
                success:false
            })
        }

        // check if the logged user is the owner of the post

        if(post.author.toString()!==authorId){
            return res.status(403).json({
                message:"Unauthorized"
            })
        }
        await Post.findByIdAndDelete(postId);
        // remove the post id from users post

        let user=await User.findById(authorId);
        user.posts=user.posts.filter(id=>id.toString()!==postId);
        await user.save();

        // delete associated comments

        await Comment.deleteMany({post:postId});
        return res.status(200).json({
            message:"Post deleted",
            success:true
        })


    }catch(err){
        console.log(err)
    }
}


// bookmark posts

const bookmarkPost=async(req,res)=>{
    try{
        const postId=req.params.id;
        const authorId=req.id;
        const post =await Post.findById(postId);
        if(!post){
            return res.status(404).json({
                message:"Post is not found",
                success:false
            })
        }
        const user=await User.findById(authorId);
       
        if(user.bookmarks.includes(post._id)){
            // already bookmarked==remove from bookmark
            await user.updateOne({$pull:{bookmarks:post._id}})
            await user.save()
            return res.status(200).json({type:"unsaved",message:"post removed from bookmark",success:true})
        }else{
            await user.updateOne({$addToSet:{bookmarks:post._id}})
            await user.save()
            return res.status(200).json({type:"saved",message:"post bookmarked",success:true})
        }


    }catch(err){
        console.log(err);
    }
}







module.exports = {
    addNewPost,
    getAllPost,getUserPost,likePost,dislikePost,addComment,
    getCommentsOfPost,deletePost,bookmarkPost
};
