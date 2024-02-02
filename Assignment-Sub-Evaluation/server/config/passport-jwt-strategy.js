// import passport module to create jwt strategy
const passport = require('passport');

// create passport-jwt strategy
const JWTStrategy = require('passport-jwt').Strategy;

// create jwt token extractor
const ExtractJWT = require('passport-jwt').ExtractJwt;

// import user model
const User = require('../models/user');

// setting passport jwt strategy options like extracting from auth bearer token and secret key.
let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'onlineclassroom',
};

// authenticating using passport-jwt by taking token from auth header
// and then looking for user in db if found authorize that request else reject
passport.use(
  new JWTStrategy(opts, function (jwtPayload, done) {
    User.findById(jwtPayload._id, function (err, user) {
      if (err) {
        console.log('Error in finding user from JWT');
        return;
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

// export the passport
module.exports = passport;
