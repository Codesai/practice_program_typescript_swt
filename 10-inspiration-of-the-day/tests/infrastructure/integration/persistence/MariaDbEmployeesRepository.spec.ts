import {MariaDbEmployeesRepository} from "../../../../src/infrastructure/persistence/MariaDbEmployeesRepository";
import {DbConnectionOptions} from "../../../../src/infrastructure/persistence/DbConnectionOptions";
import {EmployeesRepository, GettingEmployeesError} from "../../../../src/domain/EmployeesRepository";
import {employeesInDb} from "./helpers/EmployeesInDb";
import {DatabaseConnection} from "./setup/DatabaseConnection";
import {employee} from "../../../helpers/employeesFactory";

describe('MariaDbEmployeesRepository', () => {
    let connection: DatabaseConnection;
    let employeesRepository: EmployeesRepository;

    beforeEach(async () => {
        connection = DatabaseConnection.create();
        const dbConfig = connection.getConfiguration();
        const dbConnectionOptions = new DbConnectionOptions(dbConfig.host, dbConfig.user, dbConfig.password, dbConfig.database, dbConfig.port);
        employeesRepository = new MariaDbEmployeesRepository(dbConnectionOptions);
        await employeesInDb().drop();
    });

    afterEach(async () => {
        await connection.close();
    });

    it('should return empty array when the company has no employees', async () => {
        const employees = await employeesRepository.getAll()

        expect(employees.length).toBe(0)
    })

    it('should return the employees to inspire', async () => {
        await employeesInDb().addEmployee({name: "Jose", phone: "666333222"})
        await employeesInDb().addIntern({name: "Jose Junior", phone: "666333223"})
        await employeesInDb().addRetired({name: "Jose Senior", phone: "666333221"})

        const employees = await employeesRepository.getAll()

        expect(employees.length).toBe(1)
        expect(employees[0]).toEqual(employee("Jose", "666333222"))
    })

    it('should throw a error when db connection fails', async () => {
        const dbConnectionOptions = new DbConnectionOptions("err", "err", "err", "err", 123);
        employeesRepository = new MariaDbEmployeesRepository(dbConnectionOptions);

        await expect(employeesRepository.getAll()).rejects.toThrow(GettingEmployeesError);
    })

});