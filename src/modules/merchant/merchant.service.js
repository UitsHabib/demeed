const jwt = require("jsonwebtoken");

const generateAccessToken = (merchant) => {
    const access_token = jwt.sign({ id: merchant.id }, "jwt-secret", {
      expiresIn: "1h",
      issuer: merchant.id.toString(),
    });
    return access_token;
  };
  
  module.exports.generateAccessToken = generateAccessToken;
  