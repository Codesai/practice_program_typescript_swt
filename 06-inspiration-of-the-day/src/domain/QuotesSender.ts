import {Employee} from "./Employee";
import {Quote} from "./Quote";

export interface QuotesSender {
    send(employee: Employee, quote: Quote): Promise<void>;
}

export class SendingQuoteError implements Error {
    readonly error: Error;

    constructor(message: string, error: Error) {
        this.message = message;
        this.error = error;

    }

    message: string;
    name: string;
}