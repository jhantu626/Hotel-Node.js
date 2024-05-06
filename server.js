const express=require('express')
const app=express();

const db=require('./db')
const Person = require('./Models/Person');


const bodyParser=require('body-parser')
app.use(bodyParser.json());

const passport=require('./auth')



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
app.use('/menu',authMiddleWare,menuRoutes)




const PORT=process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Application Running on port: ${PORT}`);
})