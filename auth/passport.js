const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const findOrCreateUser = async (profile) => {
  let user = await User.findOne({ googleId: profile.id });
  if (!user) {
    user = new User({
      email: profile.emails[0].value,
      name: profile.displayName,
      googleId: profile.id,
    });
    await user.save();
  }
  return user;
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await findOrCreateUser(profile);
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '2h',
      });
      user._jwtToken = token;
      return done(null, user);
    }
  )
);
