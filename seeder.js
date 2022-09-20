const path = require("path");
const { DataTypes } = require("sequelize");

function init() {
  const sequelize = require(path.join(
    process.cwd(),
    "/src/config/lib/sequelize.js"
  ));

  sequelize.query("CREATE DATABASE IF NOT EXISTS blog", (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });

  const admin = require(path.join(
    process.cwd(),
    "src/modules/admin/admin.model.js"
  ));


  const permission = require(path.join(
    process.cwd(),
    "src/modules/permission/permission.model.js"
  ));

  const service = require(path.join(
    process.cwd(),
    "src/modules/service/service.model.js"
  ));

  const permission_sets = require(path.join(
    process.cwd(),
    "src/modules/permissionSet/permissionSet.model.js"
  ));

  const user = require(path.join(
    process.cwd(),
    "src/modules/user/user.model.js"
  ));
  
  sequelize
    .sync()
    .then(() => console.log("success"))
    .catch((err) => console.log("======",err));


}

init();