const app = require("./src/config/lib/app");
const sequelize = require('./src/config/lib/sequelize');

(
    async function(){
        try {
            await sequelize.authenticate();
            app.start();
        } catch (error) {
            console.log(error);
        }
    }
)()