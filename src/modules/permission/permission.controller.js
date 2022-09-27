const Permission = require('./permission.model');

const permissions = async (req, res) => {
    const permission = await Permission.findAll()
    if (!permission) {
        return res.status(409).send("Permission doesn't exist.");
    }
    res.status(200).send(permission);
}

const permission = async (req, res) => {
    try {
        const { permission_name } = req.body;

        const [permission, created] = await Permission.findOrCreate(
            {
                where: { permission_name },
                defaults: { permission_name }
            }
        )

        if (!created) {
            return res.status(409).send("Permission already exist");
        }

        res.status(201).send(permission);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports.permissions = permissions;
module.exports.permission = permission;