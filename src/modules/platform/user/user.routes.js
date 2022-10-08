const path = require("path");
const UserStrategy = require(path.join(process.cwd(), "src/modules/platform/user/user.authentication.middleware"));
const { registerSchema, loginSchema, userUpdateSchema } = require(path.join(process.cwd(), "src/modules/platform/user/user.schema"));
const { login, logout, signUp, getUsers, updateUser, deleteUser } = require(path.join(process.cwd(), "src/modules/platform/user/user.controller"));
const validate = require(path.join(process.cwd(), "src/modules/core/middlewares/validate.middleware"));
const { Services } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.constants"));
const { ServiceGuard } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.middlewares"));

module.exports = (app) => {
    app.post("/api/login", validate(loginSchema), login);
    app.post("/api/logout", UserStrategy, logout);
    app.get("/api/users", UserStrategy, ServiceGuard([Services.MANAGE_USER]), getUsers);
    app.post("/api/users", validate(registerSchema), signUp);
    app.route("/api/users/:id")
        .patch(UserStrategy, validate(userUpdateSchema), updateUser)
        .delete(UserStrategy, deleteUser);
};
