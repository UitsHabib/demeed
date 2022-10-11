const passport = require("passport");

const PermissionStrategy = (req, res, next) => {
  const auth = passport.authenticate("permission-jwt", (error, permission) => {
    if (error) {
      return res.status(500).send("Internal sever error.");
    }

    if (!permission) {
      return res.status(404).send("unautenticate permission");
    }

    req.login(permission, { session: false }, (err) => {
      if (err) {
        return next(err);
      }

      next(err);
    });
  });

  auth(req, res, next);
};

module.exports = PermissionStrategy;