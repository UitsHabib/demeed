const path = require("path");
const User = require(path.join(process.cwd(), "src/modules/platform/user/user.model"));
const EmailService = require(path.join(process.cwd(), 'src/config/lib/email-service/email.service'));

const forgotPassword = async (req, res) => {
    try{
        const { email } = req.body;
     
        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(400).send("Invalid credentials.");
        
        const options = {
			toAddresses: [email],
			//templateUrl: "src/config/lib/email-service/templates/email.handlebars",
			subject: "Forgot Password",
			data: {},
		};

		EmailService.send(options);

        return res.status(200).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error.")
    }
};

module.exports = forgotPassword;