const { createProfile } = require("./profile.controller");

module.exports = (app) => {
  app.post("/api/profiles", createProfile);
};
