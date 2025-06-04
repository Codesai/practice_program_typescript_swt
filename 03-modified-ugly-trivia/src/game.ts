import {Player} from "./player";
import {Notifier} from "./notifier";

export class Game {

    // made public for testing :(
    isGettingOutOfPenaltyBox: boolean = false;
    private players: Player[] = [];
    private currentPlayerIndex: number = 0;
    private popQuestions: Array<string> = [];
    private scienceQuestions: Array<string> = [];
    private sportsQuestions: Array<string> = [];
    private rockQuestions: Array<string> = [];
    protected readonly notifier: Notifier;

    constructor(notifier: Notifier) {
        this.notifier = notifier;

        for (let i = 0; i < 50; i++) {
            this.popQuestions.push("Pop Question " + i);
            this.scienceQuestions.push("Science Question " + i);
            this.sportsQuestions.push("Sports Question " + i);
            this.rockQuestions.push("Rock Question " + i);
        }
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
        this.players.push(new Player(name, this.notifier));

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
                this.moveCurrentPlayerToNewPlaceAndAskQuestion(roll)
            } else {
                this.notify(currentPlayer.getName() + " is not getting out of the penalty box");
                this.isGettingOutOfPenaltyBox = false;
            }
        } else {
            this.moveCurrentPlayerToNewPlaceAndAskQuestion(roll);
        }
    }

    private moveCurrentPlayerToNewPlaceAndAskQuestion(roll: number): void {
        const currentPlayer = this.getCurrentPlayer();
        currentPlayer.move(roll);

        this.notify("The category is " + this.getCurrentCategory());
        this.askQuestion();
    }

    private getCurrentPlayer(): Player {
        return this.players[this.currentPlayerIndex];
    }

    private askQuestion(): void {
        //TODO: magic literal
        if (this.getCurrentCategory() == 'Pop') {
            this.notify(this.popQuestions.shift());
        }
        if (this.getCurrentCategory() == 'Science') {
            this.notify(this.scienceQuestions.shift());
        }
        if (this.getCurrentCategory() == 'Sports') {
            this.notify(this.sportsQuestions.shift());
        }
        if (this.getCurrentCategory() == 'Rock') {
            this.notify(this.rockQuestions.shift());
        }
    }

    private getCurrentCategory(): string {
        const currentPlayer = this.getCurrentPlayer();
        //TODO: abstraction
        if (currentPlayer.isInPlace(0)) {
            return 'Pop';
        }
        if (currentPlayer.isInPlace(4)) {
            return 'Pop';
        }
        if (currentPlayer.isInPlace(8)) {
            return 'Pop';
        }
        if (currentPlayer.isInPlace(1)) {
            return 'Science';
        }
        if (currentPlayer.isInPlace(5)) {
            return 'Science';
        }
        if (currentPlayer.isInPlace(9)) {
            return 'Science';
        }
        if (currentPlayer.isInPlace(2)) {
            return 'Sports';
        }
        if (currentPlayer.isInPlace(6)) {
            return 'Sports';
        }
        if (currentPlayer.isInPlace(10)) {
            return 'Sports';
        }
        return 'Rock';
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

    private currentPlayerAnswerCorrectly(currentPlayer: Player) {
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
