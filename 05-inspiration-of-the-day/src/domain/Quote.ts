export class Quote {
    readonly text: string;
    readonly author: string;

    constructor(text: string, author: string) {
        this.text = text;
        this.author = author;
    }
}