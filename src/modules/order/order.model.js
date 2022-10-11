const path = require("path");
const { DataTypes } = require("sequelize");
const sequelize = require(path.join(process.cwd(), "src/config/lib/sequelize"));
const Customer = require(path.join(process.cwd(), "src/modules/order/customer.model"));

const Order = sequelize.define(
    "orders", 
    {
        id: {
			allowNull: false,
			primaryKey: true, 
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
        customer_id: {
            allowNull: false,
            type: DataTypes.UUID
        },
        status: {
            type: DataTypes.ENUM("panding", "confirm"),
            defaultValue: "panding",
        },
        delivery_status: {
            type: DataTypes.ENUM("process pending", "processing", "success", "failed")
        },
        shipment_date: {
            type: DataTypes.DATE,
        },
        created_by: {
			type: DataTypes.UUID,
		},
		updated_by: {
			type: DataTypes.UUID,
		},
    },
    {
		tableName: "orders",
		timestamps: false,
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
    );

    Customer.hasMany(Order, { as: 'orders', foreignKey: 'customer_id' });


module.exports = Order;