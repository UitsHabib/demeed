const Merchant = require("./merchant.model");
const { generateAccessToken } = require("./merchant.service");

// function for merchant sign up.
const signUp = async (req, res) => {
  try {
    const { fullName, merchantAge, email, password } = req.body;
    const [merchant, created] = await Merchant.findOrCreate({
      where: { email: email },
      defaults: {
        fullName: fullName,
        merchantAge: merchantAge,
        email: email,
        password: password,
      },
    });
    if (!created) {
      res.status(409).send({ message: "Merchant exists with this email" });
    } else {
      res.status(201).send({ message: "Signup successfully ", data: merchant });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
// function for merchant login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const merchant = await Merchant.findOne({
      where: { email: email, password: password },
    });
    if (!merchant) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }
    res.cookie("access_token", generateAccessToken(merchant), {
      httpOnly: true,
      signed: true,
    });
    console.log(req);
    res.status(200).send(merchant);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const getMerchantProfile = async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
module.exports.signUp = signUp;
module.exports.login = login;
module.exports.getMerchantProfile = getMerchantProfile;
