const passport = require("passport");

const UserStrategy = (req, res, next) => {
  const auth = passport.authenticate("user-jwt", (error, user) => {
    if (error) {
      return res.status(500).send("Internal server error.");
    }

    if (!user) {
      return res.status(404).send("Unauthenticate User.");
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        return next(err);
      }

      next(err);
    });
  });

  auth(req, res, next);
};

module.exports = UserStrategy;
