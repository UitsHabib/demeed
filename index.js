const { start } = require('./src/config/lib/app');
const server = require('./src/config/lib/sequelize');

try {
    server.authenticate();
    console.log('Database Connected Successfully');
} catch (error) {
    console.log(error);
}

start();