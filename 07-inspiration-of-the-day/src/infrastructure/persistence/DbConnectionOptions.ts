export class DbConnectionOptions {
    readonly host: string;
    readonly user: string;
    readonly password: string;
    readonly database: string;

    constructor(host: string, user: string, password: string, database: string) {
        validate(host, user, password, database);
        this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;
    }
}

function validate(host: string, user: string, password: string, database: string): void {
    validateHost(host);
    validateUser(user);
    validatePassword(password);
    validateDatabase(database);
}

function validateHost(host: string): void {
    if (!host || host.trim() === '') {
        throw new Error('Host cannot be null or empty');
    }
}

function validateUser(user: string): void {
    if (!user || user.trim() === '') {
        throw new Error('User cannot be null or empty');
    }
}

function validatePassword(password: string): void {
    if (!password || password.trim() === '') {
        throw new Error('Password cannot be null or empty');
    }
}

function validateDatabase(database: string): void {
    if (!database || database.trim() === '') {
        throw new Error('Database cannot be null or empty');
    }
}