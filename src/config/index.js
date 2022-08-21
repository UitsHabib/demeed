const path = require("path");
function getGlobalConfig() {
  const assets = require(path.join(process.cwd(), "src/assets/default.js"));

  const config = {
    routes: assets.routes,
  };
  
  return config;
}

module.exports.getGlobalConfig = getGlobalConfig;
