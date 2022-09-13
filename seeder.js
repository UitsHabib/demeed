const path = require("path");

const init = () => {
    const sequelize = require(path.join(process.cwd(), "src/config/lib/sequelize"));

    sequelize.query("CREATE DATABASE IF NOT EXISTS blog", (err, res) => {
        if (err) {
        console.log(err);
        } else {
        console.log(res);
        }
    });

    require(path.join(process.cwd(), "src/modules/merchant/merchant.model"));
    require(path.join(process.cwd(), "src/modules/service/service.model"));
    require(path.join(process.cwd(), "src/modules/permission/permission.model"));
    require(path.join(process.cwd(), "src/modules/permission/permission-service.model"));

    sequelize.sync()
        .then(() => console.log("success"))
        .catch((err) => console.log(err));
};

init();