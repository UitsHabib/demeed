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

    require(path.join(process.cwd(), "src/modules/admin/admin.model.js"));
    require(path.join(process.cwd(), "src/modules/service/service.model.js"));

    sequelize.sync()
        .then(() => console.log("success"))
        .catch((err) => console.log(err));
};

init();