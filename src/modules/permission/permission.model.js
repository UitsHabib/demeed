const path = require("path");
const Service = require("../service/service.model") 
const sequelize = require(path.join(
  process.cwd(),
  "/src/config/lib/sequelize.js"
));


const { DataTypes } = require("sequelize");

const Permission = sequelize.define(
  "permissions",
  {
    id: {
      allowNull: false,
      // type: DataTypes.UUID,
      // defaultValue: DataTypes.UUIDV4,
    
      primaryKey: true,
      type:DataTypes.INTEGER,
      autoIncrement:true
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    service_id: {
      type: DataTypes.INTEGER,
    },
  },

  {
    tableName: "permissions",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Service.hasMany(Permission,{foreignKey:"service_id"});  
Permission.belongsTo(Service,{foreignKey:"service_id"});
  
module.exports = Permission;