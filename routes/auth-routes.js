module.exports = function (app, passport) {
  app.post('/login', passport.authenticate('local-login'), (req, res) => {
    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
      req.session.cookie.expires = false;
    }

    res.send(req.session.passport.user);
  });

  app.post('/signup', passport.authenticate('local-signup'), signup);

  app.post('/logout', (req, res) => {
    req.logout();
    res.end();
  });
};

function signup(req, res) {
  res.end();
}
