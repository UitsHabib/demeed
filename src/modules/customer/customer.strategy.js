const path = require("path");
const passport = require("passport");
const { Strategy } = require("passport-jwt");
const User = require(path.join(process.cwd(), "src/modules/platform/user/user.model"));
const Profile = require(path.join(process.cwd(), "src/modules/platform/profile/profile.model"));
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
			User.findOne({
				where: {
					id: payload.id,
				},
				include: [
					{
						model: Profile,
						as: "profile",
						where: {
							title: "Customer",
						},
					},
				],
			}).then((user) => {
				if (user) {
					return done(null, user);
				}

				return done(null, false);
			});
		})
	);
};
