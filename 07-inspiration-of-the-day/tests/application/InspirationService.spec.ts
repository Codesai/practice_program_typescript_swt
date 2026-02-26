import {EmployeesRepository, GettingEmployeesError} from "../../src/domain/EmployeesRepository";
import {QuotesGateway, RetrievingQuotesError} from "../../src/domain/QuotesGateway";
import {QuotesSender, SendingQuoteError} from "../../src/domain/QuotesSender";
import {Random} from "../../src/domain/Random";
import {InspirationService} from "../../src/application/InspirationService";
import {Employee} from "../../src/domain/Employee";
import {Quote} from "../../src/domain/Quote";
import {InvalidWordException} from "../../src/domain/InvalidWordException";
import {EmptyQuotesException} from "../../src/domain/EmptyQuotesException";
import {EmptyEmployeesException} from "../../src/domain/EmptyEmployeesException";

describe('InspirationService', () => {
    let inspirationService: InspirationService;
    let employeeRepository: jest.Mocked<EmployeesRepository>;
    let quotesGateway: jest.Mocked<QuotesGateway>;
    let quotesSender: jest.Mocked<QuotesSender>;
    let random: jest.Mocked<Random>;

    beforeEach(() => {
        employeeRepository = {getAll: jest.fn()};
        quotesGateway = {findQuotesByWord: jest.fn()}
        quotesSender = {send: jest.fn()}
        random = {nextInt: jest.fn()}
        inspirationService = new InspirationService(employeeRepository, quotesGateway, quotesSender, random)
    });

    it('should send an inspiration quote to an employee', async () => {
        random.nextInt.mockReturnValueOnce(1).mockReturnValueOnce(0);
        employeeRepository.getAll.mockResolvedValueOnce([
            employee("juan", "666777888"),
            employee("pepe", "663774812")
        ]);
        quotesGateway.findQuotesByWord.mockResolvedValueOnce([
            quote("En un lugar de la mancha...", "Cervantes"),
            quote("el que a buen árbol...", "Anónimo Garcia"),
        ]);

        await inspirationService.inspireSomeone("awesome");

        expect(quotesSender.send).toHaveBeenCalledWith(
            employee("juan", "666777888"),
            quote("el que a buen árbol...", "Anónimo Garcia")
        );
    });

    it.each(
        ['', null, "'", "{", "}", "[", "}", "[", "[", "&", "€"]
    )
    ('should throw an exception informing the user when called with an invalid word ("%s")',
        async (invalidWord: string) => {
            await expect(inspirationService.inspireSomeone(invalidWord))
                .rejects.toThrow(InvalidWordException);
        }
    );

    it('should throw an exception when quotes gateway returns an empty list', async () => {
        employeeRepository.getAll.mockResolvedValueOnce([
            employee("juan", "666777888")
        ]);
        quotesGateway.findQuotesByWord.mockResolvedValueOnce([]);

        await expect(inspirationService.inspireSomeone("awesome"))
            .rejects.toThrow(EmptyQuotesException);
    });

    it('should throw an exception when quotes gateway fails', async () => {
        employeeRepository.getAll.mockResolvedValueOnce([
            employee("juan", "666777888")
        ]);
        quotesGateway.findQuotesByWord.mockImplementation(() => {
            throw new RetrievingQuotesError("error")
        });

        await expect(inspirationService.inspireSomeone("awesome"))
            .rejects.toThrow(RetrievingQuotesError);
    });

    it('should throw an exception when employees repository returns an empty list', async () => {
        employeeRepository.getAll.mockResolvedValueOnce([]);
        quotesGateway.findQuotesByWord.mockResolvedValueOnce([
            quote("En un lugar de la mancha...", "Cervantes"),
        ]);

        await expect(inspirationService.inspireSomeone("awesome"))
            .rejects.toThrow(EmptyEmployeesException);
    })

    it('should throw an exception when employees repository fails', async () => {
        employeeRepository.getAll.mockImplementation(() => {
            throw new GettingEmployeesError()
        });
        quotesGateway.findQuotesByWord.mockResolvedValueOnce([
            quote("En un lugar de la mancha...", "Cervantes"),
        ]);

        await expect(inspirationService.inspireSomeone("awesome"))
            .rejects.toThrow(GettingEmployeesError);
    });

    it('should throw an exception when quotes sender fails', async () => {
        random.nextInt.mockReturnValue(1);
        employeeRepository.getAll.mockResolvedValueOnce([
            employee("juan", "666777888")
        ]);
        quotesGateway.findQuotesByWord.mockResolvedValueOnce([
            quote("En un lugar de la mancha...", "Cervantes")
        ]);
        quotesSender.send.mockImplementation(() => {
            throw new SendingQuoteError('error', new Error());
        });

        await expect(inspirationService.inspireSomeone("awesome"))
            .rejects.toThrow(SendingQuoteError);
    });

    function employee(name: string, phoneNumber: string) {
        return new Employee(name, phoneNumber);
    }

    function quote(text: string, author: string) {
        return new Quote(text, author);
    }
});