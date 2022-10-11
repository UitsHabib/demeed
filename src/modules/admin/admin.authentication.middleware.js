const passport = require("passport");

const AdminStrategy = (req, res, next) => {
  const auth = passport.authenticate("admin-jwt", (error, admin) => {
    if (error) {
      return res.status(500).send("Internal sever error.");
    }

    if (!admin) {
      return res.status(404).send("Unauthenticate admin");
    }

    req.login(admin, { session: false }, (err) => {
      if (err) {
        return next(err);
      }

      next();
    });
  });

  auth(req, res, next);
};

module.exports = AdminStrategy;
