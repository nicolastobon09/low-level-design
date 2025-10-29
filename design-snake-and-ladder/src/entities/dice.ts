export class Dice {
    private readonly minValue: number;
    private readonly maxValue: number;

    constructor(minValue: number, maxValue: number) {
        this.minValue = minValue;
        this.maxValue = maxValue;
    }

    roll(): number {
        return Math.floor(Math.random() * (this.maxValue - this.minValue + 1) + this.minValue);
    }
}