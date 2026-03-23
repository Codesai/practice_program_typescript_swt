import express, {Express} from 'express';
import {InspirationController} from './InspirationController';

export function createInspirationApp(controller: InspirationController): Express {
    const app = express();
    app.use(express.json());

    app.get('/inspire/:word', (
            req,
            res
        ) => controller.inspire(req, res)
    );

    return app;
}
