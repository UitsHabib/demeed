module.exports.start = async () => {
    const app = require('./express')();
    const server = require('./sequelize');
    require('dotenv').config();

    const PORT = process.env.SERVER_PORT || 4000;

    try {
        await server.sync({force: false})
    } catch (error) {
        console.log(error);
    }

    app.listen(PORT, ()=>{
        console.log('Server is running on port %s', PORT);
    });
}