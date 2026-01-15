export class WhatsAppQuotesSenderConfig {
    readonly twilio_account_sid: string;
    readonly twilio_auth_token: string;

    constructor(
        twilio_account_sid: string,
        twilio_auth_token: string
    ) {
        if (twilio_account_sid === "") {
            throw new Error("twilio_account_sid cannot be an empty string");
        }
        if (twilio_auth_token === "") {
            throw new Error("twilio_auth_token cannot be an empty string");
        }
        this.twilio_account_sid = twilio_account_sid;
        this.twilio_auth_token = twilio_auth_token;
    }
}