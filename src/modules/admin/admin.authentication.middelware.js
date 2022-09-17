const passport = require("passport")

const AdminStrategy = (req, res, next) => {
    const auth = passport.authenticate("passport", async (error, admin) => {
        if(error) {
            return res.status(500).send("Internal server Error.");
        }

        if(!admin) {
            return res.status(401).send("Unauthenticated user.")
        }

        req.login(admin, { session: false }, (err) => {
            if(err) {
                return next(err);
            }

            next();
        })
    });

    auth(req, res, next);
};

module.exports = AdminStrategy;