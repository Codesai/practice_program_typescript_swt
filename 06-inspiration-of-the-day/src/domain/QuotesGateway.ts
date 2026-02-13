import {Quote} from "./Quote";

export interface QuotesGateway {
    findQuotesByWord(word: string): Promise<Quote[]>;
}

export class RetrievingQuotesError implements Error {
    message: string;
    name: string;

    constructor(message: string) {
        this.message = message;
    }
}
