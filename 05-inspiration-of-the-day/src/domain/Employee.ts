export class Employee {
    readonly name: string;
    readonly phoneNumber: string;

    constructor(name: string, phoneNumber: string) {
        validate(name, phoneNumber);
        this.name = name;
        this.phoneNumber = phoneNumber;
    }
}

function validate(name: string, phoneNumber: string): void {
    validateName(name);
    validatePhoneNumber(phoneNumber);
}

function validateName(name: string): void {
    if (!name || name.trim() === '') {
        throw new Error('Name cannot be empty');
    }
}

function validatePhoneNumber(phoneNumber: string): void {
    const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;
    if (!phoneNumber || phoneNumber.trim() === '') {
        throw new Error('Phone number cannot be empty');
    }
    if (!PHONE_REGEX.test(phoneNumber.trim())) {
        throw new Error('Phone number must be valid');
    }
}
