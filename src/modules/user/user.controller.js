<<<<<<< HEAD
const User = require("./user.model");
const registerSchema = require("./user.schema");
const { generateAccessToken } = require("./user.service");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userReq = {
      email,
      password,
    };

    const user = await User.findOne({
      where: {
        email: userReq.email,
        password: userReq.password,
      },
    });

    if (!user) {
      return res.status(400).send("Invalid credentials.");
    }

    res.cookie("access_token", generateAccessToken(user), {
      httpOnly: true,
      signed: true,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
};

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user, created] = await User.findOrCreate({
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

const getSignedInUserProfile = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
};

const logout = (req, res) => {
  res.clearCookie("access_token");
  res.send("Logged out.");
};

const setProfile = async (req, res) => {
  try {
    const { userId, profile } = req.body;

    const [updatedUser] = await User.update(
      {
        profile,
      },
      {
        where: {
          id: userId,
        },
      }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found.");
    }

    res.status(201).send(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error.");
  }
};

const deleteUser = async (req, res) => {
  return res.send("deleted");
};

module.exports.login = login;
module.exports.signUp = signUp;
module.exports.getSignedInUserProfile = getSignedInUserProfile;
module.exports.logout = logout;
module.exports.setProfile = setProfile;
module.exports.deleteUser = deleteUser;
=======
const User = require("./user.model.js");
const { generateAccessToken } = require("./user.service.js");

// function for register admin in system.
const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { email, password },
    });
    if (!created) {
      return res.status(409).send({ message: "User Already Exsists" });
    } else {
      res.status(201).send({ message: "User created successfully", data: user });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// function for login in  dashboard
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userReq = { email, password };

    const user = await User.findOne({
      where: {
        email: userReq.email,
        password: userReq.password,
      },
    });
    if (!user) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }
    res.cookie("access_token", generateAccessToken(user), {
      httpOnly: true,
      signed: true,
    });
    res.status(200).send(user);
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
const getSignedInUserProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).send({ message: "User not found !" });
    }
    res.status(200).send(user);
  } catch (error) {
    req.status(500).send("Internal Server error !");
  }
};

module.exports.signUp = signUp;
module.exports.login = login;
module.exports.getSignedInUserProfile = getSignedInUserProfile;
module.exports.logout = logout;
>>>>>>> Add Service Guard Feature
