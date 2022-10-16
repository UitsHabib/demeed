const path = require("path");
const User = require(path.join(process.cwd(), "src/modules/platform/user/user.model"));
const EmailService = require(path.join(process.cwd(), 'src/config/lib/email-service/email.service'));

const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [ user, created ] = await User.findOrCreate({
            where: { email },
            defaults: { email, password, created_by: req.user.id, updated_by: req.user.id }
        });

        if(!created) return res.status(400).send("User is already created.");

		const options = {
			toAddresses: [email],
			// templateUrl: "src/config/lib/email-service/templates/email.handlebars",
			subject: "Registration Confirmation",
			data: {},
		};

		EmailService.send(options);

        return res.status(201).send(user);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    };

    module.exports = createUser;
};