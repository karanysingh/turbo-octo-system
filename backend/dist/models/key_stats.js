"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const Key_stats = db_1.DbConnector.getClient().define("Key_stats", {
    player_id: {
        type: sequelize_1.DataTypes.BIGINT,
    },
    club: {
        type: sequelize_1.DataTypes.STRING,
    },
    position: {
        type: sequelize_1.DataTypes.STRING,
    },
    minutes_played: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    match_played: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    goals: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    assists: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    distance_covered: {
        type: sequelize_1.DataTypes.NUMBER,
    },
}, {
    freezeTableName: true,
});
exports.default = Key_stats;
