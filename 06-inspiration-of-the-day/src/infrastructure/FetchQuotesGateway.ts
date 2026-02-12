import {Quote} from "../domain/Quote";
import {QuotesGateway, RetrievingQuotesError} from "../domain/QuotesGateway";

export class FetchQuotesGateway implements QuotesGateway {
    async findQuotesByWord(word: string): Promise<Quote[]> {
        let response: Response;

        try {
            const url = `https://api.quotes-service.example.com/quotes?word=${encodeURIComponent(word)}`;

            response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            throw new RetrievingQuotesError(`Failed to retrieve quotes: ${error instanceof Error ? error.message : String(error)}`);
        }

        if (!response.ok) {
            throw new RetrievingQuotesError(`Failed to fetch quotes: ${response.statusText}`);
        }

        const jsonResponse = await response.json() as any[];
        return jsonResponse.map((item: any) => new Quote(item.text, item.author));
    }
}