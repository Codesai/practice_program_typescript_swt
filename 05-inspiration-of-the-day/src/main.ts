import {InspirationService} from "./application/InspirationService";
import {AcmeDbEmployeesRepository} from "./infrastructure/AcmeDbEmployeesRepository";
import {AcmeLibraryQuotesGateway} from "./infrastructure/AcmeLibraryQuotesGateway";
import {SystemRandom} from "./infrastructure/SystemRandom";
import {WhatsAppQuotesSender} from "./infrastructure/WhatsAppQuotesSender";
import {WhatsAppQuotesSenderConfig} from "./infrastructure/WhatsAppQuotesSenderConfig";
import {DbConnection} from "./infrastructure/dbConnection";

const employeesRepository = new AcmeDbEmployeesRepository(
    new DbConnection(
        process.env.DB_HOST || 'localhost',
        process.env.DB_USER || 'root',
        process.env.DB_PASSWORD || 'lalala',
        process.env.DB_NAME || 'employees_db'
    )
);

const quotesGateway = new AcmeLibraryQuotesGateway();

const quotesSender = new WhatsAppQuotesSender(
    new WhatsAppQuotesSenderConfig(
        process.env.TWILIO_ACCOUNT_SID || "",
        process.env.TWILIO_AUTH_TOKEN || ""
    )
);

const random = new SystemRandom();

const inspirationService = new InspirationService(
    employeesRepository,
    quotesGateway,
    quotesSender,
    random
);

inspirationService.inspireSomeone("success")
    .then(() => console.log("Inspiration sent!"))
    .catch(error => console.error("Failed to send inspiration:", error));
