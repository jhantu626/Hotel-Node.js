const jwt=require('jsonwebtoken')
require('dotenv').config();

const jwtAuthMiddleWare=(req,resp,next)=>{
    if(!req.headers.authorization){
        return resp.json({msg: "Enter auth Token"}).status(401);
    }
    const token=req.headers.authorization.substring(7);
    if(!token){
        return resp.json({msg: "Unauthorized"}).status(401);
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(err){
        resp.json({msg: "Invalid Token"}).status(401);
    }
}


const generateToken=(payload)=>{
    return jwt.sign(payload,process.env.JWT_SECRET);
}



module.exports={jwtAuthMiddleWare,generateToken}