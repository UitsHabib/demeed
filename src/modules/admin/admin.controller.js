const Admin = require("./admin.model.js");
const jwt = require("jsonwebtoken");

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

// function for singin in admin dashboard
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
    if (user) {
      // create a token and send it
      const access_token = jwt.sign(
        { id: user.id, email: user.email },
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
      user.dataValues.token = access_token;
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  }
  function error(err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
  promise.then(success).catch(error);
};
// logout function
const logout = (req, res) => {
  res.clearCookie("access_token");
  res.send({ message: "Logout Successful !" });
};

// get signed user profile
const getSignedInUserProfile = (req, res) => {
  const token = req.signedCookies["access_token"];
  if (!token) {
    res.status(400).send({ message: "Bad request !" });
  }
  const payload = jwt.verify(token, "jwt-secret");
  const { id } = payload;
  const promise = Admin.findOne({ where: { id } });
  function success(user) {
    if (!user) {
      res.status(404).send({ message: "User not found !" });
    } else {
      res.status(200).send(user);
    }
  }
  function error(err) {
    req.status(500).send({ message: "Internal Server error !" });
  }
  promise.then(success).catch(error);
};

module.exports.signUp = signUp;
module.exports.login = login;
module.exports.getSignedInUserProfile = getSignedInUserProfile;
module.exports.logout = logout;
