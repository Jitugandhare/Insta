const jwt=require("jsonwebtoken");

const isAuthenticated=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"User is not auhenticated",
                success:false
            })
        }

        const decode=await jwt.verify(token,process.env.SECRET_KEY);
        if(!token){
            return res.status(401).json({
                message:"Invalid",
                success:false
            })
        }

        req.id=decode.userId;
        next();

    }catch(err){
        console.log(err)
    }
}


module.exports=isAuthenticated;