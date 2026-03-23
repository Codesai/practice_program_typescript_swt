import {EmployeesRepository, EmptyEmployeesError} from "../domain/EmployeesRepository";
import {EmptyQuotesError, QuotesGateway} from "../domain/QuotesGateway";
import {QuotesSender} from "../domain/QuotesSender";
import {Random} from "../domain/Random";
import {Quote} from "../domain/Quote";
import {Employee} from "../domain/Employee";
import {ForInspiring, InvalidWordError} from "../domain/ForInspiring";

export class InspirationService implements ForInspiring {
    private readonly employeesRepository: EmployeesRepository;
    private readonly quotesGateway: QuotesGateway;
    private readonly quotesSender: QuotesSender;
    private readonly random: Random;

    constructor(
        employeesRepository: EmployeesRepository,
        quotesGateway: QuotesGateway,
        quotesSender: QuotesSender,
        random: Random
    ) {
        this.employeesRepository = employeesRepository;
        this.quotesGateway = quotesGateway;
        this.quotesSender = quotesSender;
        this.random = random;
    }

    async inspireSomeone(word: string): Promise<void> {
        this.throwExceptionIfIsInvalidWord(word);
        const quotes = await this.quotesGateway.findQuotesByWord(word);
        if (quotes.length === 0) {
            throw new EmptyQuotesError();
        }

        const employees = await this.employeesRepository.getAll();
        if (employees.length === 0) {
            throw new EmptyEmployeesError();
        }

        const selectedQuote = this.selectRandomQuote(quotes);
        const selectedEmployee = this.selectRandomEmployee(employees);

        await this.quotesSender.send(selectedEmployee, selectedQuote);
    }

    private throwExceptionIfIsInvalidWord(word: string): void {
        const specialCharacters = /['{}[\]&€]/;
        if (word === '' || word === null || specialCharacters.test(word)) {
            throw new InvalidWordError(`"${word}" is invalid`);
        }
    }

    private selectRandomEmployee(employees: Employee[]): Employee {
        return employees[this.random.nextInt(employees.length)];
    }

    private selectRandomQuote(quotes: Quote[]): Quote {
        return quotes[this.random.nextInt(quotes.length)];
    }
}