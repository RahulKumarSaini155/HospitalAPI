const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const Doctor = require('../models/doctor');
const env = require('./environment');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.secretOrKey
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){

    Doctor.findById(jwtPayLoad._id, function(err, user){
        if(err){
            console.log('Error in finding doctor form JWT');
            return;
        }

        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    });

}));

module.exports = passport;