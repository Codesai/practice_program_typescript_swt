import {Employee} from "../../domain/Employee";
import {EmployeesRepository, GettingEmployeesError} from "../../domain/EmployeesRepository";
import {DbConnectionOptions} from "./DbConnectionOptions";
import {Connection, createConnection} from "mariadb";

export class MariaDbEmployeesRepository implements EmployeesRepository {
    private readonly dbConnectionOptions: DbConnectionOptions;

    constructor(dbConnectionOptions: DbConnectionOptions) {
        this.dbConnectionOptions = dbConnectionOptions;
    }

    async getAll(): Promise<Employee[]> {
        let connection: Connection | undefined
        try {
            connection = await createConnection(this.dbConnectionOptions);
            const rows = await connection.query<EmployeeData[]>("SELECT name, phone FROM employees " + this.buildWhere());
            return rows.map(row => new Employee(row.name, row.phone));
        } catch (error) {
            throw new GettingEmployeesError();
        } finally {
            await connection?.end();
        }
    }

    private buildWhere() {
        const retiredValue = false;
        const internValue = false;
        return `WHERE retired=${retiredValue} AND intern=${internValue}`;
    }
}

class EmployeeData {
    name: string;
    phone: string;
}