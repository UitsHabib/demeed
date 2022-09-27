const validate = require("../core/middlewares/validate.middleware");
const { signUp,login, getSignedInUserProfile, logout } = require("./admin.controller");
const { signUpSchema, loginSchema } = require("./admin.schema");
const AdminStrategy = require("./admin.authentication.middelware");

module.exports = (app) => {
    app.post("/api/admins/signup", validate(signUpSchema), signUp);
    app.post("/api/admins/login", validate(loginSchema), login);
    app.get("/api/admins/profile", AdminStrategy, getSignedInUserProfile);
    app.get("/api/admins/logout", logout);
};
