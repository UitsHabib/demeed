const passport = require("passport");
const { Strategy } = require("passport-jwt");
const Merchant = require("./merchant.model");

module.exports = () => {
  // Extract token and return
  const cookieExtractor = (req) => {
    let token = null;
    if (req && req.signedCookies) {
      token = req.signedCookies["access_token"];
    }
    return token;
  };

  passport.use(
    "merchant-jwt",
    new Strategy(
      {
        secretOrKey: "merchant-secret",
        jwtFromRequest: cookieExtractor,
      },
      async (payload, done) => {
        const merchant = await Merchant.findOne({ where: { id: payload.id } });
        if (merchant) {
          return done(null, merchant);
        }
        return done(null, false);
      }
    )
  );
};
