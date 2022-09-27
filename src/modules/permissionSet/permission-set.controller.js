const PermissionSet = require("./permission-set.model");
const PermissionSetWithPermission = require("./permission-setWithPermission.model");
const Permission = require("../permission/permission.model");

const getPermissionSet = async (req, res) => {
    try {
        const permissionSets = await PermissionSet.findAll({
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
        });

        res.status(200).send(permissionSets);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.");
    };
};

const createPermissionSet = async (req, res) => {
    try {
        const { name, description, permissions } = req.body;

        const [ permissionSet, created ] = await PermissionSet.findOrCreate({
            where: { name },
            defaults: { name, description }
        });

        if(!created) return res.status(409).send("Already created.");

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

const updatePermissionSet = async (req, res) => {
    try {
        const { name, description, permissions } = req.body;
        const { id } = req.params;

        const permissionSet = await PermissionSet.findOne({ where: { id }});

        if(!permissionSet) return res.status(404).send("Not foun!");

        if(name) await permissionSet.update({ name });

        if(description) await permissionSet.update({ description });

        if(permissions) {
            await PermissionSetWithPermission.destroy({ where: { permissionSet_id: id }});

            permissions.map(async permission_id => {
                const permissionSet_id = permissionSet.id;
    
                await PermissionSetWithPermission.create({ permissionSet_id, permission_id });
            });
        };

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
        });

        res.status(201).send(permissionSetWithPermissions);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    };
}

const deletePermissionSet = async (req, res) => {
    try {
        const { id } = req.params;

        await PermissionSet.destroy({ where: { id } });
        await PermissionSetWithPermission.destroy({ where: { permissionSet_id: id } });

        res.status(200).send("Delete permission.")
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    };
}

module.exports.getPermissionSet = getPermissionSet;
module.exports.createPermissionSet = createPermissionSet;
module.exports.updatePermissionSet = updatePermissionSet;
module.exports.deletePermissionSet = deletePermissionSet;