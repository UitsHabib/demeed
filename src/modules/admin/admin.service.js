const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    const access_token = jwt.sign({ id: user.id }, "zoha", {
        expiresIn: "1h",
        issuer: user.id.toString()
    });

    return access_token;
};


module.exports.generateAccessToken = generateAccessToken;