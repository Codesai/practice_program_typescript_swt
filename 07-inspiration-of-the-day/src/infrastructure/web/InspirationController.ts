import {Request, Response} from 'express';
import {ForInspiring, InvalidWordError} from "../../domain/ForInspiring";

export class InspirationController {
    constructor(private readonly inspirationService: ForInspiring) {
    }

    async inspire(req: Request, res: Response): Promise<void> {
        const word = req.params.word as string;

        try {
            await this.inspirationService.inspireSomeone(word);
            res.status(200).send({message: 'Inspiration sent!'});
        } catch (error) {
            if (error instanceof InvalidWordError) {
                res.status(400).send({error: error.message});
            } else {
                res.status(500).send({error: 'Internal Server Error'});
            }
        }
    }
}
