const path = require("path");
const sequelize = require(path.join(process.cwd(),"/src/config/lib/sequelize.js"));
const { DataTypes } = require("sequelize");


const UserDeliveryMan = sequelize.define('user_delivery_man',{
    id:{
        allowNull:false,
        primaryKey:true,
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4

    },
    email:{

        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    }
},{
    tableName:"user_delivery_man",
    timestamps:false
})

module.exports = UserDeliveryMan;