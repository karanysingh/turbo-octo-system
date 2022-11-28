"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const Attempts = db_1.DbConnector.getClient().define("Attempts", {
    player_id: {
        type: sequelize_1.DataTypes.BIGINT,
    },
    club: {
        type: sequelize_1.DataTypes.STRING,
    },
    position: {
        type: sequelize_1.DataTypes.STRING,
    },
    total_attempts: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    on_target: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    off_target: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    blocked: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    match_played: {
        type: sequelize_1.DataTypes.NUMBER,
    },
}, {
    freezeTableName: true,
});
exports.default = Attempts;
