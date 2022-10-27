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

async function send(options) {
	try {
		const handlebarOptions = {
			viewEngine: {
				extName: ".hbs",
				partialsDir: path.resolve(__dirname, "./templates"),
				defaultLayout: false,
			},
			viewPath: path.resolve(__dirname, "./templates"),
			extName: ".hbs"
		};

		transporter.use("compile", handlebars(handlebarOptions));

		const mailOptions = {
			from: USER_EMAIL,
			to: options.toAddresses,
			subject: options.subject,
			template: "email",
			context: options.data
		};

		await transporter.sendMail(mailOptions, function (error, info) {
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
