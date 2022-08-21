const path = require("path");

function init() {
  const sequelize = require(path.join(
    process.cwd(),
    "/src/config/lib/sequelize.js"
  ));

  sequelize.query("CREATE DATABASE IF NOT EXISTS users", (err, res) => {
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

  sequelize
    .sync()
    .then(() => console.log("success"))
    .catch((err) => console.log(err));
}

init();