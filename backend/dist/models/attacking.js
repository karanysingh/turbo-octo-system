"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const Defending = db_1.DbConnector.getClient().define("Attacking", {
    firstName: {
        type: sequelize_1.DataTypes.BIGINT,
    },
    club: {
        type: sequelize_1.DataTypes.STRING,
    },
    position: {
        type: sequelize_1.DataTypes.STRING,
    },
    assists: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    corner_taken: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    offsides: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    dribbles: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    match_played: {
        type: sequelize_1.DataTypes.NUMBER,
    },
}, {
    freezeTableName: true,
});
exports.default = Defending;
