const passport = require("passport");
const { Strategy } = require("passport-jwt");
const Admin = require("./admin.model");

module.exports = () => {
  function cookieExtractor(req) {
    let token = null;
    if (req && req.signedCookies) {
      token = req.signedCookies["access_token"];
    }
    return token;
  }

  passport.use(
    "admin-jwt",
    new Strategy(
      { secretOrKey: "jwt-secret", jwtFromRequest: cookieExtractor },
      function (payload, done) {
        Admin.findOne({
          where: { id: payload.id },
        }).then((admin) => {
          if (admin) {
            return done(null, admin);
          }
          return done(null, false);
        });
      }
    )
  );
};
