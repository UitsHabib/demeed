const path = require("path");
const controllers = require("./controllers");
const validate = require(path.join(process.cwd(), "src/modules/core/middlewares/validate.middleware"));
const UserStrategy = require(path.join(process.cwd(), "src/modules/platform/user/user.authentication.middleware"));
const { Services } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.constants"));
const { ServiceGuard } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.middlewares"));
const { loginSchema, registerSchema, updateUserProfileSchema, userUpdateSchema } = require(path.join(process.cwd(), "/src/modules/platform/user/user.schema"));

module.exports = (app) => {
    app.post("/api/login", UserStrategy, validate(loginSchema), controllers.login);
    app.post("/api/logout", UserStrategy, controllers.logout);
    app.route("/api/users")
        .get(UserStrategy, ServiceGuard([Services.MANAGE_USER], controllers.getUsers))
        .post(UserStrategy, ServiceGuard([Services.MANAGE_USER]), validate(registerSchema), controllers.createUser);
    app.route("/api/users/profile")
	    .get(UserStrategy, controllers.getUserProfile)
		.put(UserStrategy, validate(updateUserProfileSchema), controllers.updateUserProfile);
    app.route("/api/users/:id")
	    .put(UserStrategy, validate(userUpdateSchema), controllers.updateUser)
		.delete(UserStrategy, controllers.deleteUser);
    app.post("/api/users/change-password", UserStrategy, validate(changePasswordSchema), Controllers.changePassword);
    app.post("/api/users/forgot-password", validate(forgotPasswordSchema), Controllers.forgotPassword);
    app.post("/api/users/:id/reset-password", validate(resetPasswordSchema), Controllers.resetPassword);
};


