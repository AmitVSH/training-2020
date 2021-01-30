const passport= require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


passport.use(new GoogleStrategy({
    clientID: "1087387538689-k6cbrgk0n26gaf1npj394s8ifhujjp28.apps.googleusercontent.com",
    clientSecret: "sYDQ1D1CSJr0p7BoaiqPLKc7",
    callbackURL: "http://localhost:3000/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    console.log("profile:", profile._json);
    
    let user = null;
    await User.findOne({ googleId: profile._json.sub} ).lean().exec(await function(err, data) {
        if (!err) {
        user = data
        console.log("30: data", data);
        } else {
          // error handling
          console.log('Error retriving users');
        };
      });

    if(user == null)
        user = new User();
    user.name = profile._json.name;
    user.email = profile._json.email;
    user.avatar = profile._json.avatar;
    user.googleId = profile._json.sub;
    user.save( (err, user) => {
        if(!err) return done(err, user);
        else
            console.log("Error saving user.");
    });

    // User.findOrCreate({ googleId: profile.id, ...profile }, function (err, user) {
    //   return done(err, user);
    // });
  }
)); 