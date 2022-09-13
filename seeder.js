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

    const merchant = require(path.join(process.cwd(), "src/modules/merchant/merchant.routes"));
    const service = require(path.join(process.cwd(), "src/modules/service/service.routes"));

    sequelize.sync()
        .then(() => console.log("success"))
        .catch((err) => console.log(err));
};

init();