import {Quote} from "./Quote";

export interface QuotesGateway {
    findQuotesByWord(word: string): Promise<Quote[]>;
}

export class RetrievingQuotesError implements Error {
    constructor(message: string) {
        this.message = message;
    }

    message: string;
    name: string;
}
