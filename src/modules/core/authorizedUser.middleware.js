const Admin = require("../admin/admin.model");
const Permission = require("../permission/permission.model");
const Service = require("../service/service.model");

const AuthorizedUser=async(req,res,next)=>{
    if (req.user.id) {
        const user = await Admin.findOne({
            where:{
                id:req.user.id
            }
        });
        
        const permissions = await Permission.findAll({
            include:[{
                model:Service,
            }],
            where:{
                name:user.role
            }
        });

        for (let i = 0; i < permissions.length; i++) {
            const element = permissions[i];

            if (req.baseUrl+req.path == element.service.name) {
                req.permissions = permissions;
                return next();        
            }else{
                return res.status(403).send("access denied");
            }
        }
    }  
}

module.exports = AuthorizedUser;