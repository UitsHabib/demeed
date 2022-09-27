const jwt = require("jsonwebtoken");
const generateAccessToken = (user) => {
  // create access token and send it
  const access_token = jwt.sign({ id: user.id }, "merchant-secret", {
    expiresIn: "1h",
    issuer: user.id.toString(),
  });
  return access_token;
};

module.exports.generateAccessToken = generateAccessToken;
