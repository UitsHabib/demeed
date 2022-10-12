const path = require("path");
const async = require("async");

async function init() {
	const config = require(path.join(process.cwd(), "src/config"));
	await config.initEnvironmentVariables();

	const sequelize = require(path.join(process.cwd(), "/src/config/lib/sequelize.js"));

	await sequelize.query("CREATE DATABASE IF NOT EXISTS blog;", (err, res) => {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	const Service = require(path.join(process.cwd(), "src/modules/platform/service/service.model.js"));
	const User = require(path.join(process.cwd(), "src/modules/platform/user/user.model.js"));
	const Profile = require(path.join(process.cwd(), "src/modules/platform/profile/profile.model.js"));
	const Permission = require(path.join(process.cwd(), "src/modules/platform/permission/permission.model.js"));
	const PermissionService = require(path.join(process.cwd(), "src/modules/platform/permission/permission-service.model.js"));
	const ProfilePermission = require(path.join(process.cwd(), "src/modules/platform/permission/profile-permission.model.js"));

	require(path.join(process.cwd(), "src/modules/merchant/merchant.model.js"));
	require(path.join(process.cwd(), "src/modules/product/product.model"));
	require(path.join(process.cwd(), "src/modules/core/storage/file.model.js"));

	await sequelize.sync();

	function userSeeder(callback) {
		User.findOrCreate({
			where: { email: "demeed@gmail.com" },
			defaults: {
				password: "12345678",
			},
		}).then(function () {
			callback();
		});
	}

	function customerSeeder(callback) {
		User.findOrCreate({
			where: { email: "customer@gmail.com" },
			defaults: {
				password: "12345678",
			},
		}).then(function () {
			callback();
		});
	}

	function profileSeeder(callback) {
		User.findOne({
			where: { email: "demeed@gmail.com" },
		}).then(function (admin) {
			const profiles = [
				{ title: "System Admin", description: "This is the default profile for System Admin.", type: "standard", created_by: admin.id, updated_by: admin.id },
				{ title: "Customer", description: "This is the default profile for Customer.", type: "standard", created_by: admin.id, updated_by: admin.id },
			];

			Profile.destroy({ truncate: { cascade: true } }).then(function () {
				Profile.bulkCreate(profiles, {
					returning: true,
					ignoreDuplicates: false,
				}).then(function () {
					callback();
				});
			});
		});
	}

	function userUpdateSeeder(callback) {
		User.findOne({
			where: { email: "demeed@gmail.com" },
		}).then(function (admin) {
			Profile.findOne({
				where: { title: "System Admin" },
			}).then(function (profile) {
				admin.update({ profile_id: profile.id });

				callback();
			});
		});
	}

	function customerUpdateSeeder(callback) {
		User.findOne({
			where: { email: "customer@gmail.com" },
		}).then(function (admin) {
			Profile.findOne({
				where: { title: "Customer" },
			}).then(function (profile) {
				admin.update({ profile_id: profile.id });

				callback();
			});
		});
	}

	function serviceSeeder(callback) {
		User.findOne({
			where: { email: "demeed@gmail.com" },
		}).then(function (admin) {
			const services = [
				{ title: "Manage Users", slug: "manage-users", created_by: admin.id, updated_by: admin.id },
				{ title: "Manage Profiles", slug: "manage-profiles", created_by: admin.id, updated_by: admin.id },
				{ title: "Manage Permissions", slug: "manage-permissions", created_by: admin.id, updated_by: admin.id },
				{ title: "Manage Services", slug: "manage-services", created_by: admin.id, updated_by: admin.id },
				{ title: "Get Customer List", slug: "get-customer-list", created_by: admin.id, updated_by: admin.id },
				{ title: "Update Profile", slug: "update-profile", created_by: admin.id, updated_by: admin.id },
				{ title: "Delete Customer Profile", slug: "delete-customer-profile", created_by: admin.id, updated_by: admin.id },
				{ title: "Get Customer Profile", slug: "get-customer-profile", created_by: admin.id, updated_by: admin.id },
			];

			Service.destroy({ truncate: { cascade: true } }).then(function () {
				Service.bulkCreate(services, {
					returning: true,
					ignoreDuplicates: false,
				}).then(function () {
					callback();
				});
			});
		});
	}

	function permissionSeeder(callback) {
		User.findOne({
			where: { email: "demeed@gmail.com" },
		}).then(function (admin) {
			const permissions = [
				{ title: "System Admin Permission", description: "This is the default permission for System Admin", type: "standard", created_by: admin.id, updated_by: admin.id },
				{ title: "Customer Permission", description: "This is the default permission for Customer", type: "standard", created_by: admin.id, updated_by: admin.id },
			];

			Permission.destroy({ truncate: { cascade: true } }).then(function () {
				Permission.bulkCreate(permissions, {
					returning: true,
					ignoreDuplicates: false,
				}).then(function () {
					callback();
				});
			});
		});
	}

	function permissionServiceSeeder(callback) {
		User.findOne({
			where: { email: "demeed@gmail.com" },
		}).then(function (admin) {
			Promise.all([
				Service.findOne({ where: { title: "Manage Users" } }),
				Service.findOne({ where: { title: "Manage Profiles" } }),
				Service.findOne({ where: { title: "Manage Permissions" } }),
				Service.findOne({ where: { title: "Manage Services" } }),
				Service.findOne({ where: { title: "Get Customer List" } }),
				Service.findOne({ where: { title: "Update Profile" } }),
				Service.findOne({ where: { title: "Delete Customer Profile" } }),
				Service.findOne({ where: { title: "Get Customer Profile" } }),

				Permission.findOne({ where: { title: "System Admin Permission" } }),
				Permission.findOne({ where: { title: "Customer Permission" } }),
			]).then(function (values) {
				const [
					manageUserService,
					manageProfileService,
					managePermissionService,
					manageService,
					getCustomerList,
					updateCustomerProfile,
					deleteCustomerProfile,
					getCustomerProfile,
					systemAdminPermission,
					customerPermission,
				] = values;

				const permission_services = [
					{ permission_id: systemAdminPermission.id, service_id: manageUserService.id, created_by: admin.id, updated_by: admin.id },
					{ permission_id: systemAdminPermission.id, service_id: manageProfileService.id, created_by: admin.id, updated_by: admin.id },
					{ permission_id: systemAdminPermission.id, service_id: managePermissionService.id, created_by: admin.id, updated_by: admin.id },
					{ permission_id: systemAdminPermission.id, service_id: manageService.id, created_by: admin.id, updated_by: admin.id },
					{ permission_id: systemAdminPermission.id, service_id: getCustomerList.id, created_by: admin.id, updated_by: admin.id },
					{ permission_id: customerPermission.id, service_id: updateCustomerProfile.id, created_by: admin.id, updated_by: admin.id },
					{ permission_id: customerPermission.id, service_id: deleteCustomerProfile.id, created_by: admin.id, updated_by: admin.id },
					{ permission_id: customerPermission.id, service_id: getCustomerProfile.id, created_by: admin.id, updated_by: admin.id },
				];

				PermissionService.destroy({ truncate: { cascade: true } }).then(function () {
					PermissionService.bulkCreate(permission_services, {
						returning: true,
						ignoreDuplicates: false,
					}).then(function () {
						callback();
					});
				});
			});
		});
	}

	function profilePermissionSeeder(callback) {
		User.findOne({
			where: { email: "demeed@gmail.com" },
		}).then(function (admin) {
			Promise.all([
				Profile.findOne({ where: { title: "System Admin" } }),
				Profile.findOne({ where: { title: "Customer" } }),

				Permission.findOne({ where: { title: "System Admin Permission" } }),
				Permission.findOne({ where: { title: "Customer Permission" } }),
			]).then(function (values) {
				const [systemAdminProfile, customerProfile, systemAdminPermission, customerPermission] = values;

				const profile_permissions = [
					{ permission_id: systemAdminPermission.id, profile_id: systemAdminProfile.id },
					{ permission_id: customerPermission.id, profile_id: customerProfile.id },
				];

				ProfilePermission.destroy({ truncate: { cascade: true } }).then(function () {
					ProfilePermission.bulkCreate(profile_permissions, {
						returning: true,
						ignoreDuplicates: false,
					}).then(function () {
						callback();
					});
				});
			});
		});
	}

	async.waterfall(
		[userSeeder, customerSeeder, profileSeeder, userUpdateSeeder, customerUpdateSeeder, serviceSeeder, permissionSeeder, permissionServiceSeeder, profilePermissionSeeder],
		function (err) {
			if (err) console.error(err);
			else console.info("DB seed completed");
			process.exit();
		}
	);
}

init();
