const PermissionSet = require('./permission-set.model');
const Permission = require('../permission/permission.model');
const PermissionSetWithPermission = require('./permissionSetWithPermissions.model');

const createPermissionSet = async (req, res) => {
    try {
        const { name, description, permissions } = req.body;

        const [ permissionSet, created ] = await PermissionSet.findOrCreate({
            where: { name },
            defaults: { name, description }
        });

        if (!created) return res.status(409).send("Already created.");

        await Promise.all(permissions.map(async permission_id => {
            const permissionSet_id = permissionSet.id;

            await PermissionSetWithPermission.create({ permissionSet_id, permission_id });
        }));

        const permissionSetWithPermissions = await PermissionSet.findOne({
            where: { id: permissionSet.id },
            include: [
                {
                    model: PermissionSetWithPermission,
                    as: "permission_set_with_permission",
                    include: [
                        {
                            model: Permission,
                            as: "permission"
                        }
                    ]
                }
            ]
        })

        res.status(201).send(permissionSetWithPermissions);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.");
    };
};

module.exports.createPermissionSet = createPermissionSet;