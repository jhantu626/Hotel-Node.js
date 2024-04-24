const express=require('express')
const app=express();

const db=require('./db')

const bodyParser=require('body-parser')
app.use(bodyParser.json())

//REQUIRE .env FILE
require('dotenv').config();

//Person Routes
const personRoutes=require('./Routes/PersonRoutes')
app.use('/person',personRoutes)


//Menu Routes
const menuRoutes=require('./Routes/MenuRoutes')
app.use('/menu',menuRoutes)




const PORT=process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Application Running on port: ${PORT}`);
})
