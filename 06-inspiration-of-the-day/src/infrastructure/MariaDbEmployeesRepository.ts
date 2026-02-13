import {Employee} from "../domain/Employee";
import {EmployeesRepository, GettingEmployeesError} from "../domain/EmployeesRepository";
import mysql, {RowDataPacket} from "mysql2/promise";
import {DbConnectionOptions} from "./DbConnectionOptions";

export class MariaDbEmployeesRepository implements EmployeesRepository {
    private readonly dbConnectionOptions: DbConnectionOptions;

    constructor(dbConnectionOptions: DbConnectionOptions) {
        this.dbConnectionOptions = dbConnectionOptions;
    }

    async getAll(): Promise<Employee[]> {
        const connection = await mysql.createConnection(this.dbConnectionOptions);
        try {
            const [rows] = await connection.execute<RowDataPacket[]>("SELECT name, phone FROM employees");
            return rows.map(row => new Employee(row.name, row.phone));
        } catch (error) {
            throw new GettingEmployeesError();
        } finally {
            connection.end();
        }
    }
}