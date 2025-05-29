import {Player} from "./player";

export class Game {

    // made public for testing :(
    isGettingOutOfPenaltyBox: boolean = false;
    private players: Player[] = [];
    private currentPlayerPosition: number = 0;
    private popQuestions: Array<string> = [];
    private scienceQuestions: Array<string> = [];
    private sportsQuestions: Array<string> = [];
    private rockQuestions: Array<string> = [];

    constructor() {
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
        this.players.push(new Player(name));

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

    // made protected for testing :(
    protected notify(message: string | undefined): void {
        console.log(message);
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
        this.moveCurrentPlayer(currentPlayer, roll);

        this.notify("The category is " + this.currentCategory());
        this.askQuestion();
    }

    // Future: move to Player (not possible yet because of notify seam)
    private moveCurrentPlayer(currentPlayer: Player, roll: number): void {
        currentPlayer.move(roll);
        this.notify(currentPlayer.getName() + "'s new location is " + currentPlayer.getPlace());
    }

    private getCurrentPlayer(): Player {
        return this.players[this.currentPlayerPosition];
    }

    private askQuestion(): void {
        if (this.currentCategory() == 'Pop') {
            this.notify(this.popQuestions.shift());
        }
        if (this.currentCategory() == 'Science') {
            this.notify(this.scienceQuestions.shift());
        }
        if (this.currentCategory() == 'Sports') {
            this.notify(this.sportsQuestions.shift());
        }
        if (this.currentCategory() == 'Rock') {
            this.notify(this.rockQuestions.shift());
        }
    }

    private currentCategory(): string {
        const currentPlayer = this.getCurrentPlayer();
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

    private didPlayerWin(): boolean {
        return !(this.getCurrentPlayer().getPurse() == 6)
    }

    private wrongAnswer(): boolean {
        this.notify('Question was incorrectly answered');
        const currentPlayer = this.getCurrentPlayer();
        this.notify(currentPlayer.getName() + " was sent to the penalty box");
        currentPlayer.answeredWrongly()

        this.nextTurn();
        return true;
    }

    private wasCorrectlyAnswered(): boolean {
        const currentPlayer = this.getCurrentPlayer();
        if (currentPlayer.isInPenaltyBox()) {
            if (this.isGettingOutOfPenaltyBox) {
                this.notify('Answer was correct!!!!');
                currentPlayer.answeredCorrectly()
                this.notify(currentPlayer.getName() + " now has " +
                    currentPlayer.getPurse() + " Gold Coins.");

                let winner = this.didPlayerWin();
                this.nextTurn();

                return winner;
            } else {
                this.nextTurn();
                return true;
            }
        } else {
            this.notify("Answer was correct!!!!");
            currentPlayer.answeredCorrectly()
            this.notify(currentPlayer.getName() + " now has " +
                currentPlayer.getPurse() + " Gold Coins.");

            let winner = this.didPlayerWin();

            this.nextTurn();

            return winner;
        }
    }

    private nextTurn(): void {
        this.currentPlayerPosition += 1;
        if (this.currentPlayerPosition == this.players.length) {
            this.currentPlayerPosition = 0;
        }
    }
}
