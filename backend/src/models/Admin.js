// models/Admin.js
import {DataTypes} from "sequelize"
import {sequelize} from "../config/database.js"

const Admin = sequelize.define(
	"Admin",
	{
		id_admin: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{
		tableName: "Admins",
		timestamps: true,
	}
)

export default Admin
