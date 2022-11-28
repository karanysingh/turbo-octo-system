import { config as envConfig } from "dotenv";
envConfig();

import { Server } from "./server";
import { DbConnector } from "./config/db";

const server = new Server(8081);

const dbClient = DbConnector.getClient();
dbClient.authenticate().then(() => {
  console.log("connected to database");
  server.start()
}).catch((err) => {
    console.log("error connecting to database", err);
});
