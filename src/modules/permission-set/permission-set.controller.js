const PermissionSet = require("./permission-set.model");
const PermissionSetAll = require("./permission-set-all.model");
const Permission = require("../permission/permission.model");

// Create a Permission Set
const createPermissionSet = async (req, res) => {
  try {
    const { name, permissionIds } = req.body;
    const permissionSet = await PermissionSet.create({ name });
    permissionIds.forEach(async (pId) => {
      const permissionSetId = permissionSet.id;
      await PermissionSetAll.create({
        permission_set_id: permissionSetId,
        permission_id: pId,
      });
    });
    res.status(200).send({ success: "Permission Set created !" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// Get All Permission Sets
const getPermissionSets = async (req, res) => {
  try {
    const permsissionSets = await PermissionSet.findAll({
      include: [
        {
          model: PermissionSetAll,
          as: "permission_sets_all",
          attributes: { exclude: ["permission_set_id", "id"] },
          include: [
            {
              model: Permission,
              as: "permissions",
              attributes: { exclude: ["id"] },
            },
          ],
        },
      ],
    });
    res.status(200).send(permsissionSets);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error.");
  }
};

module.exports.createPermissionSet = createPermissionSet;
module.exports.getPermissionSets = getPermissionSets;
