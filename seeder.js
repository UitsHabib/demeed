const path = require('path');

init = async () => {
    const sequelize = require(path.join(process.cwd(), 'src/config/lib/sequelize.js'));

    sequelize.query("CREATE DATABASE IF NOT EXISTS project", (res, err) => {
        if(res) {
            console.log("Successfull");
        }
        else {
            console.log(err);
        }
    })

    require(path.join(process.cwd(), "src/modules/user/user.model.js"));

    require(path.join(process.cwd(), "src/modules/admin/admin.model.js"));
    
    require(path.join(process.cwd(), "src/modules/delivaryMan/delivaryMan.model.js"));

    require(path.join(process.cwd(), "src/modules/permission/permission.model.js"));
    require(path.join(process.cwd(), "src/modules/permission-set/permission-set.model.js"));
    require(path.join(process.cwd(), "src/modules/permission-set/permissionSetWithPermissions.model.js"));
    
    try {
        await sequelize.sync();

        console.log("successful");
    }
    catch (err) {
        console.log(err);
    }
}

init();