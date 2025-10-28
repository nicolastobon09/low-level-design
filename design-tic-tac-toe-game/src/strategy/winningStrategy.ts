import { Board } from "../entities/board";
import { Player } from "../entities/player";

export interface WinningStrategy {
    checkWinner(board: Board, player: Player): boolean;
}