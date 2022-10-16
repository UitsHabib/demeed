const path = require("path");
const User = require(path.join(process.cwd(), "src/modules/platform/user/user.model"));
const EmailService = require(path.join(process.cwd(), 'src/config/lib/email-service/email.service'));

const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(400).send("Invaild credentials");

        const options = {
            toAddresses: [email],
			//templateUrl: "src/config/lib/email-service/templates/email.handlebars",
			subject: "Forgot Password",
			data: {}
        };

        EmailService.send(options);

        res.status(201).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error.")
    };
}

module.exports = forgetPassword;