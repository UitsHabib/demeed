const ProfilePermission = require(path.join(process.cwd(), "src/modules/platform/permission/profile-permission.model"));
const Profile = require(path.join(process.cwd(), "src/modules/platform/profile/profile.model"));
const Permission = require(path.join(process.cwd(), "src/modules/platform/permission/permission.model"));
const User = require(path.join(process.cwd(), "src/modules/platform/user/user.model"));
const Service = require(path.join(process.cwd(), "src/modules/platform/service/service.model"));
const PermissionService = require(path.join(process.cwd(), "src/modules/platform/permission/permission-service.model"));

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
