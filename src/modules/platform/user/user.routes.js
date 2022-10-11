const path = require("path");
const multer = require(path.join(process.cwd(), "src/config/lib/multer.js"));
const UserStrategy = require(path.join(process.cwd(), "src/modules/platform/user/user.authentication.middleware"));
const CustomerStrategy = require(path.join(process.cwd(), "src/modules/platform/user/customer.authentication.middleware"));
const { registerSchema, loginSchema, userUpdateSchema } = require(path.join(process.cwd(), "src/modules/platform/user/user.schema"));
const { login, logout, signUp, getUsers, updateUser, deleteUser, getCustomerList, getLoggedInCustomerProfile, updateCustomerProfile } = require(path.join(
	process.cwd(),
	"src/modules/platform/user/user.controller"
));
const validate = require(path.join(process.cwd(), "src/modules/core/middlewares/validate.middleware"));
const { Services } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.constants"));
const { ServiceGuard } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.middlewares"));

module.exports = (app) => {
	app.post("/api/users/login", validate(loginSchema), login);
	app.post("/api/users/signup", validate(registerSchema), signUp);
	app.post("/api/users/logout", UserStrategy, logout);
	app.get("/api/users", UserStrategy, ServiceGuard([Services.MANAGE_USER]), getUsers);
	app.route("/api/users/:id").patch(UserStrategy, validate(userUpdateSchema), updateUser).delete(UserStrategy, deleteUser);
	app.route("/api/customers/profile")
		.get(CustomerStrategy, getLoggedInCustomerProfile)
		.put(CustomerStrategy, validate(userUpdateSchema), ServiceGuard([Services.UPDATE_CUSTOMER_PROFILE]), multer.single("image"), updateCustomerProfile);
	app.get("/api/customers", UserStrategy, ServiceGuard([Services.GET_CUSTOMER_LIST]), getCustomerList);
};
