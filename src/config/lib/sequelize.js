const {Sequelize}=require("sequelize");

const sequelize=new Sequelize("users","root","",{
    host:"localhost",
    dialect:"mysql",
    sync:true,
    logging:false
});

module.exports=sequelize;