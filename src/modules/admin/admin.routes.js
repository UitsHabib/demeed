const {
  getAdmins,
  createAdmin,
  loginAdmin,
  updateAdmin,
} = require("./admin.controller");

module.exports = (app) => {
  app.get("/admin", getAdmins);
  app.post("/admin/register", createAdmin);
  app.post("/admin/signin", loginAdmin);
  app.put("/admin/password/reset", updateAdmin);
};
