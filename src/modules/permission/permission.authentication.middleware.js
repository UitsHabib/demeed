const passport = require("passport");

const PermissionStrategy = (req, res, next) => {
  const auth = passport.authenticate("admin-jwt", async (error, admin) => {
    if (error) {
      return res.status(500).send("Internal Server Error");
    }
    if (!admin) {
      return res.status(401).send({ message: "Unauthenticated admin." });
    }
    req.login(
      admin,
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

module.exports = PermissionStrategy;
