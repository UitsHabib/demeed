const path = require("path");
const { signUp, login, getUsers, updateUser, deleteUser } = require("./user.controller");
const { registerSchema, loginSchema, updateSchema } = require("./user.schema");
const validate = require(path.join(process.cwd(), "/src/modules/core/middlewares/validate.middleware"));
const UserStrategy = require(path.join(process.cwd(), "/src/modules/user/user.authentication.middleware"));
const { Services } = require(path.join(process.cwd(), "/src/modules/core/authorization/authorization.constants"));
const { ServiceGuard } = require(path.join(process.cwd(), "/src/modules/core/authorization/authorization.middlewares"));

module.exports = (app) => {
    app.post("/api/users/singup", validate(registerSchema), signUp);
    app.post("/api/users/login", validate(loginSchema), login);
    app.get("/api/users", UserStrategy, ServiceGuard([Services.MANAGE_USER]), getUsers);
    app.route("/api/users/:id")
        .patch(UserStrategy, validate(updateSchema), updateUser)
        .delete(UserStrategy, deleteUser);
};
