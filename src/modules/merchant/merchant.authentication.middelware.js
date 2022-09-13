const passport = require("passport")

const MerchantStrategy = (req, res, next) => {
    const auth = passport.authenticate("passport", async (error, merchant) => {
        if(error) {
            return res.status(500).send("Internal server Error.");
        }

        if(!merchant) {
            res.status(401).send("Unauthenticated merchant.")
        }

        req.login(merchant, { session: false }, (err) => {
            if(err) {
                return next(err);
            }

            next();
        })
    });

    auth(req, res, next);
};

module.exports = MerchantStrategy;