const logout = (req, res) => {
	res.clearCookie("access_token");
	res.status(200).send("Logged out.");
};

module.exports = logout;