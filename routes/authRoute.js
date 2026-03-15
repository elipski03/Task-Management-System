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

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'register.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'login.html'));
});

module.exports = router;
