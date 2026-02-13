import {EmployeesRepository} from "../../src/domain/EmployeesRepository";
import {QuotesGateway} from "../../src/domain/QuotesGateway";
import {QuotesSender} from "../../src/domain/QuotesSender";
import {Random} from "../../src/domain/Random";
import {InspirationService} from "../../src/application/InspirationService";
import {Employee} from "../../src/domain/Employee";
import {Quote} from "../../src/domain/Quote";
import {InvalidWordException} from "../../src/domain/InvalidWordException";

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
        employeeRepository.getAll.mockResolvedValueOnce([
            employee("juan", "666777888"),
            employee("pepe", "663774812")
        ]);
        quotesGateway.findQuotesByWord.mockResolvedValueOnce([
            quote("En un lugar de la mancha...", "Cervantes"),
            quote("el que a buen árbol...", "Anónimo Garcia"),
        ]);
        random.nextInt.mockReturnValueOnce(1).mockReturnValueOnce(0);

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

    function employee(name: string, phoneNumber: string) {
        return new Employee(name, phoneNumber);
    }

    function quote(text: string, author: string) {
        return new Quote(text, author);
    }
});