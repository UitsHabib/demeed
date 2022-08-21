const jwt = require("jsonwebtoken");
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

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = {
    email,
    password,
  };

  const promise = Admin.findOne({
    where: {
      email: user.email,
      password: user.password,
    },
  });

  function success(user) {
    console.log(user);
    if (user) {
      //create a token and send it
      const access_token = jwt.sign(
        {
          id: user.id,
        },
        "jwt-secret",
        {
          expiresIn: "1h",
          issuer: user.id.toString(),
        }
      );

      res.cookie("access_token", access_token, {
        httpOnly: true,
        signed: true,
      });

      res.status(200).json(user);
    } else {
      res.status(404).send("User not found.");
    }
  }

  function error(err) {
    console.log(err);
    res.status(500).send("Internal server error.");
  }

  promise.then(success).catch(error);
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

const getSignedInUserProfile = (req, res) => {
  /*
    1. Is the user logged in?
    2. If logged in, send his profile
    3. else send msg "Please login first to get your profile"
  */

  const token = req.signedCookies["access_token"];

  if (!token) {
    return res.status(400).send("Bad request.");
  }
  const payload = jwt.verify(token, "jwt-secret");
  const { id } = payload;

  const promise = Admin.findOne({
    where: {
      id,
    },
  });

  function success(user) {
    console.log(user);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found.");
    }
  }

  function error(err) {
    console.log(err);
    res.status(500).send("Internal server error.");
  }

  promise.then(success).catch(error);
};

const logout = (req, res) => {
  res.clearCookie("access_token");
  res.send("Logged out.");
};

module.exports.login = login;
module.exports.adminSignUp = adminSignUp;
module.exports.adminForgotPassword = adminForgotPassword;
module.exports.adminResetPassword = adminResetPassword;
module.exports.getSignedInUserProfile = getSignedInUserProfile;
module.exports.logout = logout;
