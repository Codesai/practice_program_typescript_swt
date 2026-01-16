import {Employee} from "./Employee";

export interface EmployeesRepository {
    getAll(): Promise<Employee[]>;
}

export class GettingEmployeesError implements Error {
    message: string;
    name: string;
}