import {Notifier} from "../notifier";

export class ConsoleNotifier implements Notifier {
    notify(message: string | undefined): void {
        console.log(message);
    }
}