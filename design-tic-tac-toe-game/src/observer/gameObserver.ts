import { Game } from "../entities/game";

export interface GameObserver {
    update(game: Game): void;
}