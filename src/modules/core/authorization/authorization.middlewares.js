const path = require("path");
const User = require(path.join(process.cwd(), "src/modules/user/user.model"));
const Profile = require(path.join(process.cwd(), "src/modules/profile/profile.model"));
const ProfilePermission = require(path.join(process.cwd(), "src/modules/permission/profile-permission.model"));
const Permission = require(path.join(process.cwd(), "src/modules/permission/permission.model"));
const PermissionService = require(path.join(process.cwd(), "src/modules/permission/permission-service.model"));
const Service = require(path.join(process.cwd(), "src/modules/service/service.model"));

async function getUserWithServices(userId) {
	const user = await User.findOne({
		where: {
			id: userId,
		},
		include: [
			{
				model: Profile,
				as: "profile",
				include: [
					{
						model: ProfilePermission,
						as: "profile_permissions",
						include: [
							{
								model: Permission,
								as: "permission",
								include: [
									{
										model: PermissionService,
										as: "permission_services",
										include: [
											{
												model: Service,
												as: "service",
											},
										],
									},
								],
							},
						],
					},
				],
			},
		],
	});

	/*
		user = {
			profile: {
				profile_permissions: [
					{

					},
					{
						permission: {
							permission_services: [
								{}, 
								{
									service: {}
								}
							]
						}
					}
				]
			}
		}
	*/

	const services = [];
	if (user?.profile) {
		for (const profilePermission of user.profile.profile_permissions) {
			const permission = profilePermission.permission;
			for (const permission_service of permission.permission_services) {
				services.push(permission_service.service);
			}
		}
	}

	return services;
}

function isPermitted(userServices, allowedServices) {
	if (userServices.some((userService) => allowedServices.includes(userService.slug))) return true;
	return false;
}

function ServiceGuard(allowedServices) {
	return async function (req, res, next) {
		const userServices = await getUserWithServices(req.user.id);

		if (!isPermitted(userServices, allowedServices)) {
			return res.status(403).send("Forbidden. You are not authorized.");
		}

		next();
	};
}

module.exports.ServiceGuard = ServiceGuard;
