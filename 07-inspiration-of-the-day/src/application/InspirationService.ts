import {EmployeesRepository} from "../domain/EmployeesRepository";
import {QuotesGateway} from "../domain/QuotesGateway";
import {QuotesSender} from "../domain/QuotesSender";
import {Random} from "../domain/Random";
import {Quote} from "../domain/Quote";
import {Employee} from "../domain/Employee";
import {InvalidWordException} from "../domain/InvalidWordException";
import {ForInspiring} from "../domain/ForInspiring";
import {EmptyQuotesException} from "../domain/EmptyQuotesException";
import {EmptyEmployeesException} from "../domain/EmptyEmployeesException";

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
        this.throwExceptionIfisInvalidWord(word);
        const quotes = await this.quotesGateway.findQuotesByWord(word);
        if (quotes.length === 0) {
            throw new EmptyQuotesException();
        }

        const employees = await this.employeesRepository.getAll();
        if (employees.length === 0) {
            throw new EmptyEmployeesException();
        }

        const selectedQuote = this.selectRandomQuote(quotes);
        const selectedEmployee = this.selectRandomEmployee(employees);

        await this.quotesSender.send(selectedEmployee, selectedQuote);
    }

    private throwExceptionIfisInvalidWord(word: string) {
        const specialCharacters = /['{}[\]&€]/;
        if (word === '' || word === null || specialCharacters.test(word)) {
            throw new InvalidWordException(`"${word}" is invalid`);
        }
    }

    private selectRandomEmployee(employees: Employee[]): Employee {
        return employees[this.random.nextInt(employees.length)];
    }

    private selectRandomQuote(quotes: Quote[]): Quote {
        return quotes[this.random.nextInt(quotes.length)];
    }
}