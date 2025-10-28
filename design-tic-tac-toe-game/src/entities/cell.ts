import { Sym } from "../enums/symbol";

export class Cell {
    private symbol: Sym;

    constructor() {
        this.symbol = Sym.EMPTY;
    }

    getSymbol(): Sym {
        return this.symbol;
    }

    setSymbol(symbol: Sym): void {
        this.symbol = symbol;
    }
}