const express=require('express')
const router=express.Router();

const Menu=require('./../Models/MenuItem')


//Create Menu
router.post('/',async(req,resp)=>{
    try{
        const data=req.body
        const newMenu=new Menu(data)
        const savedMenu=await newMenu.save();
        console.log(savedMenu);
        resp.json(savedMenu).status(200);
    }catch(ex){
        console.log(ex);
        resp.json({err: "Internal Server Error"}).status(500);
    }
})

//get All Menus
router.get('/',async (req,resp)=>{
    try{
        const data=await Menu.find();
        resp.json(data).status(200)
    }catch(err){
        resp.json({err: "Internal Server Error!"});
    }
})
//find By Name
router.get('/name/:name',async (req,resp)=>{
    try{
        const name=req.params.name
        const data=await Menu.find({name: name});
        if(!data){
            return resp.json({err: "Not Found"}).status(404);
        }
        resp.json(data).status(200);
    }catch(err){
        resp.json({err: "Internal Server Error!"}).status(500);
    }
})

//get by Taste
router.get('/taste/:taste',async (req,resp)=>{
    try{
        const taste=req.params.taste
        const data=await Menu.find({taste:taste});
        resp.json(data).status(200);   
    }catch(err){
        console.log(err)
        resp.json({err: "Internal Server Error!"}).status(200);
    }
})


router.put('/:id',async (req,resp)=>{
    const id=req.params.id;
    try{
        const data=req.body
        const updatedData=await Menu.findByIdAndUpdate(id,data,{
            new: true
        })
        resp.json(updatedData).status(200);
    }catch(ex){
        console.log(ex);
        resp.json({err: "Internal Server Error!"}).status(500);
    }
});

router.delete('/:id',async(req,resp)=>{
    const id=req.params.id;
    try{
        const deletedData=await Menu.findByIdAndDelete(id);
        if(!deletedData){
            return resp.json({msg: "Menu Not Found"}).status(404);
        }
        resp.json({message: "Menu has been deleted",deletedData})
    }catch(ex){
        console.log(ex);
        resp.json({err: ex.message}).status(200);
    }
})



module.exports=router