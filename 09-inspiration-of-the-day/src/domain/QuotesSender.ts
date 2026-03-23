import {Employee} from "./Employee";
import {Quote} from "./Quote";

export interface QuotesSender {
    send(employee: Employee, quote: Quote): Promise<void>;
}

export class SendingQuoteError extends Error {
    private _error: Error;

    constructor(message: string, error: Error) {
        super(message);
        this._error = error;
    }
}