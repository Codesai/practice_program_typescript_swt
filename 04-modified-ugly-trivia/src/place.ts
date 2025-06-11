import {Category} from "./category";
import {Board} from "./board";

export class Place {
    private readonly position: number;
    private readonly category: Category;

    constructor(position: number, category: Category) {
        this.position = position;
        this.category = category;
    }

    advance(roll: number, board: Board): Place {
        let newPlace: number = this.position + roll;
        return board.getPlaceAt(newPlace);
    }

    getPosition(): string {
        return this.position.toString();
    }

    askQuestion(): void {
        this.category.askQuestion()
    }
}