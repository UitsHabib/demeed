const path = require('path');
const Service = require(path.join(process.cwd(), "src/modules/platform/service/service.model"));
const Permission = require(path.join(process.cwd(), "src/modules/platform/permission/permission.model"));
const PermissionService = require(path.join(process.cwd(), "src/modules/platform/permission/permission-service.model"));

const getPermissions = async (req, res) => {
    try {
        const page = req.query.page ? req.query.page - 1 : 0;
        if(page < 0) return res.status(404).send("Page must be greater or equal one");

        const limit = req.query.limit ? +req.query.limit : 15;
        const offset = page * limit;
        
        const order = [
            ["created_at", "DESC"],
            ["id", "DESC"]
        ]

        const { count: totalPermission, rows: permissions }  = await Permission.findAndCountAll({
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
            ],
            offset,
            limit,
            order
        });

        const data = {
            permissions,
            metaData: {
                page: page + 1,
                limit: limit,
                total: totalPermission,
                start: limit * page + 1,
                end: offset + limit > totalPermission ? totalPermission : offset + limit
            }
        };

        res.status(200).send(data);
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
        const { title, description, services } = req.body;

        const [ permission, created ] = await Permission.findOrCreate({
            where: { title },
            defaults: { title, description, created_by: req.user.id, updated_by: req.user.id }
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
        const { title, description, services } = req.body;

        const permission = await Permission.findOne({ where: { id } });

        if (!permission) return res.status(404).send("Permission not found!");

        if (title) await permission.update({ title, updated_by: req.user.id });

        if (description) await permission.update({ description, updated_by: req.user.id });

        if (services) {
            await permission.update({ updated_by: req.user.id });
            await PermissionService.destroy({ where: { permission_id: id } });

            await Promise.all(services.map(async service_id => {
                const permission_id = permission.id;
    
                await PermissionService.create({ permission_id, service_id });
            }));
        };

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
