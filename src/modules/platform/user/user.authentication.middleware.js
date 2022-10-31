const passport = require("passport");

const UserStrategy = (req, res, next) => {
  const auth = passport.authenticate("user-jwt", async (error, user) => {
    if (error) {
      return res.status(500).send("Internal server error.");
    }

    if (!user) {
      return res.status(401).send("Unautheticated user.");
    }

    req.login(
      user,
      {
        session: false,
      },
      (err) => {
        if (err) {
          return next(err);
        }

        next();
      }
    );
  });

  auth(req, res, next);
};

module.exports = UserStrategy;
