const path = require("path");
const handlebars = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const nodeCache = require(path.join(process.cwd(), "src/config/lib/nodecache"));

const USER_EMAIL = nodeCache.getValue("USER_EMAIL");
const USER_PASSWORD = nodeCache.getValue("USER_PASSWORD");

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: USER_EMAIL,
		pass: USER_PASSWORD,
	},
});

function send(options) {
	try {
		const handlebarOptions = {
			viewEngine: {
				partialsDir: path.join(path.resolve(options.templateUrl)),
				defaultLayout: false,
			},
			viewPath: path.join(path.resolve(options.templateUrl)),
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
	} catch (error) {
		console.log(error);
	}
}

module.exports.send = send;
