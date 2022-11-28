"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const Defending = db_1.DbConnector.getClient().define("Defending", {
    player_id: {
        type: sequelize_1.DataTypes.BIGINT,
    },
    club: {
        type: sequelize_1.DataTypes.STRING,
    },
    position: {
        type: sequelize_1.DataTypes.STRING,
    },
    balls_recoverd: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    tackles: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    t_won: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    t_lost: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    clearance_attempted: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    match_played: {
        type: sequelize_1.DataTypes.NUMBER,
    },
}, {
    freezeTableName: true,
});
exports.default = Defending;
