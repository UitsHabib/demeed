const PermissionSets=require("./permissionSet.model")
const Permission=require("../permission/permission.model")
const Service=require("../service/service.model")
const createPermissionSets = async(req,res) =>{
    try {
        
        if (req.user.id) {
            
            const {role,permissionId,service_id,permissionList} = req.body;
            
            const permissions = await Permission.findAll({
                include:[{
                    model:Service,
                }]
            });

            let permissionSet={}

            if (Array.isArray(permissionList)) {
                for (let i = 0; i < permissionList.length; i++) {
                    const element = permissionList[i];
                    const permission = permissions.find(f=>f.id==element.id);
                           
                    permissionSet=await PermissionSets.create({
                        role: permission.name,
                        permission_id: permission.id,
                        service_id: permission.service_id
                    });

                }
            }

            res.status(201).send(permissionSet);
        }else{
            res.status(403).send("Access denied from controller");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}


module.exports.createPermissionSets = createPermissionSets