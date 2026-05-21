import {Employee} from "./Employee";

export interface EmployeesRepository {
    getAll(): Promise<Employee[]>;
}

export class GettingEmployeesError extends Error {
}

export class EmptyEmployeesError extends Error {
}