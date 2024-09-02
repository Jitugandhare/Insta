const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const UserModel = require("../model/user.model")
const getDataUri = require("../utils/datauri");
const cloudinary = require("../utils/cloudinary")

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

        user = {
            _id: user.id,
            username: user.username,
            email: user.email,
            profilepicture: user.profilepicture,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
            posts: user.posts
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
        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }
        if (bio) bio = user.bio;
        if (gender) gender = user.gender;
        if (profilePicture) profilePicture = cloudResponse.secure_url;

        await user.save();
        return res.status(200).json({
            message: "Profile updated",
            success: true,
            user
        })




    } catch (err) {
        console.log(err)
    }
}


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
            message: "",
            success: true,
            user: suggestedUsers
        })

    } catch (err) {
        console.log(err)
    }

}

const followOrUnfollow = async (req, res) => {
    try {
        const followkrnewala = req.id;
        const jiskofollowkrnahain = req.params.id;

        if (followkrnewala === jiskofollowkrnahain) {
            return res.status(400).json({
                message: "You can't follow yourself",
                success: false
            });
        }

        const user = await UserModel.findById(followkrnewala);
        const targetUser = await UserModel.findById(jiskofollowkrnahain);

        if (!user || !targetUser) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        const isFollowing = user.following.includes(jiskofollowkrnahain);

        if (isFollowing) {
            // Unfollow
            await Promise.all([
                UserModel.updateOne({ _id: followkrnewala }, { $pull: { following: jiskofollowkrnahain } }),
                UserModel.updateOne({ _id: jiskofollowkrnahain }, { $pull: { followers: followkrnewala } })
            ]);

            return res.status(200).json({
                message: "Successfully unfollowed the user",
                success: true
            });

        } else {
            // Follow
            await Promise.all([
                UserModel.updateOne({ _id: followkrnewala }, { $push: { following: jiskofollowkrnahain } }),
                UserModel.updateOne({ _id: jiskofollowkrnahain }, { $push: { followers: followkrnewala } })
            ]);

            return res.status(200).json({
                message: "Successfully followed the user",
                success: true
            });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "An error occurred while processing your request",
            success: false
        });
    }
}












module.exports = {
    register,
    login, logout, getProfile, editProfile, getSuggestedUsers,followOrUnfollow
}