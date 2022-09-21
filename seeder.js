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

  require(path.join(process.cwd(), "src/modules/admin/admin.model.js"));
  require(path.join(process.cwd(), "src/modules/merchant/merchant.model.js"));
  require(path.join(
    process.cwd(),
    "src/modules/permission/permission.model.js"
  ));
  require(path.join(
    process.cwd(),
    "src/modules/permission-set/permission-set.model.js"
  ));
  sequelize
    .sync()
    .then(() => console.log("success"))
    .catch((err) => console.log(err));
}

init();
