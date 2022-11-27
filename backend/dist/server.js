"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const uefaController_1 = require("./controller/uefaController");
class Server {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.PORT = port;
        this.addGlobalMiddleware();
        this.initiateRoutes();
    }
    addGlobalMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    initiateRoutes() {
        this.app.use("/api/v1/uefa", uefaController_1.uefaController);
    }
    start() {
        this.app.listen(this.PORT, () => {
            console.log(`Server is running on port ${this.PORT}`);
        });
    }
}
exports.Server = Server;
