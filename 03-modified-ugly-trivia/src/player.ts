import {Notifier} from "./notifier";

export class Player {
    private readonly name: string;
    private place: number;
    private purse: number;
    private inPenaltyBox: boolean;
    private readonly notifier: Notifier;

    constructor(name: string, notifier: Notifier) {
        this.name = name;
        this.notifier = notifier;
        this.place = 0;
        this.purse = 0;
        this.inPenaltyBox = false;
    }

    handleCorrectAnswer(): void {
        this.notifier.notify('Answer was correct!!!!');
        this.earnPurse()
    }

    handleWrongAnswer(): void {
        this.notifier.notify('Question was incorrectly answered');
        this.enterPenaltyBox()
    }

    move(roll: number): void {
        this.movePlace(roll);
        this.notifier.notify(this.name + "'s new location is " + this.place);
    }

    isInPlace(place: number): boolean {
        return this.place === place;
    }

    getName(): string {
        return this.name;
    }

    isInPenaltyBox(): boolean {
        return this.inPenaltyBox;
    }

    didWin(): boolean {
        return this.purse == 6;
    }

    private earnPurse(): void {
        this.purse += 1;
        this.notifier.notify(this.name + " now has " + this.purse + " Gold Coins.");
    }

    private movePlace(roll: number): void {
        this.place = this.place + roll;
        const boardSize = 12;
        if (this.place > boardSize - 1) {
            this.place = this.place - boardSize;
        }
    }

    private enterPenaltyBox(): void {
        this.inPenaltyBox = true;
        this.notifier.notify(this.name + " was sent to the penalty box");
    }
}