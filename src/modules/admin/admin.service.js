const jwt = require("jsonwebtoken");
const generateAccessToken = (admin) => {
  const access_token = jwt.sign({ id: admin.id }, "jwt-secret", {
    expiresIn: "1h",
    issuer: admin.id.toString(),
  });
  return access_token;
};

module.exports.generateAccessToken = generateAccessToken;
