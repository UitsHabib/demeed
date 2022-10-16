
const logout = (req, res) => {
	res.clearCookie("access_token");
	res.send("Logged out.");
};

module.exports = logout;