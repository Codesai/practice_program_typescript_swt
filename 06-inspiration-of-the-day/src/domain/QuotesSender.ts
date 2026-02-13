import {Employee} from "./Employee";
import {Quote} from "./Quote";

export interface QuotesSender {
    send(employee: Employee, quote: Quote): Promise<void>;
}

export class SendingQuoteError implements Error {
    readonly error: Error;
    message: string;
    name: string;

    constructor(message: string, error: Error) {
        this.message = message;
        this.error = error;

    }
}