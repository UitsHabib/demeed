const path = require("path");
const { multerUploads } = require(path.join(process.cwd(), "src/modules/core/middlewares/multer.middleware"));
const CustomerStrategy = require(path.join(process.cwd(), "src/modules/customer/customer.authentication.middleware"));
const UserStrategy = require(path.join(process.cwd(), "src/modules/platform/user/user.authentication.middleware"));
const { loginSchema } = require(path.join(process.cwd(), "src/modules/customer/customer.schema"));
const { login, logout, getCustomerProfile, updateCustomerProfile, getCustomerList } = require(path.join(process.cwd(), "src/modules/customer/customer.controller"));
const validate = require(path.join(process.cwd(), "src/modules/core/middlewares/validate.middleware"));
const { Services } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.constants"));
const { ServiceGuard } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.middlewares"));

module.exports = (app) => {
	app.post("/api/customers/login", validate(loginSchema), login);
	app.post("/api/customers/logout", CustomerStrategy, logout);
	app.route("/api/customers/profile").get(CustomerStrategy, getCustomerProfile).patch(CustomerStrategy, multerUploads, updateCustomerProfile);
	app.get("/api/customers", UserStrategy, ServiceGuard([Services.GET_CUSTOMER_LIST]), getCustomerList);
};
