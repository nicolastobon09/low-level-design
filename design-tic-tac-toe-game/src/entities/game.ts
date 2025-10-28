import { GameStatus } from "../enums/gameStatus";
import { GameSubject } from "../observer/gameSubject";
import { GameState } from "../state/gameState";
import { InProgressState } from "../state/inProgressState";
import { ColumnWinningStrategy } from "../strategy/columnWinningStrategy";
import { DiagonalWinningStrategy } from "../strategy/diagonalWinningStrategy";
import { RowWinningStrategy } from "../strategy/rowWinningStrategy";
import { WinningStrategy } from "../strategy/winningStrategy";
import { Board } from "./board";
import { Player } from "./player";

export class Game extends GameSubject {
    private readonly board: Board;
    private readonly player1: Player;
    private readonly player2: Player;
    private currentPlayer: Player;
    private winner: Player | null;
    private status: GameStatus;
    private state: GameState;
    private readonly winningStrategies: WinningStrategy[];

    constructor(player1: Player, player2: Player) {
        super();
        this.board = new Board(3);
        this.player1 = player1;
        this.player2 = player2;
        this.currentPlayer = player1; // Player 1 starts
        this.winner = null;
        this.status = GameStatus.IN_PROGRESS;
        this.state = new InProgressState();
        this.winningStrategies = [
            new RowWinningStrategy(),
            new ColumnWinningStrategy(),
            new DiagonalWinningStrategy()
        ];
    }

    makeMove(player: Player, row: number, col: number): void {
        this.state.handleMove(this, player, row, col);
    }

    checkWinner(player: Player): boolean {
        for (const strategy of this.winningStrategies) {
            if (strategy.checkWinner(this.board, player)) {
                return true;
            }
        }
        return false;
    }

    switchPlayer(): void {
        this.currentPlayer = (this.currentPlayer === this.player1) ? this.player2 : this.player1;
    }

    getBoard(): Board {
        return this.board;
    }

    getCurrentPlayer(): Player {
        return this.currentPlayer;
    }

    getWinner(): Player | null {
        return this.winner;
    }

    setWinner(winner: Player): void {
        this.winner = winner;
    }

    getStatus(): GameStatus {
        return this.status;
    }

    setState(state: GameState): void {
        this.state = state;
    }

    setStatus(status: GameStatus): void {
        this.status = status;
        // Notify observers when the status changes to a finished state
        if (status !== GameStatus.IN_PROGRESS) {
            this.notifyObservers();
        }
    }
}