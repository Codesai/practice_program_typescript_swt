export class Player {
    private readonly name: string;
    private place: number;
    private purse: number;
    private inPenaltyBox: boolean;

    constructor(name: string) {
        this.name = name;
        this.place = 0;
        this.purse = 0;
        this.inPenaltyBox = false;
    }

    isInPlace(place: number): boolean {
        return this.place === place;
    }

    getName(): string {
        return this.name;
    }

    getPlace(): number {
        return this.place;
    }

    getPurse(): number {
        return this.purse;
    }

    isInPenaltyBox(): boolean {
        return this.inPenaltyBox;
    }

    move(roll: number): void {
        this.place = this.place + roll;
        const boardSize = 12;
        if (this.place > boardSize -1) {
            this.place = this.place - boardSize;
        }
    }

    answeredCorrectly(): void {
        this.purse += 1;
    }

    answeredWrongly(): void {
        this.inPenaltyBox = true;
    }
}