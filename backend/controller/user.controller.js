const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const UserModel = require("../model/user.model.js")
const getDataUri = require("../utils/datauri.js");
const cloudinary = require("../utils/cloudinary.js")

const PostModel = require("../model/post.model.js");

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(401).json({
                message: "Something is missing,Try again",
                succss: false,
            });
        }

        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(401).json({
                message: "Email is already exist",
                succss: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        await UserModel.create({
            username,
            email,
            password: hashedPassword
        })
        return res.status(201).json({
            message: "Account succefully created",
            success: true
        })

    } catch (err) {
        console.log(err)
    }

}

// Login controller

const login = async (req, res) => {


    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "Something went wrong",
                success: false
            })
        }
        // let blocked=await UserDeactivation.findOne({email});
        // if(!blocked){
        //     return res.status(401).json({
        //         messaeg : "user is blocked",
        //         success:false,
        //     })
        // }

        let user = await UserModel.findOne({ email });


        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            })
        }
        const matchedPassword = await bcrypt.compare(password, user.password);

        if (!matchedPassword) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            })

        }
        const populatedPosts=await Promise.all(
            user.posts.map(async (postId)=>{
                const post = await PostModel.findById(postId)
                if(post.author.equals(user._id)){
                    return post;
                }
                return null;

            })
        )

        user = {
            _id: user.id,
            username: user.username,
            email: user.email,
            profilepicture: user.profilepicture,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
            posts:populatedPosts
        }


        const token = await jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: "1d" })
        return res.cookie("token", token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
            message: `Welcome back ${user.username}`,
            success: true,
            user
        })
    } catch (err) {
        console.log(err)
    }
}




// logout controller
const logout = async (req, res) => {

    try {

        return res.cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true,
        })
    } catch (err) {
        console.log(err)
    }
}

// get profile

const getProfile = async (req, res) => {

    try {
        const userId = req.params.id;
        let user = await UserModel.findById(userId).select("-password");
        return res.status(200).json({
            user,
            success: true,
        })

    } catch (err) {
        console.log(err);
    }
}

// Edit profile
const editProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { bio, gender } = req.body;
        const profilePicture = req.file;
        let cloudResponse;

        if (profilePicture) {
            const fileUri = getDataUri(profilePicture);
            cloudResponse = await cloudinary.uploader.upload(fileUri);
        }

        const user = await UserModel.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({
                message: 'User not found.',
                success: false
            });
        }
        if (bio) user.bio = bio;
        if (gender) user.gender = gender;
        if (profilePicture) user.profilepicture = cloudResponse.secure_url;

        await user.save();

        return res.status(200).json({
            message: 'Profile updated.',
            success: true,
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};


// get suggested other users

const getSuggestedUsers = async (req, res) => {

    try {
        const suggestedUsers = await UserModel.find({ _id: { $ne: req.id } }).select("-password")
        if (!suggestedUsers) {
            return res.status(400).json({
                message: "curretly do not have any user",
            })
        }
        return res.status(200).json({
            message: "suggested user",
            success: true,
            user: suggestedUsers
        })

    } catch (err) {
        console.log(err)
    }

}
// follw and unfollow
const followOrUnfollow = async (req, res) => {
    const followUserId = req.id;
    const targetUserId = req.params.id;
    try {
        if (followUserId === targetUserId) {
            return res.status(400).json({
                message: 'You cannot follow/unfollow yourself',
                success: false
            });
        }

        const user = await UserModel.findById(followUserId);
        const targetUser = await UserModel.findById(targetUserId);

        if (!user || !targetUser) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }

        const isFollowing = user.following.includes(targetUserId);
        if (isFollowing) {
            // Unfollow logic 
            await Promise.all([
                UserModel.updateOne({ _id: followUserId }, { $pull: { following: targetUserId } }),
                UserModel.updateOne({ _id: targetUserId }, { $pull: { followers: followUserId } }),
            ]);
            return res.status(200).json({ message: 'Unfollowed successfully', success: true });
        } else {
            // Follow logic 
            await Promise.all([
                UserModel.updateOne({ _id: followUserId }, { $push: { following: targetUserId } }),
                UserModel.updateOne({ _id: targetUserId }, { $push: { followers: followUserId } }),
            ]);
            return res.status(200).json({ message: 'Followed successfully', success: true });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};













module.exports = {
    register,
    login, logout, getProfile, editProfile, getSuggestedUsers, followOrUnfollow
}