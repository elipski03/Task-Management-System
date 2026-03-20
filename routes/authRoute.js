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
    res.redirect(
      `http://localhost:${process.env.PORT_F}/auth/success?token=${user._jwtToken}`
    );
  }
);

module.exports = router;
