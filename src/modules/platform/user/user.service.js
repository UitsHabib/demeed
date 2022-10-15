const path = require("path");
const jwt = require("jsonwebtoken");
const nodeCache = require(path.join(process.cwd(), "src/config/lib/nodecache"));

const generateAccessToken = (user) => {
	const access_token = jwt.sign(
		{
			id: user.id,
		},
		nodeCache.getValue("TOKEN_SECRET"),
		{
			expiresIn: "1h",
			issuer: user.id.toString(),
		}
	);

	return access_token;
};

module.exports.generateAccessToken = generateAccessToken;
