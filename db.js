const mongoose=require('mongoose')
require('dotenv').config();
const MONGO_URL=process.env.MONGO_URI
mongoose.connect(MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db=mongoose.connection

db.on('connected',()=>{
    console.log("Mongo Connection Established.")
})

db.on('disconnected',()=>{
    console.log("Mongo Connection Disconnected");
})

db.on('error',(err)=>{
    console.log(err)
})

module.exports=db;