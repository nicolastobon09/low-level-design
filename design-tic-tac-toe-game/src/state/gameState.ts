import { Game } from "../entities/game";
import { Player } from "../entities/player";

export interface GameState {
    handleMove(game: Game, player: Player, row: number, col: number): void;
}