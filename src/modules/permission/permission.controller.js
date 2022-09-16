const Permission = require("./permission.model");

const createPermission = async (req, res) => {
  try {
    const { name } = req.body;
    const permission = await Permission.create({ name });
    res.status(201).send({ message: "Permission Added !", data: permission });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports.createPermission = createPermission;
