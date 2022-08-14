const express = require("express");
const userRouter = require("../module/user/user.routes");

module.exports = () => {
    const app = express();

    app.use(express.json());

    userRouter(app);

    return app;
}