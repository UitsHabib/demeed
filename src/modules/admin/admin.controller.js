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
  const data = { ...req.body };
  const response = await checkAdminExsists(data.email);
  if (response) {
    try {
      data.email == response.dataValues.email &&
      data.password == response.dataValues.password
        ? res.send({ message: "Welcome to deemed admin dashboard !" })
        : res.send({ message: "Invalid credentials !" });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send({ error: "Invalid credentials !" });
  }
};

// function for admin password reset
const passwordReset = async (req, res) => {
  const data = { ...req.body };
  const response = await checkAdminExsists(data.email);
  if (response) {
    try {
      data.email == response.email
        ? res.send({ message: `Password reset link sent to ${data.email}` })
        : res.send({ message: "Invalid email !" });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send({ error: "Invalid Email !" });
  }
};

module.exports.registerAdmin = registerAdmin;
module.exports.adminSignIn = adminSignIn;
module.exports.passwordReset = passwordReset;
