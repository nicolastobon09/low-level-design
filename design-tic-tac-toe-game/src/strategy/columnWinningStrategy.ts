import { Board } from "../entities/board";
import { Player } from "../entities/player";
import { WinningStrategy } from "./winningStrategy";

export class ColumnWinningStrategy implements WinningStrategy {
    checkWinner(board: Board, player: Player): boolean {
        for (let col = 0; col < board.getSize(); col++) {
            let colWin = true;
            for (let row = 0; row < board.getSize(); row++) {
                const cell = board.getCell(row, col);
                if (!cell || cell.getSymbol() !== player.getSymbol()) {
                    colWin = false;
                    break;
                }
            }
            if (colWin) return true;
        }
        return false;
    }
}