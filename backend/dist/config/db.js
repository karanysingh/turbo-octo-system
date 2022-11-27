"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnector = void 0;
const sequelize_1 = require("sequelize");
class DbConnector {
    constructor() {
    }
    static getClient() {
        if (!this.client) {
            this.client = new sequelize_1.Sequelize("UEFA", "root", "", {
                host: "127.0.0.1",
                dialect: "mysql",
                port: 4000
            });
        }
        return this.client;
    }
}
exports.DbConnector = DbConnector;
DbConnector.uri = process.env.DB_URI;
