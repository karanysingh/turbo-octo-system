"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const Goals = db_1.DbConnector.getClient().define("Goals", {
    player_id: {
        type: sequelize_1.DataTypes.BIGINT,
    },
    club: {
        type: sequelize_1.DataTypes.STRING,
    },
    position: {
        type: sequelize_1.DataTypes.STRING,
    },
    goals: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    right_foot: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    left_foot: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    headers: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    others: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    inside_area: {
        type: sequelize_1.DataTypes.NUMBER,
    },
}, {
    freezeTableName: true,
});
exports.default = Goals;
