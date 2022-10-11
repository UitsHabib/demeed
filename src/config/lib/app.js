module.exports.start = () => {
	const app = require("./express")();

	app.listen(app.get("port"), () => {
		console.log("Server running on port %s in %s mode...", app.get("port"), app.settings.env);
	});
};
