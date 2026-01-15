import {Quote} from "../domain/Quote";
import {QuotesGateway} from "../domain/QuotesGateway";
import * as https from "node:https";

export class AcmeLibraryQuotesGateway implements QuotesGateway {
    findQuotesByWord(word: string): Quote[] {

        const options = {
            hostname: 'api.quotes-service.example.com',
            path: `/quotes?word=${encodeURIComponent(word)}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return new Promise<Quote[]>((resolve, reject) => {
            const req = https.request(options, (res: any) => {
                let data = '';

                res.on('data', (chunk: string) => {
                    data += chunk;
                });

                res.on('end', () => {
                    try {
                        const quotes = JSON.parse(data);
                        const quoteObjects = quotes.map((q: any) => new Quote(q.text));
                        resolve(quoteObjects);
                    } catch (error) {
                        reject(error);
                    }
                });
            });

            req.on('error', (error: Error) => {
                reject(error);
            });

            req.end();
        }) as any;
    }
}