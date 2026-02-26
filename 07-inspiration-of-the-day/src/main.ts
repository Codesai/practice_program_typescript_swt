import {InspirationService} from "./application/InspirationService";
import {MariaDbEmployeesRepository} from "./infrastructure/persistence/MariaDbEmployeesRepository";
import {FetchQuotesGateway} from "./infrastructure/FetchQuotesGateway";
import {SystemRandom} from "./infrastructure/SystemRandom";
import {WhatsAppQuotesSender, WhatsAppQuotesSenderConfig} from "./infrastructure/WhatsAppQuotesSender";
import {DbConnectionOptions} from "./infrastructure/persistence/DbConnectionOptions";
import {InspirationController} from "./infrastructure/web/InspirationController";
import {createInspirationApp} from "./infrastructure/web/app";

const employeesRepository = new MariaDbEmployeesRepository(
    new DbConnectionOptions(
        process.env.DB_HOST || 'some_host',
        process.env.DB_USER || 'some_user',
        process.env.DB_PASSWORD || 'lalala',
        process.env.DB_NAME || 'employees_db'
    )
);

const quotesGateway = new FetchQuotesGateway();

const quotesSender = new WhatsAppQuotesSender(
    new WhatsAppQuotesSenderConfig(
        process.env.TWILIO_ACCOUNT_SID || "",
        process.env.TWILIO_AUTH_TOKEN || "",
        process.env.FROM_WHATS_APP_NUMBER || "whatsapp:+14155238886"
    )
);

const random = new SystemRandom();

const inspirationService = new InspirationService(
    employeesRepository,
    quotesGateway,
    quotesSender,
    random
);

const inspirationController = new InspirationController(inspirationService);
const app = createInspirationApp(inspirationController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
