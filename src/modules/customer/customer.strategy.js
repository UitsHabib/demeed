const path = require("path");
const passport = require("passport");
const { Strategy } = require("passport-jwt");
const Customer = require(path.join(process.cwd(), "src/modules/customer/customer.model"));
const nodeCache = require(path.join(process.cwd(), "src/config/lib/nodecache"));

module.exports = () => {
	function cookieExtractor(req) {
		let token = null;
		if (req && req.signedCookies) {
			token = req.signedCookies["access_token"];
		}
		return token;
	}

	passport.use(
		"customer-jwt",
		new Strategy({ secretOrKey: nodeCache.getValue("TOKEN_SECRET"), jwtFromRequest: cookieExtractor }, function (payload, done) {
			Customer.findOne({
				where: {
					id: payload.id,
				},
			}).then((customer) => {
				if (customer) {
					return done(null, customer);
				}

				return done(null, false);
			});
		})
	);
};
