const Permission = require("./permission.model");

const createPermission = async (req, res) => {
  try {
    const { name, service_ids } = req.body;

    const [permission, created] = await Permission.findOrCreate({
      where: { name },
      defaults: { name, service_ids },
    });

    if (!created) {
      return res.status(400).send("The permission already exists.");
    }

    res.status(201).json(permission);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error.");
  }
};

module.exports.createPermission = createPermission;
