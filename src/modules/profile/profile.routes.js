const path = require("path");
const { updatePermission, deletePermission } = require("../permission/permission.controller");
const { getProfile, createProfile } = require("./profile.controller");
const { profileSchema, profileUpdateSchema } = require("./profile.schema");
const { Services } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.constants"));
const { ServiceGuard } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.middlewares"));
const UserStrategy = require(path.join(process.cwd(), "src/modules/user/user.authentication.middleware"));
const validate = require(path.join(process.cwd(), "/src/modules/core/middlewares/validate.middleware"));

module.exports = (app) => { 
	app.route("/api/profiles")
        .get(UserStrategy, ServiceGuard([Services.MANAGE_PROFILE]), getProfile)
        .post(UserStrategy, ServiceGuard([ServiceGuard.MANAGE_PROFILE]), validate(profileSchema), createProfile);
    
    app.route("/api/profiles/:id")
        .patch(UserStrategy, ServiceGuard([ServiceGuard.MANAGE_PROFILE]), validate(profileUpdateSchema), updatePermission)
        .delete(UserStrategy, ServiceGuard([Services.MANAGE_PROFILE]), deletePermission);
};
