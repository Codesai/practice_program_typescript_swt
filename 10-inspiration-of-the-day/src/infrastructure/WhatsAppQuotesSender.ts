import {Twilio} from "twilio";
import {Employee} from "../domain/Employee";
import {Quote} from "../domain/Quote";
import {QuotesSender, SendingQuoteError} from "../domain/QuotesSender";

export class WhatsAppQuotesSender implements QuotesSender {
    private readonly client: Twilio;
    private readonly fromWhatsAppNumber: string;

    constructor(apiConfig: WhatsAppQuotesSenderConfig) {
        this.client = new Twilio(
            apiConfig.twilioAccountSid,
            apiConfig.twilioAuthToken
        );
        this.fromWhatsAppNumber = apiConfig.fromWhatsAppNumber;
    }

    async send(employee: Employee, quote: Quote): Promise<void> {
        const messageBody = `Hi ${employee.name}, here is your inspiration for today: "${quote.text}"`;

        try {
            await this.client.messages
                .create({
                    from: this.fromWhatsAppNumber,
                    to: `whatsapp:${employee.phoneNumber}`,
                    body: messageBody,
                });
        } catch (error) {
            throw new SendingQuoteError(`Failed to send quote, "${quote.text}", to ${employee.name}`, error);
        }
    }
}

export class WhatsAppQuotesSenderConfig {
    readonly twilioAccountSid: string;
    readonly twilioAuthToken: string;
    readonly fromWhatsAppNumber: string;

    constructor(
        twilioAccountSid: string,
        twilioAuthToken: string,
        fromWhatsAppNumber: string
    ) {
        validateConfig(twilioAccountSid, twilioAuthToken, fromWhatsAppNumber);
        this.twilioAccountSid = twilioAccountSid;
        this.twilioAuthToken = twilioAuthToken;
        this.fromWhatsAppNumber = fromWhatsAppNumber;
    }
}

function validateConfig(twilioAccountSid: string, twilioAuthToken: string, fromWhatsAppNumber: string): void {
    validateTwilioAccountSid(twilioAccountSid);
    validateTwilioAuthToken(twilioAuthToken);
    validateFromWhatsAppNumber(fromWhatsAppNumber);
}

function validateTwilioAccountSid(twilioAccountSid: string): void {
    if (twilioAccountSid === "") {
        throw new Error("twilioAccountSid cannot be an empty string");
    }
}

function validateTwilioAuthToken(twilioAuthToken: string): void {
    if (twilioAuthToken === "") {
        throw new Error("twilioAuthToken cannot be an empty string");
    }
}

function validateFromWhatsAppNumber(fromWhatsAppNumber: string): void {
    if (fromWhatsAppNumber === "") {
        throw new Error("fromWhatsAppNumber cannot be an empty string");
    }
}