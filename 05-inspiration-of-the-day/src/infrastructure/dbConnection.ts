export class DbConnection {
    readonly host: string;
    readonly user: string;
    readonly password: string;
    readonly database: string;

    constructor(host: string, user: string, password: string, database: string) {
        if (!host || host.trim() === '') {
            throw new Error('Host cannot be null or empty');
        }
        if (!user || user.trim() === '') {
            throw new Error('User cannot be null or empty');
        }
        if (!password || password.trim() === '') {
            throw new Error('Password cannot be null or empty');
        }
        if (!database || database.trim() === '') {
            throw new Error('Database cannot be null or empty');
        }
        this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;
    }
}