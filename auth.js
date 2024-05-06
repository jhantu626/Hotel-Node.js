const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt=require('bcrypt')
const Person = require('./Models/Person')

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await Person.findOne({ email: username });
            if (!user) {
                return done(null, false, { message: "User Not Found!" });
            }
            const isPaswordMatch=await user.comparePassword(password);
            if (isPaswordMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Unauthorized User" })
            }
        }catch(err){
            console.log(err);
            return done(err);
        }     
    }
))

module.exports=passport



