const Admin = require("../admin/admin.model")

const authorizePermission = async(req, res, next) => {
    
    if (req.user.id) {
        
        const user = await Admin.findOne({
            where:{
                id:req.user.id
            }
        });
        
        if (user.role=="system-admin") {
            return next();
        }else{
            return res.status(403).send("access denied");
        }
    }
    console.log("nothing happened");
}

module.exports.authorizePermission = authorizePermission;