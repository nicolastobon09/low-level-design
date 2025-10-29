export class Player {
    private readonly name: string;
    private position: number;

    constructor(name: string) {
        this.name = name;
        this.position = 0;
    }

    getName(): string {
        return this.name;
    }

    getPosition(): number {
        return this.position;
    }

    setPosition(position: number): void {
        this.position = position;
    }
}