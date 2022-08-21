const Admin = require("./admin.model");

const getAdmins = (req, res) => {
  Admin.findAll()
    .then((admins) => res.send(admins))
    .catch((err) => console.log(err));
};

const createAdmin = (req, res) => {
  const newAdmin = {
    email: req.body.email,
    password: req.body.password,
  };

  Admin.create(newAdmin)
    .then((admin) => res.send(admin))
    .catch((err) => console.log(err));
};

const loginAdmin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const admin = await Admin.findOne({ where: { email: email } });
  if (admin) {
    if (admin.dataValues.password === password) {
      res.send("Welcome to your dashboard");
    } else {
      res.send("Your password is not match");
    }
  }
};

module.exports.getAdmins = getAdmins;
module.exports.createAdmin = createAdmin;
module.exports.loginAdmin = loginAdmin;
