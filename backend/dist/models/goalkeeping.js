"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const Goalkeeping = db_1.DbConnector.getClient().define("Goalkeeping", {
    player_id: {
        type: sequelize_1.DataTypes.BIGINT,
    },
    club: {
        type: sequelize_1.DataTypes.STRING,
    },
    position: {
        type: sequelize_1.DataTypes.STRING,
    },
    saved: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    conceded: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    saved_penalties: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    cleansheets: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    punches_made: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    match_played: {
        type: sequelize_1.DataTypes.NUMBER,
    },
}, {
    freezeTableName: true,
});
exports.default = Goalkeeping;
