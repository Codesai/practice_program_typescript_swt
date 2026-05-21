import express from "express";
import request from "supertest";
import {createInspirationApp} from "../../../../src/infrastructure/web/app";
import {InspirationController} from "../../../../src/infrastructure/web/InspirationController";
import {ForInspiring, InvalidWordError} from "../../../../src/domain/ForInspiring";
import {EmptyQuotesError, RetrievingQuotesError} from "../../../../src/domain/QuotesGateway";
import {EmptyEmployeesError, GettingEmployeesError} from "../../../../src/domain/EmployeesRepository";
import {SendingQuoteError} from "../../../../src/domain/QuotesSender";

describe('Inspiration Controller', () => {
    let inspirationService: jest.Mocked<ForInspiring>;
    let app: express.Application;

    beforeEach(() => {
        inspirationService = {
            inspireSomeone: jest.fn()
        }
        app = createInspirationApp(new InspirationController(inspirationService));
    });

    it('should send an inspiration quote to an employee', async () => {
        const response = await request(app).get('/inspire/quote');

        expect(response.status).toBe(200);
        expect(inspirationService.inspireSomeone).toHaveBeenCalledWith('quote');
    });

    it('should inform user to try again if word is invalid', async () => {
        inspirationService.inspireSomeone.mockRejectedValueOnce(new InvalidWordError(`"quote" is invalid`));

        const response = await request(app).get('/inspire/quote');

        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            errorWith("Invalid word. Try with another one"));
    });

    it('should inform user to try again if quotes are empty', async () => {
        inspirationService.inspireSomeone.mockRejectedValueOnce(new EmptyQuotesError());

        const response = await request(app).get('/inspire/quote');

        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            errorWith("No quotes for current word. Try with another one"));
    });

    it('should inform user to hire someone if no employees are found', async () => {
        inspirationService.inspireSomeone.mockRejectedValueOnce(new EmptyEmployeesError());

        const response = await request(app).get('/inspire/quote');

        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            errorWith("No employees found. Please hire someone :)"
            ));
    });

    it('should inform user to try again if quotes service fails', async () => {
        inspirationService.inspireSomeone.mockRejectedValueOnce(new RetrievingQuotesError("ups"));

        const response = await request(app).get('/inspire/quote');

        expect(response.status).toBe(500);
        expect(response.body).toEqual(somethingWentWrongErrorMessage());
    });


    it('should inform user to try again if employee repository fails', async () => {
        inspirationService.inspireSomeone.mockRejectedValueOnce(new GettingEmployeesError("ups"));

        const response = await request(app).get('/inspire/quote');

        expect(response.status).toBe(500);
        expect(response.body).toEqual(somethingWentWrongErrorMessage());
    });

    it('should inform user to try again if quotes sender service fails', async () => {
        inspirationService.inspireSomeone.mockRejectedValueOnce(new SendingQuoteError("ups", new Error()));

        const response = await request(app).get('/inspire/quote');

        expect(response.status).toBe(500);
        expect(response.body).toEqual(somethingWentWrongErrorMessage());
    });

    function somethingWentWrongErrorMessage() {
        return errorWith("Something went wrong. Try again");
    }

    function errorWith(message: string) {
        return {
            "error": message
        };
    }

});