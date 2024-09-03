const express = require("express");
const sharp = require('sharp');
const cloudinary = require('../utils/cloudinary');
const Post = require("../model/post.model")
const User = require("../model/user.model")



const addNewPost = async (req, res) => {
    try {

        const { caption } = req.body;
        const image = req.file;
        const authorId = req.id;

        if (!image) {
            return res.status(400).json({
                message: "Image required"
            })
        }

        // image uploading...
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
        })

        const user = await User.findById(authorId);
        if (user) {
            user.posts.push(post._id);
            await user.save();

        }

        await post.populate({path:'author',select:"-password"})
        return res.status(201).json({
            message:"New post add",
            success:true,
            post
        })


    } catch (err) {
        console.log(err)
    }
}


const getAllPost=async(req,res)=>{
    try{
        const post=await Post.find().sort({createdAt:-1}).populate({path:'author',select:'username,profilePicture'})
        .populate({
            path:'comments',
            sort:{createdAt:-1},
            populate:{
                path:'author',
                select:'username,profilePicture'
            }
        })


    }catch(err){
        console.log(err)
    }
}



module.exports = {
    addNewPost,
};