const validate = require("../core/middleware/validator.middleware");
const { userSchema, userUpdateSchema } = require("./user.schema");
const { getUsers, createUser, updateUser, deleteUser } = require("./user.controller");

module.exports = (app) => {
    app.route("/api/users")
        .get(getUsers)
        .post(validate(userSchema), createUser);

    app.route("/api/users/:id")
        .patch(validate(userUpdateSchema), updateUser)
        .delete(deleteUser);
};
