const getGlobalConfig = () => {
    const assets = require("./assets/default");

    const config = {
        routes: assets.routes,
    };

    return config;
};

module.exports.getGlobalConfig = getGlobalConfig;