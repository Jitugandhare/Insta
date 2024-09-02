const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const getDataUri=require("../utils/datauri");

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(401).json({
                message: "Something is missing,Try again",
                succss: false,
            });
        }

        const user = await UserActivation.findOne({ email })
        if (user) {
            return res.status(401).json({
                message: "Email is already exist",
                succss: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        await UserActivation.create({
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

        user={
            _id:user._id,
            username:user.username,
            email:user.email,
            profilepicture:user.profilepicture,
            bio:userbio,
            followers:user.followers,
            following:user.following,
            posts:user.posts
        }


        const token=await jwt.sign({userId:user_id},process.env.SECRET_KEY,{expiresIn:"1d"})
        return res.cookies("token",token,{httpOnly:true,sameSite:'strict',maxAge:1*24*60*60*1000}).json({
            message:`Welcome back ${user.username}`,
            success:true,
            user
        })
    } catch (err) {
        console.log(err)
    }
}




// logout controller
const logout=async(req,res)=>{

    try{

        return res.cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully.",
            success:true,
        })
    }catch(err){
        console.log(err)
    }
}

// get profile

const getProfile=async(req,res)=>{

    try{
        const userId=req.params.id;
        let user =await user.findById(userId);
        return res.status(200).json({
            user,
            success:true,
        })

    }catch(err){
        console.log(err);
    }
}

// Edit profile

const editProfile=async(req,res)=>{
    try{
        const userId=req.id;
        const {bio,gender}=req.body;
        const profiePicture=req.file;
        let cloudResponse;

        if(profiePicture){
            const fileUri=getDataUri(profiePicture);
        

        }

        


    }catch(err){
        console.log(err)
    }
}




module.exports={register,
    login,logout,getProfile,editProfile
}