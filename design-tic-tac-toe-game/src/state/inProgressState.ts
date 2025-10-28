import { Game } from "../entities/game";
import { Player } from "../entities/player";
import { GameStatus } from "../enums/gameStatus";
import { Sym } from "../enums/symbol";
import { InvalidMoveException } from "../exceptions/invalidMoveException";
import { DrawState } from "./drawState";
import { GameState } from "./gameState";
import { WinnerState } from "./winnerState";

export class InProgressState implements GameState {
    handleMove(game: Game, player: Player, row: number, col: number): void {
        if (game.getCurrentPlayer() !== player) {
            throw new InvalidMoveException("Not your turn!");
        }

        // Place the piece on the board
        game.getBoard().placeSymbol(row, col, player.getSymbol());

        // Check for a winner or a draw
        if (game.checkWinner(player)) {
            game.setWinner(player);
            game.setStatus(player.getSymbol() === Sym.X ? GameStatus.WINNER_X : GameStatus.WINNER_O);
            game.setState(new WinnerState());
        } else if (game.getBoard().isFull()) {
            game.setStatus(GameStatus.DRAW);
            game.setState(new DrawState());
        } else {
            // If the game is still in progress, switch players
            game.switchPlayer();
        }
    }
}