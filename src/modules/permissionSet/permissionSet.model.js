const path = require("path");

const sequelize = require(path.join(
  process.cwd(),
  "/src/config/lib/sequelize.js"
));


const { DataTypes } = require("sequelize");

const Permission = sequelize.define(
  "permissions-sets",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    role: {
      type: DataTypes.STRING,
    },
    
    permission_id: {
      type: DataTypes.STRING,
    },

    service_id: {
      type: DataTypes.STRING,
    },
    
  },
  
  {
    tableName: "permissions-sets",
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = Permission;