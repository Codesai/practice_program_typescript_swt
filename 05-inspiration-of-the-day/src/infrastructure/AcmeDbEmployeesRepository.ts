import {Employee} from "../domain/Employee";
import {EmployeesRepository} from "../domain/EmployeesRepository";
import mysql, {ConnectionOptions, RowDataPacket} from "mysql2/promise";

export class AcmeDbEmployeesRepository implements EmployeesRepository {
    private readonly connectionConfig: ConnectionOptions;

    constructor(connectionConfig: ConnectionOptions) {
        this.connectionConfig = connectionConfig;
    }

    async getAll(): Promise<Employee[]> {
        const connection = await mysql.createConnection(this.connectionConfig);
        try {
            const [rows] = await connection.execute<RowDataPacket[]>("SELECT name, phone FROM employees");
            return rows.map(row => new Employee(row.name, row.phone));
        } finally {
            connection.end();
        }
    }
}
