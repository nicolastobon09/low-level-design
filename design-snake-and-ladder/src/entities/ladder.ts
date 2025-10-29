import { BoardEntity } from "./boardEntity";

export class Ladder extends BoardEntity {
    constructor(start: number, end: number) {
        super(start, end);
        if (start >= end) {
            throw new Error("Ladder bottom must be at a lower position than its top.");
        }
    }
}