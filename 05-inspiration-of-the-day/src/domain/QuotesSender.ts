import {Employee} from "./Employee";
import {Quote} from "./Quote";

export interface QuotesSender {
    send(employee: Employee, quote: Quote): Promise<void>;
}
