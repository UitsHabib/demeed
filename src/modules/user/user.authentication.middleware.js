const passport = require("passport");
<<<<<<< HEAD

const UserStrategy = (req, res, next) => {
  const auth = passport.authenticate("user-jwt", async (error, user) => {
    if (error) {
      return res.status(500).send("Internal server error.");
    }

    if (!user) {
      return res.status(401).send("Unautheticated user.");
=======
<<<<<<<< HEAD:src/modules/user/user.authentication.middleware.js
const UserStrategy = (req, res, next) => {
  const auth = passport.authenticate("user-jwt", async (error, user) => {
========

const AdminStrategy = (req, res, next) => {
  const auth = passport.authenticate("admin-jwt", async (error, admin) => {
>>>>>>>> Add Service Guard Feature:src/modules/admin/admin.authentication.middleware.js
    if (error) {
      return res.status(500).send("Internal server error.");
    }
<<<<<<<< HEAD:src/modules/user/user.authentication.middleware.js
    if (!user) {
      return res.status(401).send({ message: "Unauthenticated user" });
========

    if (!admin) {
      return res.status(401).send("Unautheticated admin.");
>>>>>>>> Add Service Guard Feature:src/modules/admin/admin.authentication.middleware.js
>>>>>>> Add Service Guard Feature
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
<<<<<<< HEAD

=======
>>>>>>> Add Service Guard Feature
        next();
      }
    );
  });

  auth(req, res, next);
};

module.exports = UserStrategy;
