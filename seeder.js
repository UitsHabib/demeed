const path = require('path');

function init(){
    const sequelize = require(path.join(process.cwd(), '/src/config/lib/sequelize.js'));
    const user = require(path.join(process.cwd(), "src/modules/user/user.model.js"));
    
    const admin = require(path.join(process.cwd(), "src/modules/admin/admin.model.js"));
    sequelize.sync()
    .then(() => console.log("success"))
    .catch((error) => console.log(error));
};

init();