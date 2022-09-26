const Merchant = require("./merchant.model");
const { generateAccessToken } = require("./merchant.service");

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [merchant, created] = await Merchant.findOrCreate({
      where: { email },
      defaults: { email, password },
    });

    if (!created) {
      res.status(409).send("Merchant already exists.");
    }

    res.status(201).json(merchant);
  } catch (err) {
    res.status(500).send("Internal sever error.");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const merchant = {
      email,
      password,
    };

    const findMerchant = await Merchant.findOne({
      where: {
        email: merchant.email,
        password: merchant.password,
      },
    });

    if (!findMerchant) {
      res.status(404).send("Invaild credentials.");
    }

    res.cookie("access_token", generateAccessToken(findMerchant), {
      httpOnly: true,
      signed: true,
    });
    res.status(200).json(findMerchant);
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
};

const getLoginProfile = (req, res) => {
  const token = req.signedCookies["access_token"];
  if (!token) {
    res.status(400).send("Bad Request.");
  }
  const payload = jwt.verify(token, "jwt-secret");
  const { id } = payload;

  const promise = Merchant.findOne({ where: { id } });

  const success = (merchant) => {
    if (merchant) {
      res.status(200).json(merchant);
    } else {
      res.status(404).send("Merchent not found.");
    }
  };

  const error = (err) => {
    console.log(err);
    res.status(500).send("Internal server error.");
  };

  promise.then(success).catch(error);
};

const logout = (req, res) => {
  res.clearCookie("access_token");
  res.send("logged out.");
};

module.exports.signUp = signUp;
module.exports.login = login;
module.exports.getLoginProfile = getLoginProfile;
module.exports.logout = logout;
