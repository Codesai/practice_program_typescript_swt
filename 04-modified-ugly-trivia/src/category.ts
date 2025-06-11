import {Notifier} from "./notifier";

export class Category {
    private readonly name: string;
    private readonly questions: string[];
    private readonly notifier: Notifier;

    constructor(name: string, questions: string[], notifier: Notifier) {
        this.name = name;
        this.questions = questions;
        this.notifier = notifier;
    }

    askQuestion() {
        this.notifier.notify("The category is " + this.name);
        this.notifier.notify(this.questions.shift());
    }
}