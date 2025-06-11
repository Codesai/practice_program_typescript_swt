import {Game} from './game';
import {ConsoleNotifier} from "./infrastructure/consoleNotifier";

export class GameRunner {
    static run(): void {
        const notifier = new ConsoleNotifier();
        const game = new Game(notifier);
        game.add("Chet");
        game.add("Pat");
        game.add("Sue");

        game.run();
    }
}

GameRunner.run();

  