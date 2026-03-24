import {MariaDbEmployeesRepository} from "../../../../src/infrastructure/persistence/MariaDbEmployeesRepository";
import {DbConnectionOptions} from "../../../../src/infrastructure/persistence/DbConnectionOptions";
import {EmployeesRepository} from "../../../../src/domain/EmployeesRepository";
import {employeesInDb} from "./helpers/EmployeesInDb";
import {DatabaseConnection} from "./setup/DatabaseConnection";

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

    test.todo('tests should be implemented');

});