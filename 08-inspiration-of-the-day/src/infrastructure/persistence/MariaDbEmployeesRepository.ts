import {Employee} from "../../domain/Employee";
import {EmployeesRepository, GettingEmployeesError} from "../../domain/EmployeesRepository";
import {DbConnectionOptions} from "./DbConnectionOptions";
import {createConnection} from "mariadb";

export class MariaDbEmployeesRepository implements EmployeesRepository {
    private readonly dbConnectionOptions: DbConnectionOptions;

    constructor(dbConnectionOptions: DbConnectionOptions) {
        this.dbConnectionOptions = dbConnectionOptions;
    }

    async getAll(): Promise<Employee[]> {
        const connection = await createConnection(this.dbConnectionOptions);
        try {
            const rows = await connection.query<EmployeeData[]>("SELECT name, phone FROM employees");
            return rows.map(row => new Employee(row.name, row.phone));
        } catch (error) {
            throw new GettingEmployeesError();
        } finally {
            await connection.end();
        }
    }

}

interface EmployeeData {
    name: string;
    phone: string;
}
