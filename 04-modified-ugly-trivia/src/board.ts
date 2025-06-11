import {Place} from "./place";

export class Board {
    private readonly places: Place[];

    constructor(places: Place[]) {
        this.places = places;
    }

    initialPosition(): Place {
        return this.places[0];
    }

    getPlaceAt(newPlace: number): Place {
        let size = this.places.length;
        if (newPlace > size - 1) {
            newPlace = newPlace - size;
        }
        return this.places[newPlace];
    }
}