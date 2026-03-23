import {DatabaseConnection} from "../setup/DatabaseConnection";

export function employeesInDb(): EmployeesInDb {
    return new EmployeesInDb();
}

class EmployeesInDb {

    async addEmployee({name, phone}: {
        name: string,
        phone: string
    }): Promise<void> {
        await this.add({name, phone, retired: false, intern: false});
    };

    async addRetired({name, phone}: {
        name: string,
        phone: string
    }): Promise<void> {
        await this.add({name, phone, retired: true, intern: false});
    };

    async addIntern({name, phone}: {
        name: string,
        phone: string
    }): Promise<void> {
        await this.add({name, phone, retired: false, intern: true});
    };

    private async add({name, phone, retired, intern}: {
        name: string,
        phone: string,
        retired: boolean,
        intern: boolean
    }): Promise<void> {
        const connection = DatabaseConnection.create();
        await connection.query("INSERT INTO employees(name, phone, retired, intern)\n" +
            "VALUES (?, ?, ?, ?);", [name, phone, retired, intern]);
    }

    async drop(): Promise<void> {
        const connection = DatabaseConnection.create();
        await connection.query("DELETE FROM employees;");
    }
}