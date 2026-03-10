export class Quote {
    readonly text: string;
    readonly author: string;

    constructor(text: string, author: string) {
        validate(text, author);
        this.text = text;
        this.author = author;
    }
}

function validate(text: string, author: string): void {
    validateText(text);
    validateAuthor(author);
}

function validateText(text: string): void {
    if (!text || text.trim() === '') {
        throw new Error('Text cannot be empty');
    }
}

function validateAuthor(author: string): void {
    if (!author || author.trim() === '') {
        throw new Error('Author cannot be empty');
    }
}
