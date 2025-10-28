import { Game } from "../entities/game";
import { GameObserver } from "./gameObserver";

export abstract class GameSubject {
    private readonly observers: GameObserver[] = [];

    addObserver(observer: GameObserver): void {
        this.observers.push(observer);
    }

    removeObserver(observer: GameObserver): void {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    protected notifyObservers(): void {
        for (const observer of this.observers) {
            observer.update(this as unknown as Game);
        }
    }
}