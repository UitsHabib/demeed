const Permission = require("./permission.model");
const Service = require("../service/service.model");
const PermissionService = require("./permission-service.model");

const getPermissions = async (req, res) => {
    try {
        const permissions = await Permission.findAll({
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

        res.status(200).send(permissions);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.");
    };
};

const getPermission = async (req, res) => {
    try {
        const { id } = req.params.id;

        const permission = await Permission.findOnde({ 
            where: { id },
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

        res.status(200).send(permission);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.");
    };
};

const createPermission = async (req, res) => {
    try {
        const id = req.user.id;
        const { title, description, services } = req.body;

        const [ permission, created ] = await Permission.findOrCreate({
            where: { title },
            defaults: { title, description, created_by: id, updated_by: id }
        });

        if(!created) {
            return res.status(409).send("Permission is already created.");
        };

        await Promise.all(services.map(async service_id => {
            const permission_id = permission.id;

            await PermissionService.create({ permission_id, service_id });
        }));

        const permissionWithServices = await Permission.findOne({
            where: { id: permission.id },
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

        res.status(201).send(permissionWithServices);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    }
};

const updatePermission = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { title, description, services } = req.body;

        const permission = await Permission.findOne({ where: { id } });

        if (!permission) return res.status(404).send("Permission not found!");

        if (title) await permission.update({ title });

        if (description) await permission.update({ description });

        if (services) {
            await PermissionService.destroy({ where: { permission_id: id } });

            await Promise.all(services.map(async service_id => {
                const permission_id = permission.id;
    
                await PermissionService.create({ permission_id, service_id });
            }));
        };

        if(title || description || services) await permission.update({ updated_by: userId })

        const permissionWithServices = await Permission.findOne({
            where: { id: permission.id },
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

        res.status(201).send(permissionWithServices);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    };
}

const deletePermission = async (req, res) => {
    try {
        const { id } = req.params;

        const permissionWithServices = await Permission.findOne({
            where: { id },
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

        if (!permissionWithServices) return res.status(404).send("Permission not found!");

        await Permission.destroy({ where: { id } });
        await PermissionService.destroy({ where: { permission_id: id } });

        res.status(200).send(permissionWithServices)
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    };
}

module.exports.getPermissions = getPermissions;
module.exports.getPermission = getPermission;
module.exports.createPermission = createPermission;
module.exports.updatePermission = updatePermission;
module.exports.deletePermission = deletePermission;
