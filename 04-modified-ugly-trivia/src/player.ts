import {Notifier} from "./notifier";
import {Place} from "./place";
import {Board} from "./board";

export class Player {
    private readonly name: string;
    private place: Place;
    private purse: number;
    private inPenaltyBox: boolean;
    private readonly notifier: Notifier;
    private readonly board: Board;

    constructor(name: string, notifier: Notifier, board: Board) {
        this.name = name;
        this.notifier = notifier;
        this.board = board;
        this.place = board.initialPosition();
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
        this.place = this.place.advance(roll, this.board);
        this.notifier.notify(this.name + "'s new location is " + this.place.getPosition());
        this.askQuestion();
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

    private askQuestion(): void {
        this.place.askQuestion();
    }

    private earnPurse(): void {
        this.purse += 1;
        this.notifier.notify(this.name + " now has " + this.purse + " Gold Coins.");
    }

    private enterPenaltyBox(): void {
        this.inPenaltyBox = true;
        this.notifier.notify(this.name + " was sent to the penalty box");
    }
}