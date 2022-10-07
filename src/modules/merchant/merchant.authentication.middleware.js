const passport = require("passport");

const MerchantStrategy = (req, res, next) => {
  const auth = passport.authenticate("merchant-jwt", async (error, user) => {
    if (error) {
      return res.status(500).send("Internal server error.");
    }

    if (!user) {
      return res.status(401).send("Unautheticated Merchant.");
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

module.exports = MerchantStrategy;
