const PermissionSet = require("./permission-set.model");

const createPermissionSet = async (req, res) => {
  try {
    const { permissions, name } = req.body;

    const newPermissionSet = {
      permissions: JSON.stringify(permissions),
      name,
    };

    const [permissionSet, created] = await PermissionSet.findOrCreate({
      where: { name },
      defaults: {
        permissions: newPermissionSet.permissions,
        name: newPermissionSet.name,
      },
    });

    if (!created) {
      return res.status(409).send("Permission set already exists.");
    }

    res.status(201).send(permissionSet);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

module.exports.createPermissionSet = createPermissionSet;
