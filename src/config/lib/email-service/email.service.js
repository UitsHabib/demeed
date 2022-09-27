const path = require("path");
const handlebars = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");

require("dotenv").config();
const { USER_EMAIL, USER_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: USER_EMAIL,
		pass: USER_PASSWORD,
	},
});

function send(options) {
	const handlebarOptions = {
		viewEngine: {
			partialsDir: path.join(process.cwd(), options.templateUrl),
			defaultLayout: false,
		},
		viewPath: path.join(process.cwd(), options.templateUrl),
	};

	transporter.use("compile", handlebars(handlebarOptions));

	const mailOptions = {
		from: USER_EMAIL,
		to: options.toAddresses,
		subject: options.subject,
		template: "email",
		context: {
			project: "DEMEED",
		},
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			return console.log(error);
		}
		console.log("Message sent: " + info.response);
	});
}

module.exports.send = send;
