const path = require("path");
const User = require(path.join(process.cwd(), "src/modules/platform/user/user.model"));
const Profile = require(path.join(process.cwd(), "src/modules/platform/profile/profile.model"));

const getCustomerList = async (req, res) => {
	try {
		const customers = await User.findAll({
			include: [
				{
					model: Profile,
					as: "profile",
					where: {
						title: "Customer",
					},
				},
			],
		});

		res.status(200).send(customers);
	} catch (err) {
		console.log(err);

		res.status(500).send("Internal server error.");
	}
};

module.exports = getCustomerList;
