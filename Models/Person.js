const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const personSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work:{
        type: String,
        enum: ['chef','waiter','manager'],
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    }
})

personSchema.pre('save',async function(next){
    const person=this;
    if(!person.isModified('password')) return next();// is new User or Not
    try{
        const salt=await bcrypt.genSalt(10);
        const hashPass=await bcrypt.hash(person.password,salt);
        person.password=hashPass;
        next();
    }catch(err){
        next(err);
    }
})

personSchema.methods.comparePassword=async function(candidatePassword){
    try{
        const isMatch= await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}


const Person=mongoose.model('person',personSchema);

module.exports=Person