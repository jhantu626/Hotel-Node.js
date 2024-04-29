const express=require('express')
const app=express();

const db=require('./db')
const Person = require('./Models/Person');


const bodyParser=require('body-parser')
app.use(bodyParser.json());

/*
    *Implementing Authentication using passport and passport-local
*/
const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy;

passport.use(new LocalStrategy(
    async (username,password,done)=>{
        console.log(`Credentials ${username} ${password}`)
        try{
            const user=await Person.findOne({"email": username});
            if(!user){
                return done(null,false,{messege: "User Not Found"});
            }
            const isPasswordMatched=(password===user.password?true:false)
            if(isPasswordMatched){
                return done(null,user)
            }else{
                return done(null,false,{messege: "Unauthorized"})
            }
        }catch(err){
            console.log(err)
            return done(err);
        }
    }
));

app.use(passport.initialize());
const authMiddleWare=passport.authenticate('local',{session: false});
//To Authenticat All Url's so we will use
// app.use(authMiddleWare)

//Authenticate A Endpoint
app.get('/',authMiddleWare,(req,resp)=>{
    resp.send("Welcome to our App");
})




//Defining Middle Ware Function
const logRequest=(req,resp,next)=>{
    console.log(`[${new Date().toString()}] Request Made to: ${req.originalUrl}`);
    next();
}
app.use(logRequest);//to implement log in every routers we use like this 





//REQUIRE .env FILE
require('dotenv').config();



//Person Routes
const personRoutes=require('./Routes/PersonRoutes')
app.use('/person',personRoutes)


//Menu Routes
const menuRoutes=require('./Routes/MenuRoutes');
app.use('/menu',menuRoutes)




const PORT=process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Application Running on port: ${PORT}`);
})