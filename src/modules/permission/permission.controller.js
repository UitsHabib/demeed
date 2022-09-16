const Permission = require("./permission.model");

const createPermission = async (req, res) => {
  try {
    const { permission_name, service_id } = req.body;

    const [permission, created] = await Permission.findOrCreate({
      where: { permission_name, },
      defaults: { permission_name, service_id },
    });

    if (!created) {
      return res.status(409).send("The permission already exists.");
    }

    res.status(201).json(permission);
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
};

module.exports.createPermission = createPermission;
