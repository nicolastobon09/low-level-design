import { Board } from "../entities/board";
import { Player } from "../entities/player";
import { WinningStrategy } from "./winningStrategy";

export class RowWinningStrategy implements WinningStrategy {
    checkWinner(board: Board, player: Player): boolean {
        for (let row = 0; row < board.getSize(); row++) {
            let rowWin = true;
            for (let col = 0; col < board.getSize(); col++) {
                const cell = board.getCell(row, col);
                if (!cell || cell.getSymbol() !== player.getSymbol()) {
                    rowWin = false;
                    break;
                }
            }
            if (rowWin) return true;
        }
        return false;
    }
}