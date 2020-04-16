const express = require('express');
const router = express.Router();
const passport= require('passport');



  router.post('/login', passport.authenticate('local-login'), (req, res) => {
    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
      req.session.cookie.expires = false;
    }

    res.send(req.session.passport.user);
  });

  router.post('/signup', passport.authenticate('local-signup'), signup);

  router.post('/logout', (req, res) => {
    req.logout();
    res.end();
  });


function signup(req, res) {
  res.end();
}

module.exports= router;
