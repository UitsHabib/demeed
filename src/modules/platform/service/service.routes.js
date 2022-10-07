const path = require("path");
const { getService } = require(path.join(process.cwd(), "src/modules/platform/service/service.controller"));
const UserStrategy = require(path.join(process.cwd(), "src/modules/platform/user/user.authentication.middleware"));
const { Services } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.constants"));
const { ServiceGuard } = require(path.join(process.cwd(), "src/modules/core/authorization/authorization.middlewares"));

module.exports = (app) => {
    app.get("/api/services", UserStrategy, ServiceGuard([Services.MANAGE_SERVICE]), getService);
}