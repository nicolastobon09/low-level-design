import { Sym } from "../enums/symbol";

export class Player {
    private readonly name: string;
    private readonly symbol: Sym;

    constructor(name: string, symbol: Sym) {
        this.name = name;
        this.symbol = symbol;
    }

    getName(): string {
        return this.name;
    }

    getSymbol(): Sym {
        return this.symbol;
    }
}