const PermissionSet = require("./permission-set.model");
const Permission = require("../permission/permission.model");
// Create Permission Sets
const createPermissionSet = async (req, res) => {
  try {
    const { name, permissionIds } = req.body;
    const permissionSet = await PermissionSet.create({ name: name });
    permissionSet.setPermissions(permissionIds);
    res.status(201).send({ success: "Added Permission Set" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// Get All Permission Sets
const getAllPermissionSet = async (req, res) => {
  try {
    const permissionSets = await PermissionSet.findAll({
      include: {
        model: Permission,
        as: "Permissions",
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    res.status(200).send(permissionSets);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports.createPermissionSet = createPermissionSet;
module.exports.getAllPermissionSet = getAllPermissionSet;
