const path = require("path");

const { generateAccessToken } = require(path.join(process.cwd(), "src/modules/platform/user/user.service"));

const Merchant = require(path.join(process.cwd(), "src/modules/merchant/merchant.model"));

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Merchant.findOne({ where: { email, password } });

        if (!user) {
            return res.status(400).send("Invalid credentials.");
        };

        res.cookie("merchant_token", generateAccessToken(user), {
            httpOnly: true,
            signed: true
        });

        res.status(200).send(user);
    } catch (error) {
        console.log(error);

        res.status(500).send("Internal server error.");
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await Merchant.findAll();

        res.status(200).send(users);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    };
};

const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [ user, created ] = await Merchant.findOrCreate({
            where: { email },
            defaults: { email, password }
        });

        if(!created) return res.status(409).send("User is already created.");

		// const options = {
		// 	toAddresses: [email],
		// 	templateUrl: "src/config/lib/email-service/templates/email.handlebars",
		// 	subject: "Registration Confirmation",
		// 	data: {},
		// };

		// EmailService.send(options);

        return res.status(201).send(user);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    };
};

module.exports.signUp = signUp;
module.exports.login = login;
module.exports.getUsers = getUsers;
