const { getServices } = require("./service.controller");

module.exports = (app) => {
    app.get("/api/services", getServices);
};