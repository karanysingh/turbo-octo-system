"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const server_1 = require("./server");
const db_1 = require("./config/db");
const server = new server_1.Server(8080);
const dbClient = db_1.DbConnector.getClient();
dbClient.authenticate().then(() => {
    console.log("connected to database");
    server.start();
}).catch((err) => {
    console.log("error connecting to database", err);
});
