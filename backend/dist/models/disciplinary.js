"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const Disciplinary = db_1.DbConnector.getClient().define("Disciplinary", {
    player_id: {
        type: sequelize_1.DataTypes.BIGINT,
    },
    club: {
        type: sequelize_1.DataTypes.STRING,
    },
    position: {
        type: sequelize_1.DataTypes.STRING,
    },
    fouls_committed: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    fouls_suffered: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    red: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    yellow: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    minutes_played: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    match_played: {
        type: sequelize_1.DataTypes.NUMBER,
    },
}, {
    underscored: true,
    freezeTableName: true,
});
exports.default = Disciplinary;
