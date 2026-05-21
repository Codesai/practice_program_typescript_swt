import {Employee} from "../../src/domain/Employee";

export function employee(name: string, phoneNumber: string) {
    return new Employee(name, phoneNumber);
}