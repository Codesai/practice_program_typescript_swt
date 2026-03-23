import {Quote} from "./Quote";

export interface QuotesGateway {
    findQuotesByWord(word: string): Promise<Quote[]>;
}

export class RetrievingQuotesError extends Error {

    constructor(message: string) {
        super(message);
    }
}

export class EmptyQuotesError extends Error {
}