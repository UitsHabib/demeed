const path = require("path");
const { profileSchema, profileUpdateSchema } = require("./profile.schema");
const { getProfiles, createProfile, updateProfile, deleteProfile } = require("./profile.controller");
const validate = require(path.join(process.cwd(), "src/modules/core/middlewares/validate.middleware"));
const UserStrategy = require(path.join(process.cwd(), "src/modules/user/user.authentication.middleware"));
const { Services } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.constants"));
const { ServiceGuard } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.middlewares"));

module.exports = (app) => {
	app.route("/api/profiles")
        .get(UserStrategy, ServiceGuard([Services.MANAGE_PROFILE]), getProfiles)
        .post(UserStrategy, ServiceGuard([Services.MANAGE_PROFILE]), validate(profileSchema), createProfile);

    app.route("/api/profiles/:id")
        .patch(UserStrategy, ServiceGuard([Services.MANAGE_PROFILE]), validate(profileUpdateSchema), updateProfile)
        .delete(UserStrategy, ServiceGuard([Services.MANAGE_PROFILE]), deleteProfile);
};
