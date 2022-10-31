const path = require("path");
const multer = require(path.join(process.cwd(), "src/config/lib/multer.js"));
const UserStrategy = require(path.join(process.cwd(), "src/modules/platform/user/user.authentication.middleware"));
const CustomerStrategy = require(path.join(process.cwd(), "src/modules/customer/customer.authentication.middleware"));
const { userUpdateSchema } = require(path.join(process.cwd(), "src/modules/platform/user/user.schema"));
const controllers = require(path.join(process.cwd(), "src/modules/customer/controllers"));
const validate = require(path.join(process.cwd(), "src/modules/core/middlewares/validate.middleware"));
const { Services } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.constants"));
const { ServiceGuard } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.middlewares"));
const format = require(path.join(process.cwd(), "src/modules/core/middlewares/format.middleware"));


module.exports = (app) => {
	app.route("/api/customers/profile")
		.get(CustomerStrategy, controllers.getLoggedInCustomerProfile)
		.put(CustomerStrategy, validate(userUpdateSchema), ServiceGuard([Services.UPDATE_PROFILE]), format, controllers.updateCustomerProfile);
	app.get("/api/customers", UserStrategy, ServiceGuard([Services.GET_CUSTOMER_LIST]), controllers.getCustomerList);
};
