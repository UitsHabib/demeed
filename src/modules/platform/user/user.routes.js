const path = require("path");
const Controllers = require("./controllers");
const validate = require(path.join(process.cwd(), "src/modules/core/middlewares/validate.middleware"));
const { Services } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.constants"));
const UserStrategy = require(path.join(process.cwd(), "src/modules/platform/user/user.authentication.middleware"));
const { ServiceGuard } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.middlewares"));
const { registerSchema, loginSchema, userUpdateSchema, changePasswordSchema, forgotPasswordSchema, resetPasswordSchema, updateUserProfileSchema } = require(path.join(process.cwd(), "src/modules/platform/user/user.schema"));

module.exports = (app) => {
    app.post("/api/login", validate(loginSchema), Controllers.login);
    app.post("/api/logout", UserStrategy, Controllers.logout);
    app.route("/api/users")
        .get(UserStrategy, ServiceGuard([Services.MANAGE_USER]), Controllers.getUsers)
        .post(UserStrategy, ServiceGuard([Services.MANAGE_USER]), validate(registerSchema), Controllers.createUser);
    app.route("/api/users/profile")
        .get(UserStrategy, Controllers.getUserProfile)
        .patch(UserStrategy, validate(updateUserProfileSchema), Controllers.updateUserProfile)
    app.route("/api/users/:id")
        .patch(UserStrategy, validate(userUpdateSchema), Controllers.updateUser)
        .delete(UserStrategy, Controllers.deleteUser);
    app.post("/api/users/change-password", UserStrategy, validate(changePasswordSchema), Controllers.changePassword);
    app.post("/api/users/forgot-password", validate(forgotPasswordSchema), Controllers.forgotPassword);
    app.post("/api/users/:id/reset-password", validate(resetPasswordSchema), Controllers.resetPassword);
};