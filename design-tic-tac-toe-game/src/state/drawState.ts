import { Game } from "../entities/game";
import { Player } from "../entities/player";
import { InvalidMoveException } from "../exceptions/invalidMoveException";
import { GameState } from "./gameState";

export class DrawState implements GameState {
    handleMove(game: Game, player: Player, row: number, col: number): void {
        throw new InvalidMoveException("Game is already over. It was a draw.");
    }
}