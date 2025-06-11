import {Notifier} from "./notifier";
import {Category} from "./category";
import {Place} from "./place";
import {Board} from "./board";

export function create(notifier: Notifier): Board {
    const boardSize = 12;

    let popCategory: Category;
    let scienceCategory: Category;
    let sportsCategory: Category;
    let rockCategory: Category;

    return new Board(createPlaces());

    function createPlaces(): Place[] {
        const places: Place[] = [];
        for (let position = 0; position < boardSize; position++) {
            const category: Category = getCategoryForPosition(position);
            places.push(new Place(position, category));
        }
        return places;
    }

    function getCategoryForPosition(position: number): Category {
        popCategory = popCategory ? popCategory : generateCategory('Pop');
        scienceCategory = scienceCategory ? scienceCategory : generateCategory('Science');
        sportsCategory = sportsCategory ? sportsCategory : generateCategory('Sports');
        rockCategory = rockCategory ? rockCategory : generateCategory('Rock');

        if (position === 0 || position === 4 || position === 8) {
            return popCategory;
        }
        if (position === 1 || position === 5 || position === 9) {
            return scienceCategory;
        }
        if (position === 2 || position === 6 || position === 10) {
            return sportsCategory;
        }
        return rockCategory;
    }

    function generateCategory(name: string): Category {
        const numberOfQuestionPerCategory = 50;
        const questions: string[] = [];
        for (let i = 0; i < numberOfQuestionPerCategory; i++) {
            questions.push(`${name} Question ${i}`);
        }
        return new Category(name, questions, notifier);
    }
}