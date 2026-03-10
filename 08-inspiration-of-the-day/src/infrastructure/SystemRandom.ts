import {Random} from "../domain/Random";

export class SystemRandom implements Random {
    nextInt(max: number): number {
        return Math.floor(Math.random() * max);
    }
}
