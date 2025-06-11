import {Player} from "./player";
import {Notifier} from "./notifier";
import * as BoardFactory from "./BoardFactory";
import {Board} from "./board";

export class Game {

    // made public for testing :(
    isGettingOutOfPenaltyBox: boolean = false;
    protected readonly notifier: Notifier;
    private players: Player[] = [];
    private currentPlayerIndex: number = 0;
    private readonly board: Board;

    constructor(notifier: Notifier) {
        this.notifier = notifier;
        this.board = BoardFactory.create(notifier) as Board;
    }

    run(): void {
        let notAWinner;
        do {

            this.roll(this.getRollNumber());

            if (this.isAnswerWrong()) {
                notAWinner = this.wrongAnswer();
            } else {
                notAWinner = this.wasCorrectlyAnswered();
            }

        } while (notAWinner);
    }

    add(name: string): boolean {
        this.players.push(new Player(name, this.notifier, this.board));

        this.notify(name + " was added");
        this.notify("They are player number " + this.players.length);

        return true;
    }

    // made protected for testing :(
    protected isAnswerWrong(): boolean {
        return Math.floor(Math.random() * 10) == 7;
    }

    // made protected for testing :(
    protected getRollNumber(): number {
        return Math.floor(Math.random() * 6) + 1
    }

    private notify(message: string | undefined): void {
        this.notifier.notify(message);
    }

    private roll(roll: number): void {
        const currentPlayer = this.getCurrentPlayer();
        this.notify(currentPlayer.getName() + " is the current player");
        this.notify("They have rolled a " + roll);

        if (currentPlayer.isInPenaltyBox()) {
            if (roll % 2 != 0) {
                this.isGettingOutOfPenaltyBox = true;
                this.notify(currentPlayer.getName() + " is getting out of the penalty box");
                currentPlayer.move(roll);
            } else {
                this.notify(currentPlayer.getName() + " is not getting out of the penalty box");
                this.isGettingOutOfPenaltyBox = false;
            }
        } else {
            currentPlayer.move(roll);
        }
    }

    private getCurrentPlayer(): Player {
        return this.players[this.currentPlayerIndex];
    }

    private wrongAnswer(): boolean {
        const currentPlayer = this.getCurrentPlayer();
        currentPlayer.handleWrongAnswer();

        this.nextTurn();
        return true;
    }

    private wasCorrectlyAnswered(): boolean {
        const currentPlayer = this.getCurrentPlayer();

        if (!currentPlayer.isInPenaltyBox()) {
            return this.currentPlayerAnswerCorrectly(currentPlayer);
        }

        if (this.isGettingOutOfPenaltyBox) {
            return this.currentPlayerAnswerCorrectly(currentPlayer);
        }

        this.nextTurn();

        return true;
    }

    private currentPlayerAnswerCorrectly(currentPlayer: Player): boolean {
        currentPlayer.handleCorrectAnswer();

        this.nextTurn();

        return !currentPlayer.didWin();
    }

    private nextTurn(): void {
        this.currentPlayerIndex += 1;
        if (this.currentPlayerIndex == this.players.length) {
            this.currentPlayerIndex = 0;
        }
    }
}
