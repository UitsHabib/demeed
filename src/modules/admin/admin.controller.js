const Admin = require("./admin.model");
const { generateAccessToken } = require("./admin.service");

const checkIfAdminExists = async (email) => {
  try {
    const existingAdmin = await Admin.findOne({
      where: {
        email: email,
      },
    });
    return existingAdmin;
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = {
      email,
      password,
    };

    const admin = await Admin.findOne({
      where: {
        email: user.email,
        password: user.password,
      },
    });

    if (!admin) {
      return res.status(400).send("Invalid credentials.");
    }

    res.cookie("access_token", generateAccessToken(admin), {
      httpOnly: true,
      signed: true,
    });

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
};

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user, created] = await Admin.findOrCreate({
      where: { email },
      defaults: {
        email,
        password,
      },
    });

    if (!created) {
      return res.status(409).send("User already exists.");
    }

    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error.");
  }
};

const adminForgotPassword = async (req, res) => {
  const email = req.body.email;

  const existingAdmin = await checkIfAdminExists(email);
  if (existingAdmin) {
    res.send("A reset password link sent to your email");
  } else {
    res.send("Admin with this email not found");
  }
};

const adminResetPassword = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  const existingAdmin = await checkIfAdminExists(email);
  if (!existingAdmin) {
    res.send("No admin account found with this email");
  } else {
    if (password === confirmPassword) {
      try {
        await Admin.update(
          {
            password,
          },
          {
            where: {
              email,
            },
          }
        );
        res.send("Password updated successfully.");
      } catch (error) {
        console.log(error);
      }
    } else {
      res.send("Passwords didn't match.");
    }
  }
};

const getSignedInUserProfile = async (req, res) => {
  try {
    const id = req.user.id;

    const admin = await Admin.findOne({
      where: {
        id,
      },
    });

    if (!admin) {
      return res.status(404).send("User not found.");
    }

    res.status(200).send(admin);
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
};

const logout = (req, res) => {
  res.clearCookie("access_token");
  res.send("Logged out.");
};

module.exports.login = login;
module.exports.signUp = signUp;
module.exports.adminForgotPassword = adminForgotPassword;
module.exports.adminResetPassword = adminResetPassword;
module.exports.getSignedInUserProfile = getSignedInUserProfile;
module.exports.logout = logout;