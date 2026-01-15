import {Employee} from "./Employee";

export interface EmployeesRepository {
    getAll(): Promise<Employee[]>;
}
