const passport = require("passport");
const { Strategy } = require("passport-jwt");
const Merchant = require("./merchant.model");

module.exports = () => {
    const cookieExtactor = (req) => {
        let token = null;

        if(req && req.signedCookies) {
            token = req.signedCookies["access_token"];
        }

        return token;
    }


    passport.use("passport", new Strategy(
        { secretOrKey: "zoha", jwtFromRequest: cookieExtactor },
        (payload, done) => {
            Merchant.findOne({ where: { id: payload.id }})
                .then((merchant) => {
                    if(merchant) {
                        return done(null, merchant);
                    }

                    return done(null, false);
                })
        }
    ))
}