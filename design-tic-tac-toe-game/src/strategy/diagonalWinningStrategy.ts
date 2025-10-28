import { Board } from "../entities/board";
import { Player } from "../entities/player";
import { WinningStrategy } from "./winningStrategy";

export class DiagonalWinningStrategy implements WinningStrategy {
    checkWinner(board: Board, player: Player): boolean {
        // Main diagonal
        let mainDiagWin = true;
        for (let i = 0; i < board.getSize(); i++) {
            const cell = board.getCell(i, i);
            if (!cell || cell.getSymbol() !== player.getSymbol()) {
                mainDiagWin = false;
                break;
            }
        }
        if (mainDiagWin) return true;

        // Anti-diagonal
        let antiDiagWin = true;
        for (let i = 0; i < board.getSize(); i++) {
            const cell = board.getCell(i, board.getSize() - 1 - i);
            if (!cell || cell.getSymbol() !== player.getSymbol()) {
                antiDiagWin = false;
                break;
            }
        }
        return antiDiagWin;
    }
}