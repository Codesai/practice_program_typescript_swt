import {Connection, createConnection} from "mariadb";
import {SharedState} from "./SharedState";

export class DatabaseConnection {
    private readonly host: string;
    private readonly port: number;
    private readonly database: string;
    private readonly user: string;
    private readonly password: string;
    private connection?: Connection;
    private static instance?: DatabaseConnection;

    constructor(param: { host: string; port: number; database: string; user: string; password: string }) {
        ({host: this.host, port: this.port, database: this.database, user: this.user, password: this.password} = param);
    }

    getConfiguration(): { host: string; port: number; database: string; user: string; password: string } {
        return {host: this.host, port: this.port, database: this.database, user: this.user, password: this.password};
    }

    static create(): DatabaseConnection {
        if(!DatabaseConnection.instance){
           DatabaseConnection.instance = new DatabaseConnection(SharedState.getDbConfig());
        }
        return DatabaseConnection.instance;
    }

    async close(): Promise<void> {
        if (this.connection) {
            await this.connection.end();
            this.connection = undefined;
        }
    }

    async query<T = any, V = any>(sql: string, values?: V): Promise<T> {
        const connection = await this.get();
        const result = await connection?.query(sql, values);
        return result as T;
    }

    private async get(): Promise<Connection> {
        if (!this.connection) {
            this.connection = await createConnection({
                host: this.host,
                port: this.port,
                database: this.database,
                user: this.user,
                password: this.password
            });
        }
        return this.connection;
    }
}