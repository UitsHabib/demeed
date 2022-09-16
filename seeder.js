const path = require("path");
const sequelize = require("sequelize");

function init() {
  const sequelize = require(path.join(
    process.cwd(),
    "src/config/lib/sequelize"
  ));

  sequelize.query("CREATE DATABASE IF NOT EXISTS demeed", (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("successfully");
    }
  });

  const admin = require(path.join(process.cwd(),"src/modules/admin/admin.model.js"));
  const user = require(path.join(process.cwd(), "/src/modules/user/user.model"));
  const merchant = require(path.join(process.cwd(), "/src/modules/merchant/merchant.model"));

  const permission = require(path.join(process.cwd(), "/src/modules/permission/permission.model"));

  sequelize
    .sync()
    .then(() => console.log("success"))
    .catch((err) => console.log(err));
}
init();
