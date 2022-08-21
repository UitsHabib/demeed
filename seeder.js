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

  const admin = require(path.join(process.cwd(), "src/modules/admin/admin.model.js"))

  sequelize.sync().then((res)=> console.log("success")).catch((err) => console.log(err))
}
init();
