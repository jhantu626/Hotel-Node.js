const express=require('express')
const router=express.Router();
const jwt=require('jsonwebtoken');
require('dotenv').config();
const Person=require('./../Models/Person')
const {jwtAuthMiddleWare,generateToken}=require('./../jwt')



//Post Person
router.post('/signup',async (req,resp)=>{
    try{
        const data=req.body
        const newPerson=new Person(data);
        const savedPerson=await newPerson.save();
        
        const payload={
            user: {
                id: savedPerson.id,
                email: savedPerson.email
            }
        }
        console.log(payload.user.email);
        const token=generateToken(payload);

        resp.json(token).status(200);
    }catch(ex){
        console.log(ex);
        resp.send("Internal Server Error!").status(500);
    }
})

router.post('/login',async(req,resp)=>{
    try{
        const {email,password}=req.body
        const user=await Person.findOne({email: email});
        const isValidPassword=await user.comparePassword(password);
        if(!user || !isValidPassword){
            return resp.json("Invalid Credential!").status(401);
        }
        const payload={
            user:{
                id: user.id,
                email: user.email
            }
        }
        const token=generateToken(payload);
        resp.json(token).status(200);
    }catch(err){
        console.log(err);
        resp.json({msg: "Internal Server Error!"}).status(500);
    }
})

router.get('/profile',jwtAuthMiddleWare,async(req,resp)=>{
    try{
        const authBody=req.user;
        const user=await Person.findById(authBody.user.id).select('-password');
        if(!user){
            return resp.json({err: "Invalid Token"}).status(401);
        }
        resp.json(user).status(200);
    }catch(err){
        console.log(err);
        resp.json({err: "Internal Server Error"}).status(500);
    }
})

//Get All Person
router.get('/',jwtAuthMiddleWare,async (req,resp)=>{
    try{
        const data=await Person.find().select('-password');
        resp.json(data).status(200);
    }catch(ex){
        resp.json({err: "Internal Server Error"}).status(500);
    }
})


//get User By Id
router.get('/:id',async (req,resp)=>{
    try{
        const id=req.params.id
        const data=await Person.findById(id).select('-password');
        console.log(data)
        if(!data){
            return resp.json({err: "Not Found By Id: "+id}).status(404);
        }
        resp.json(data).status(200);
    }catch(err){
        console.log(err)
        resp.json({err:"Internal Server Error"}).status(500);
    }
})

//Find By Email
router.get('/email/:email',async (req,resp)=>{
    try{
        const email=req.params.email
        const data=await Person.findOne({email: email}).select('-password');
        if(!data){
            return resp.status(404).json({ message: 'User not found' });
        }
        resp.json(data).status(200);
    }catch(err){
        resp.json({err: "Internal Server Error"}).status(500);
    }
})

router.get('/mobile/:mobile',async (req,resp)=>{
    try{
        const mobile=req.params.mobile
        const data=await Person.find({mobile: mobile}).select('-password');
        resp.json(data).status(200)
    }catch(Ex){
        resp.json({err: "Internal Server Error!"}).status(500);
    }
})

router.get('/work/:work',async (req,resp)=>{
    try{
        const work=req.params.work
        const data=await Person.find({work: work}).select('-password');
        resp.json(data).status(200)
    }catch(Ex){
        resp.json({err: "Internal Server Error!"}).status(500);
    }
})

router.put('/:id',async (req,resp)=>{
    const id=req .params.id;
    try{
        const data=req.body;
        const updatedData=await Person.findByIdAndUpdate(id,data,{
            new: true
        })
        if(!updatedData){
            return resp.json({err: "Not Found"}).status(404);
        }
        resp.json(updatedData).status(200);
    }catch(ex){
        console.log(ex);
        resp.json({err: "Internal Server Error!"}).status(200);
    }
})

router.put('/email/:email',async (req,resp)=>{
    const email=req.params.email
    try{
        const data=req.body
        const updatedData=await Person.findOneAndUpdate({email: email},data,{
            new: true
        })
        if(!updatedData){
            return resp.json({err: "Not Found"}).status(404)
        }
        resp.json(updatedData).status(200)
    }catch(ex){
        console.log(ex);
        resp.status(500).json({err: "Internal Server Error!"})
    }
})

module.exports=router