const User = require("./user.model");
const { generateAccessToken } = require("./user.service");

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { email, password },
    });

    if (!created) {
      res.status(409).send("User already exists.");
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = {
      email,
      password,
    };

    const findUser = await User.findOne({
      where: {
        email: user.email,
        password: user.password,
      },
    });

    if (!findUser) {
      res.status(404).send("Invaild credentials.");
    }

    res.cookie("access_token", generateAccessToken(findUser), {
      httpOnly: true,
      signed: true,
    });
    res.status(200).json(findUser);
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
};

const getLoginProfile = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(401).send("User not found.");
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
};

const logout = (req, res) => {
  res.clearCookie("access_token");
  res.send("logged out.");
};

module.exports.signUp = signUp;
module.exports.login = login;
module.exports.getLoginProfile = getLoginProfile;
module.exports.logout = logout;
