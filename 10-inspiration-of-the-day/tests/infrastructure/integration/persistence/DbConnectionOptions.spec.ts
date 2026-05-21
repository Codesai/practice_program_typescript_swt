import {DbConnectionOptions} from "../../../../src/infrastructure/persistence/DbConnectionOptions";

describe('DbConnectionOptions', () => {

    it.each([
        [{ host: "", user: "user", password: "pass", database: "db", port: 120 }, 'Host cannot be null or empty'],
        [{ host: null, user: "user", password: "pass", database: "db", port: 0 }, 'Host cannot be null or empty'],
        [{ host: "host", user: "user", password: "pass", database: "db", port: 1.20 }, 'Port should be an integer greater than 0'],
        [{ host: "host", user: "user", password: "pass", database: "db", port: 0 }, 'Port should be an integer greater than 0'],
        [{ host: "host", user: "", password: "pass", database: "db", port: 80 }, 'User cannot be null or empty'],
        [{ host: "host", user: null, password: "pass", database: "db", port: 80 }, 'User cannot be null or empty'],
        [{ host: "host", user: "user", password: "", database: "db", port: 80 }, 'Password cannot be null or empty'],
        [{ host: "host", user: "user", password: null, database: "db", port: 80 }, 'Password cannot be null or empty'],
        [{ host: "host", user: "user", password: "pass", database: "", port: 120 }, 'Database cannot be null or empty'],
        [{ host: "host", user: "user", password: "pass", database: null, port: 120 }, 'Database cannot be null or empty'],
    ])('Invalid parameters', ({ host, user, password, database, port }: { host: string, user: string, password: string, database: string, port: number }, error: string) => {
        expect(() => new DbConnectionOptions(host, user, password, database, port)).toThrow(new Error(error));
    });

    it('valid connection parameters', () => {
        expect(() => new DbConnectionOptions("host", "user", "password", "database", 1)).not.toThrow();
    })
});