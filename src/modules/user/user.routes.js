const validate = require("../core/middlewares/validate.middleware");
const { registerSchema, loginSchema } = require("./user.schema");
const { getUsers, createUser, updateUser, deleteUser } = require("./user.controller");

module.exports = (app) => {
    app.post("/api/users/login", validate(loginSchema), )

    app.route("/api/users")
        .get(getUsers)
        .post(validate(registerSchema), createUser);

    app.route("/api/users/:id")
        .patch(updateUser)
        .delete(deleteUser);
};
