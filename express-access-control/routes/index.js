var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

const JWT = require('jsonwebtoken')

const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "some secret",
      passReqToCallback: true
    },
    async (req, payload, done) => {
      try {
        // Find the user specified in token
        const user = await User.findOne({ _id: payload.sub })
        // If user doesn't exists, handle it
        if (!user) {
          return done(null, false)
        }

        // Otherwise, return the user
        req.user = user
        done(null, user)
      } catch (error) {
        done(error, false)
      }
    }
  )
)

const passportJWT = passport.authenticate('jwt', { session: false })

const signToken = (user) => {
  return JWT.sign(
    {
      iss: 'demo',
      sub: user._id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    },
    "some secret"
  )
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello' });
  // res.json({client_secret: 'Hello1'});
});


router.get('/login', function(req, res, next) {
  res.render('auth/login', { title: 'Login' });
});

router.post('/login', async function(req, res){
  //see if user exist in database
  console.log("Req", req.body);
  
	const existingUser = await User.findOne({...req.body});
	console.log("data",existingUser)
	if(existingUser){
    console.log('User authenticated!');
    const token = signToken(existingUser);

    res.setHeader('token', token);
		res.send({token: token}).cookie('token', token);
		// res.send("login");
	}else{
		console.log('Invalid credentials!');
		res.send({message:"Invalid credentials!"})
	}
});


router.get('/private',passportJWT, function(req, res){
  res.send(req.user)
});

module.exports = router;
