const { DataTypes } = require("sequelize")
const sequelize=require("../../config/lib/sequelize")
const Admin=sequelize.define("admins",{
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    }
},
{tableName: "admins",
timestamps: false,
createdAt: "created_at",
updatedAt: "updated_at"})

module.exports=Admin