const {
    getEntities
} = require("./entity.controller");

module.exports = (app) => {
    app.get("/api/entity", getEntities);
};