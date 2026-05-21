import {Request, Response} from 'express';
import {ForInspiring, InvalidWordError} from "../../domain/ForInspiring";
import {EmptyQuotesError} from "../../domain/QuotesGateway";
import {EmptyEmployeesError} from "../../domain/EmployeesRepository";

export class InspirationController {
    constructor(private readonly inspirationService: ForInspiring) {
    }

    async inspire(req: Request, res: Response): Promise<void> {
        const word = req.params.word as string;

        try {
            await this.inspirationService.inspireSomeone(word);
            res.status(200).send();
        } catch (error) {
            if (error instanceof InvalidWordError) {
                res.status(400).send({error: "Invalid word. Try with another one"});
            } else if (error instanceof EmptyQuotesError) {
                res.status(400).send({error: "No quotes for current word. Try with another one"});
            } else if (error instanceof EmptyEmployeesError) {
                res.status(400).send({error: "No employees found. Please hire someone :)"});
            } else {
                res.status(500).send({error: 'Something went wrong. Try again'});
            }
        }
    }
}