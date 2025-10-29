import { BoardEntity } from "./boardEntity";

export class Board {
    private readonly size: number;
    private readonly snakesAndLadders: Map<number, number>;

    constructor(size: number, entities: BoardEntity[]) {
        this.size = size;
        this.snakesAndLadders = new Map<number, number>();

        for (const entity of entities) {
            this.snakesAndLadders.set(entity.getStart(), entity.getEnd());
        }
    }

    getSize(): number {
        return this.size;
    }

    getFinalPosition(position: number): number {
        return this.snakesAndLadders.get(position) ?? position;
    }
}