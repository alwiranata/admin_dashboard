import {Sequelize} from "sequelize"

const sequelize = new Sequelize("admin_dashboard", "root", "", {
	host: "localhost",
	dialect: "mysql",
	logging: false,
})

export {sequelize}
