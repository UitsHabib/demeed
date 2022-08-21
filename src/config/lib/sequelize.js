const {Sequelize} = require('sequelize');
const sequelize = new Sequelize("demeed","root","",{
    host:"localhost",
    dialect:"mysql"
})

module.exports = sequelize;