const ProfilePermission = require("../permission/profile-permission.model");
const Profile = require("../profile/profile.model");
const Permission = require("../permission/permission.model");
const User = require("./user.model");
const Service = require("../service/service.model");
const PermissionService = require("../permission/permission-service.model");

const PermissionStrategy = (serviceId) => {
	return async (req, res, next) => {
		const userId = req.user.id;

		const user = await User.findOne({
			where: {
				id: userId,
			},
		});

		const profile = await Profile.findOne({
			where: {
				id: user.profile_id,
			},
			include: [
				{
					model: ProfilePermission,
					as: "profile_permission",
				},
			],
		});

		const profile_permissions = profile.profile_permission;

		console.log(profile_permissions);
	};
};

module.exports = PermissionStrategy;
