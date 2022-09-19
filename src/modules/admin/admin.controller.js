const Admin = require("./admin.model");
const { generateAccessToken } = require("./admin.service");

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [admin, created] = await Admin.findOrCreate({
      where: { email },
      defaults: { email, password },
    });

    if (!created) {
      return res.status(409).send("Admin already exists.");
    }

    res.status(201).send(admin);
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = {
      email,
      password,
    };

    const findAdmin = await Admin.findOne({
      where: {
        email: admin.email,
        password: admin.password,
      },
    });

    if (!findAdmin) {
      res.status(400).send("Invaild Credentials");
    }

    res.cookie("access_token", generateAccessToken(findAdmin), {
      httpOnly: true,
      signed: true,
    });
    
    res.status(200).json(findAdmin);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const getLoginProfile = async (req, res) => {
  try {
    const id = req.user.id;
    
    const admin = await Admin.findOne({
      where: {
        id,
      },
    });

    if (!admin) {
      return res.status(401).send("Admin not found");
    }

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const logout = (req, res) => {
  res.clearCookie("access_token");
  res.send("Logged out.");
};

module.exports.signUp = signUp;
module.exports.login = login;
module.exports.getLoginProfile = getLoginProfile;
module.exports.logout = logout;
