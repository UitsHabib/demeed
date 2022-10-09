module.exports = {
	routes: [
		"src/modules/**/*.routes.js",
		"src/modules/platform/user/user.routes.js",
		"src/modules/platform/profile/profile.routes.js",
		"src/modules/platform/permission/permission.routes.js",
		"src/modules/platform/service/service.routes.js",
		"src/modules/customer/customer.routes.js",
	],
	strategies: ["src/modules/**/*.strategy.js", "src/modules/platform/user/user.strategy.js", "src/modules/customer/customer.strategy.js"],
};
