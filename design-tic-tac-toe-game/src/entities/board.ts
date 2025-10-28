import { Sym } from "../enums/symbol";
import { InvalidMoveException } from "../exceptions/invalidMoveException";
import { Cell } from "./cell";

export class Board {
    private readonly size: number;
    private movesCount: number;
    private readonly board: Cell[][];

    constructor(size: number) {
        this.size = size;
        this.board = [];
        this.movesCount = 0;
        this.initializeBoard();
    }

    private initializeBoard(): void {
        for (let row = 0; row < this.size; row++) {
            this.board[row] = [];
            for (let col = 0; col < this.size; col++) {
                this.board[row][col] = new Cell();
            }
        }
    }

    placeSymbol(row: number, col: number, symbol: Sym): boolean {
        if (row < 0 || row >= this.size || col < 0 || col >= this.size) {
            throw new InvalidMoveException("Invalid position: out of bounds.");
        }
        if (this.board[row][col].getSymbol() !== Sym.EMPTY) {
            throw new InvalidMoveException("Invalid position: cell is already occupied.");
        }
        this.board[row][col].setSymbol(symbol);
        this.movesCount++;
        return true;
    }

    getCell(row: number, col: number): Cell | null {
        if (row < 0 || row >= this.size || col < 0 || col >= this.size) {
            return null;
        }
        return this.board[row][col];
    }

    isFull(): boolean {
        return this.movesCount === this.size * this.size;
    }

    printBoard(): void {
        console.log("-------------");
        for (let i = 0; i < this.size; i++) {
            let row = "| ";
            for (let j = 0; j < this.size; j++) {
                const symbol = this.board[i][j].getSymbol();
                row += symbol + " | ";
            }
            console.log(row);
            console.log("-------------");
        }
    }

    getSize(): number {
        return this.size;
    }
}