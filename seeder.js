const path = require("path");

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

  const user = require(path.join(
    process.cwd(),
    "src/modules/user/user.model.js"
  ));

  const service = require(path.join(
    process.cwd(),
    "src/modules/service/service.model.js"
  ));

  const permission = require(path.join(
    process.cwd(),
    "src/modules/permission/permission.model.js"
  ));

  const permissionSet = require(path.join(
    process.cwd(),
    "src/modules/permission-set/permission-set.model.js"
  ));

  const profile = require(path.join(
    process.cwd(),
    "src/modules/profile/profile.model.js"
  ));

  sequelize
    .sync()
    .then(() => console.log("success"))
    .catch((err) => console.log(err));
}

init();
