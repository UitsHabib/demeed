const {Sequelize} = require('sequelize');
const sequelize = new Sequelize("demeed","root","",{
    host:"localhost",
    dialect:"mysql",
    logging: false,
    sync: true
})

module.exports = sequelize;