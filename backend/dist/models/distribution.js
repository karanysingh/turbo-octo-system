"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const Distribution = db_1.DbConnector.getClient().define("Distribution", {
    player_id: {
        type: sequelize_1.DataTypes.BIGINT,
    },
    club: {
        type: sequelize_1.DataTypes.STRING,
    },
    position: {
        type: sequelize_1.DataTypes.STRING,
    },
    pass_accuracy: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    pass_attempted: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    pass_completed: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    cross_accuracy: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    cross_attempted: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    cross_completed: {
        type: sequelize_1.DataTypes.NUMBER,
    },
}, {
    freezeTableName: true,
});
exports.default = Distribution;
