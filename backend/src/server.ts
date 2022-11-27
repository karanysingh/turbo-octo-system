import express from "express"
import {uefaController} from "./controller/uefaController"

export class Server {
    private readonly app = express()
    private PORT: Number

    constructor(port: Number) {
        this.PORT = port
        this.addGlobalMiddleware();
        this.initiateRoutes();
    }

    private addGlobalMiddleware() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }

    private initiateRoutes() {
        this.app.use("/api/v1/uefa", uefaController)

    }

    public start() {
        this.app.listen(this.PORT, () => {
            console.log(`Server is running on port ${this.PORT}`)
        })
    }
}