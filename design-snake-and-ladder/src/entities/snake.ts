import { BoardEntity } from "./boardEntity";

export class Snake extends BoardEntity {
    constructor(start: number, end: number) {
        super(start, end);
        if (start <= end) {
            throw new Error("Snake head must be at a higher position than its tail.");
        }
    }
}