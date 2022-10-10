const { get } = require("lodash");
const path = require("path");
const UserStrategy = require(path.join(process.cwd(), "src/modules/platform/user/user.authentication.middleware"));
const { registerSchema, loginSchema, userUpdateSchema, changePasswordSchema, forgotPasswordSchema, resetPasswordSchema, updateUserProfileSchema } = require(path.join(process.cwd(), "src/modules/platform/user/user.schema"));
const { login, logout, signUp, getUsers, getUserProfile, updateUserProfile, updateUser, deleteUser, changePassword, forgotPassword, resetPassword } = require(path.join(process.cwd(), "src/modules/platform/user/user.controller"));
const validate = require(path.join(process.cwd(), "src/modules/core/middlewares/validate.middleware"));
const { Services } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.constants"));
const { ServiceGuard } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.middlewares"));

module.exports = (app) => {
    app.post("/api/login", validate(loginSchema), login);
    app.post("/api/logout", UserStrategy, logout);
    app.route("/api/users")
        .get(UserStrategy, ServiceGuard([Services.MANAGE_USER]), getUsers)
        .post(UserStrategy, validate(registerSchema), signUp);
    app.route("/api/users/profile")
        .get(UserStrategy, getUserProfile)
        .patch(UserStrategy, validate(updateUserProfileSchema), updateUserProfile)
    app.route("/api/users/:id")
        .patch(UserStrategy, validate(userUpdateSchema), updateUser)
        .delete(UserStrategy, deleteUser);
    app.post("/api/users/change-password", UserStrategy, validate(changePasswordSchema), changePassword);
    app.post("/api/users/forgot-password", validate(forgotPasswordSchema), forgotPassword);
    app.post("/api/users/:id/reset-password", validate(resetPasswordSchema), resetPassword);
};