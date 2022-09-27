const path = require("path");
const { createProfile } = require("./profile.controller");
const { Services } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.constants"));
const { ServiceGuard } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.middlewares"));
const UserStrategy = require(path.join(process.cwd(), "src/modules/user/user.authentication.middleware"));

module.exports = (app) => {
<<<<<<< HEAD
	app.post("/api/profiles", UserStrategy, ServiceGuard([Services.MANAGE_PROFILE]), createProfile);
=======
  app.post("/api/profiles", UserStrategy, ServiceGuard([Services.MANAGE_PROFILE]), createProfile);
>>>>>>> Add Service Guard Feature
};
