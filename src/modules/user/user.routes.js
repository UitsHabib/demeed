const path = require("path");
const UserStrategy = require("./user.authentication.middleware");
const { registerSchema, loginSchema, userUpdateSchema } = require("./user.schema");
const { login, logout, signUp, getUsers, updateUser, deleteUser } = require("./user.controller");
const validate = require(path.join(process.cwd(), "src/modules/core/middlewares/validate.middleware"));
const { Services } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.constants"));
const { ServiceGuard } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.middlewares"));

module.exports = (app) => {
    app.post("/api/users/login", validate(loginSchema), login);
    app.post("/api/users/signup", validate(registerSchema), signUp);
    app.post("/api/users/logout", UserStrategy, logout);
    app.get("/api/users", UserStrategy, ServiceGuard([Services.MANAGE_USER]), getUsers);
    app.route("/api/users/:id")
        .patch(UserStrategy, validate(userUpdateSchema), updateUser)
        .delete(UserStrategy, deleteUser);
};
