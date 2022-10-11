const path = require("path");
const handlebars = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");

require("dotenv").config();
const { EMAIL_ADDRESS, EMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: EMAIL_ADDRESS,
		pass: EMAIL_PASSWORD,
	},
});

function sendMail(receiver) {
	const handlebarOptions = {
		viewEngine: {
			partialsDir: path.join(process.cwd(), "src/views"),
			defaultLayout: false,
		},
		viewPath: path.join(process.cwd(), "src/views"),
	};

	transporter.use("compile", handlebars(handlebarOptions));

	const mailOptions = {
		from: EMAIL_ADDRESS,
		to: receiver,
		subject: "Registration Confirmation",
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

module.exports = sendMail;
