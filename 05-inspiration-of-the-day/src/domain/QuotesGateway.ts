import {Quote} from "./Quote";

export interface QuotesGateway {
    findQuotesByWord(word: string): Quote[];
}
