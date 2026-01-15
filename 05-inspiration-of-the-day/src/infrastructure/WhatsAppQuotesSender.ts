import {Twilio} from "twilio";
import {Employee} from "../domain/Employee";
import {Quote} from "../domain/Quote";
import {QuotesSender} from "../domain/QuotesSender";
import {WhatsAppQuotesSenderConfig} from "./WhatsAppQuotesSenderConfig";

export class WhatsAppQuotesSender implements QuotesSender {
    private client: Twilio;
    private readonly fromWhatsAppNumber = "whatsapp:+14155238886"; // Twilio sandbox number

    constructor(apiConfig: WhatsAppQuotesSenderConfig) {
        this.client = new Twilio(
            apiConfig.twilio_account_sid,
            apiConfig.twilio_auth_token
        );
    }

    async send(employee: Employee, quote: Quote): Promise<void> {
        const messageBody = `Hi ${employee.name}, here is your inspiration for today: "${quote.text}"`;

        try {
            const message = await this.client.messages
                .create({
                    from: this.fromWhatsAppNumber,
                    to: `whatsapp:${employee.phoneNumber}`, // Ensure Employee has a phoneNumber property
                    body: messageBody,
                });
            console.log(`Message sent to ${employee.name}. SID: ${message.sid}`);
        } catch (error) {
            console.error(`Failed to send WhatsApp to ${employee.name}:`, error);
            throw error;
        }
    }
}