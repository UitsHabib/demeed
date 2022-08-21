const Admin = require("./admin.model.js");

// check admin exsists or not for given email
const checkAdminExsists = async (email) => {
  try {
    const adminExsists = await Admin.findOne({ where: { email: email } });
    return adminExsists;
  } catch (error) {
    console.log(error);
  }
};

// function for register admin in system.
const registerAdmin = async (req, res) => {
  const data = { ...req.body };
  const checkAdmin = await checkAdminExsists(data.email);
  if (!checkAdmin) {
    try {
      const registerAdmin = await Admin.create(data);
      res.send({
        message:
          "Admin registration successful ! Please check email for active account.",
        data: registerAdmin.dataValues,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send({ error: "An account already exsists with this email." });
  }
};

// function for singin in admin dashboard
const adminSignIn = async (req, res) => {
  const request = { ...req.body };
  try {
    const response = await Admin.findOne({
      where: { email: request.email, password: request.password },
    });
    response
      ? res.send({ message: "Login to admin dashboard successful !" })
      : res.send({ error: "Invalid credentials !" });
  } catch (err) {
    console.log(err);
  }
};

// function for admin password reset
const passwordReset = async (req, res) => {
  const data = { ...req.body };
  const response = await checkAdminExsists(data.email);
  try {
    response
      ? res.send({ message: `Password reset link sent to ${response.email}` })
      : res.send({ error: "Email not found " });
  } catch (error) {
    console.log(error);
  }
};

module.exports.registerAdmin = registerAdmin;
module.exports.adminSignIn = adminSignIn;
module.exports.passwordReset = passwordReset;
