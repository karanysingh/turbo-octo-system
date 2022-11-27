import { Sequelize } from "sequelize"

export class DbConnector {
    private static readonly uri = process.env.DB_URI
    private static client: Sequelize

    private constructor(){

    }

    public static getClient() {
        if (!this.client) {
            this.client = new Sequelize("UEFA", "root", "", {
                host: "127.0.0.1",
                dialect: "mysql",
                port:4000
            }, 
            )
        }
        return this.client
    }    
}