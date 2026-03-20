const express = require('express');
const path = require('path');
const passport = require('passport');

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
  }),
  (req, res) => {
    const user = req.user;
    console.log(`User ${user._id} logged in successfully`);
    res.status(200).json({ token: user._jwtToken, userId: user._id });
  }
);


module.exports = router;
