const Permission = require("./permission.model");

const createPermission = async (req, res) => {
  try {
    const { services, name } = req.body;

    const newPermission = {
      services: JSON.stringify(services),
      name,
    };

    const [permission, created] = await Permission.findOrCreate({
      where: { name },
      defaults: {
        services: newPermission.services,
        name: newPermission.name,
      },
    });

    if (!created) {
      return res.status(409).send("Permission already exists.");
    }

    res.status(201).send(permission);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

module.exports.createPermission = createPermission;
