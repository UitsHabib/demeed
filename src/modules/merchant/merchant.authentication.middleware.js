const passport = require("passport");

const MerchantStrategy = (req, res, next) => {
  const auth = passport.authenticate(
    "merchant-jwt",
    async (error, merchant) => {
      if (error) {
        return res.status(500).send({ error: "Internal Server error." });
      }
      if (!merchant) {
        return res.status(401).send({ message: "Unauthenticated Admin !" });
      }
      req.login(merchant, { session: false }, (err) => {
        if (err) {
          return next(err);
        }
        next();
      });
    }
  );
  auth(req, res, next);
};

module.exports = MerchantStrategy;
