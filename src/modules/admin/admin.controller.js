const Admin = require("./admin.model");

const getAdmins = (req, res) => {
  Admin.findAll()
    .then((admins) => res.send(admins))
    .catch((err) => console.log(err));
};

const createAdmin = (req, res) => {
  const newAdmin = {
    username: req.body.username,
    password: req.body.password,
  };

  Admin.create(newAdmin)
    .then((admin) => res.send(admin))
    .catch((err) => console.log(err));
};

const loginAdmin = async (req, res) => {
  const usernameInput = req.body.userNameInput;
  const passwordInput = req.body.passwordInput;

  const admin = await Admin.findOne({ where: { username: usernameInput } });
  if (admin) {
    try {
      if (admin.dataValues.password === passwordInput) {
        res.send("Welcome to your dashboard");
      } else {
        res.send("Your password is not match");
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("Username is not match");
  }
};

const updateAdmin = async (req, res) => {
  const usernameInput = req.body.usernameInput;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;

  const findAdmin = await Admin.findOne({
    where: { username: usernameInput },
  });
  if (findAdmin) {
    try {
      if (newPassword === confirmPassword) {
        if (newPassword === findAdmin.password) {
          res.send(
            "Your new password cannot be the same as your current password"
          );
        } else {
          findAdmin.password = newPassword;
          findAdmin.save();
          res.send(findAdmin);
        }
      } else {
        res.send("Your both password is not match");
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("Username is not match");
  }
};

module.exports.getAdmins = getAdmins;
module.exports.createAdmin = createAdmin;
module.exports.loginAdmin = loginAdmin;
module.exports.updateAdmin = updateAdmin;
