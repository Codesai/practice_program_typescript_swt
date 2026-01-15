import {EmployeesRepository} from "../domain/EmployeesRepository";
import {QuotesGateway} from "../domain/QuotesGateway";
import {QuotesSender} from "../domain/QuotesSender";
import {Random} from "../domain/Random";
import {Quote} from "../domain/Quote";
import {Employee} from "../domain/Employee";

export class InspirationService {
    constructor(
        private employeesRepository: EmployeesRepository,
        private quotesGateway: QuotesGateway,
        private quotesSender: QuotesSender,
        private random: Random
    ) {
    }

    async inspireSomeone(word: string): Promise<void> {
        const quotes = this.quotesGateway.findQuotesByWord(word);
        if (quotes.length === 0) {
            return;
        }

        const employees = await this.employeesRepository.getAll();
        if (employees.length === 0) {
            return;
        }

        const selectedQuote = this.selectRandomQuote(quotes);
        const selectedEmployee = this.selectRandomEmployee(employees);

        await this.quotesSender.send(selectedEmployee, selectedQuote);
    }

    private selectRandomEmployee(employees: Employee[]): Employee {
        return employees[this.random.nextInt(employees.length)];
    }

    private selectRandomQuote(quotes: Quote[]): Quote {
        return quotes[this.random.nextInt(quotes.length)];
    }
}
