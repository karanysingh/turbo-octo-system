"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const Players_Info = db_1.DbConnector.getClient().define("Players_Info", {
    player_id: {
        type: sequelize_1.DataTypes.BIGINT,
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING,
    },
    club: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    underscored: true,
    freezeTableName: true,
});
exports.default = Players_Info;
