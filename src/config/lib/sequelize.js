const {Sequelize}=require("sequelize");

const sequelize=new Sequelize("blog","root","",{
    host:"localhost",
    dialect:"mysql",
    sync:true,
    logging:false
});

module.exports = sequelize;