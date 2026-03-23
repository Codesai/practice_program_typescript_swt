export class DbConnectionOptions {
    readonly host: string;
    readonly user: string;
    readonly password: string;
    readonly database: string;
    readonly port: number;

    constructor(host: string, user: string, password: string, database: string, port: number) {
        validate(host, port, user, password, database);
        this.host = host;
        this.port = port;
        this.user = user;
        this.password = password;
        this.database = database;
    }
}

function validatePort(port: number) {
    if (!Number.isInteger(port) || port < 0) {
        throw new Error('Host cannot be null or empty');
    }
}

function validate(host: string, port: number, user: string, password: string, database: string): void {
    validateHost(host);
    validatePort(port);
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