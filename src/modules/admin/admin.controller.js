const Admin = require("./admin.model");

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

const adminSignIn = async (req, res) => {
  const signInRequest = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const response = await Admin.findOne({
      where: {
        email: signInRequest.email,
        password: signInRequest.password,
      },
    });
    if (!response) {
      res.send("Invalid credentials.");
    } else {
      res.send("Signed in successfully.");
    }
  } catch (error) {
    console.log(error);
  }
};

const adminSignUp = async (req, res) => {
  const admin = {
    email: req.body.email,
    password: req.body.password,
  };
  const existingAdmin = await checkIfAdminExists(admin.email);
  if (!existingAdmin) {
    try {
      await Admin.create(admin);
      res.send("Admin created successfully");
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("Admin with this email already exists");
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

module.exports.adminSignIn = adminSignIn;
module.exports.adminSignUp = adminSignUp;
module.exports.adminForgotPassword = adminForgotPassword;
module.exports.adminResetPassword = adminResetPassword;
