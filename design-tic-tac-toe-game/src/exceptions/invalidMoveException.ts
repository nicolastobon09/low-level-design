export class InvalidMoveException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidMoveException';
    }
}