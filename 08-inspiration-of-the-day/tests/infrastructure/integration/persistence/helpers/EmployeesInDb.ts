import {Connection} from "mariadb";

export function getEmployeesInDb(connection: Connection): EmployeesInDb {
    return new EmployeesInDb(connection);
}

export class EmployeesInDb {

    private readonly connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    async add({name, phone, retired, intern}: {
        name: string,
        phone: string,
        retired: boolean,
        intern: boolean
    }): Promise<void> {
        await this.connection.query("INSERT INTO employees(name, phone, retired, intern)\n" +
            "VALUES (?, ?, ?, ?);", [name, phone, retired, intern]);
    }

    async drop(): Promise<void> {
        await this.connection.query("DELETE FROM employees;");
    }
}