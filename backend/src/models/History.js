// src/models/History.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const History = sequelize.define("History", {
    id_history: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'History', 
    timestamps: true, 
});

export default History;
