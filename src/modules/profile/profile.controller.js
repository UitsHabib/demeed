const path = require("path");
const Profile = require("./profile.model");
const Permission = require(path.join(process.cwd(), "src/modules/permission/permission.model"));
const ProfilePermission = require(path.join(process.cwd(), "src/modules/permission/profile-permission.model"));

const getProfiles = async (req, res) => {
	try {
        const profiles = await Profile.findAll({
            include: [
                {
                    model: ProfilePermission,
                    as: "profile_permissions",
                    include: [
                        {
                            model: Permission,
                            as: "permission"
                        }
                    ]
                }
            ]
        });

        res.status(200).send(profiles);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.");
    };
}

const createProfile = async (req, res) => {
    try {
		const id = req.user.id;
        const { title, description, permissions } = req.body;

        const [ profile, created ] = await Profile.findOrCreate({
            where: { title },
            defaults: { description, created_by: id, updated_by: id }
        });

        if(!created) {
            return res.status(409).send("Profile is already created.");
        };

		await Promise.all(permissions.map(async permission_id => {
			const profile_id = profile.id;

			await ProfilePermission.create({ profile_id, permission_id });
		}));

		const profileWithPermissions = await Profile.findOne({
			where: { id: profile.id },
			include: [
				{
                    model: ProfilePermission,
                    as: "profile_permissions",
                    include: [
                        {
                            model: Permission,
                            as: "permission"
                        }
                    ]
                }
			]
		});

        res.status(201).send(profileWithPermissions);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    }
}

const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, permissions } = req.body;

        const profile = await Profile.findOne({ where: { id } });

        if (!profile) return res.status(404).send("Profile not found!");

        if (title) await profile.update({ title, updated_by: req.user.id });

        if (description) await profile.update({ description, updated_by: req.user.id });

		if(permissions) {
			await ProfilePermission.destroy({ where: { profile_id: id } });

			await Promise.all(permissions.map(async permission_id => {
				const profile_id = profile.id;
	
				await ProfilePermission.create({ profile_id, permission_id });
			}));
		}

		const profileWithPermissions = await Profile.findOne({
			where: { id: profile.id },
			include: [
				{
                    model: ProfilePermission,
                    as: "profile_permissions",
                    include: [
                        {
                            model: Permission,
                            as: "permission"
                        }
                    ]
                }
			]
		});

        res.status(201).send(profileWithPermissions);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    };
}

const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const profile = await Profile.findOne({ 
			where: { id },
			include: [
				{
                    model: ProfilePermission,
                    as: "profile_permissions",
                    include: [
                        {
                            model: Permission,
                            as: "permission"
                        }
                    ]
                }
			]
		});

        if (!profile) return res.status(404).send("Profile not found!");

        await Profile.destroy({ where: { id } });
        await ProfilePermission.destroy({ where: { profile_id: id } });

        res.status(200).send(profile)
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    };
}

module.exports.getProfiles = getProfiles;
module.exports.createProfile = createProfile;
module.exports.updateProfile = updateProfile;
module.exports.deleteProfile =	deleteProfile;
