export interface ForInspiring {
    inspireSomeone(word: string): Promise<void>;
}

export class InvalidWordError extends Error {
    constructor(message: string) {
        super(message);
    }
}