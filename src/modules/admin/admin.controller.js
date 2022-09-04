const Admin = require("./admin.model.js");
const { generateAccessToken } = require("./admin.service.js");
// function for register admin in system.
const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [admin, created] = await Admin.findOrCreate({
      where: { email },
      defaults: { email, password },
    });
    if (!created) {
      return res.status(409).send({ message: "Admin Already Exsists" });
    } else {
      res
        .status(201)
        .send({ message: "Admin user created successfully", data: admin });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

// function for login in admin dashboard
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
      return res.send(400).send({ message: "Invalid Credentials" });
    }
    res.cookie("access_token", generateAccessToken(admin), {
      httpOnly: true,
      signed: true,
    });
    res.status(200).send(admin);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
// logout function
const logout = (req, res) => {
  res.clearCookie("access_token");
  res.send({ message: "Logout Successful !" });
};

// get signed user profile
const getSignedInAdminProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const admin = await Admin.findOne({ where: { id } });
    if (!admin) {
      return res.status(404).send({ message: "Admin not found !" });
    }
    res.status(200).send(admin);
  } catch (error) {
    req.status(500).send({ message: "Internal Server error !" });
  }
};

module.exports.signUp = signUp;
module.exports.login = login;
module.exports.getSignedInAdminProfile = getSignedInAdminProfile;
module.exports.logout = logout;
