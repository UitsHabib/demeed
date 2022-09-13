const Permission = require("./permission.model");
const PermissionService = require("./permission-service.model");
const Service = require("../service/service.model");

const getPermissions = async (req, res) => {
    try{
        const permissions = await Permission.findAll();

        res.status(200).send(permissions);
    } catch(err) {
        console.log(err);
        res.status(500).send("Internal server error.");
    };
};

const createPermission = async (req, res) => {
    try{
        const { name, description, services } = req.body;

        const permission = await Permission.create({ name, description });

        await Promise.all(services.map(async serviceId => {
            const permissionId = permission.id;

            await PermissionService.create({ permission_id: permissionId, service_id: serviceId });
        }));

        const permissionWithServices = await Permission.findOne({ 
            where: {
                id: permission.id
            },
            include: [
                {
                    model: PermissionService,
                    as: "permission_services",
                    include: [
                        {
                            model: Service,
                            as: "service"
                        }
                    ]
                }
            ]
        });

        res.status(200).send(permissionWithServices);
    } catch(err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

module.exports.getPermissions = getPermissions;
module.exports.createPermission = createPermission;
