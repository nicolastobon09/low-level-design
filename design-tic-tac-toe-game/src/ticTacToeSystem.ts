import { Game } from "./entities/game";
import { Player } from "./entities/player";
import { InvalidMoveException } from "./exceptions/invalidMoveException";
import { Scoreboard } from "./observer/scoreBoard";

export class TicTacToeSystem {
    private static instance: TicTacToeSystem | null = null;
    private game: Game | null = null;
    private readonly scoreboard: Scoreboard;

    private constructor() {
        this.scoreboard = new Scoreboard();
    }

    static getInstance(): TicTacToeSystem {
        if (TicTacToeSystem.instance === null) {
            TicTacToeSystem.instance = new TicTacToeSystem();
        }
        return TicTacToeSystem.instance;
    }

    createGame(player1: Player, player2: Player): void {
        this.game = new Game(player1, player2);
        // Register the scoreboard as an observer for this new game
        this.game.addObserver(this.scoreboard);

        console.log(`Game started between ${player1.getName()} (X) and ${player2.getName()} (O).`);
    }

    makeMove(player: Player, row: number, col: number): void {
        if (this.game === null) {
            console.log("No game in progress. Please create a game first.");
            return;
        }
        try {
            console.log(`${player.getName()} plays at (${row}, ${col})`);
            this.game.makeMove(player, row, col);
            this.printBoard();
            console.log(`Game Status: ${this.game.getStatus()}`);
            if (this.game.getWinner() !== null) {
                console.log(`Winner: ${this.game.getWinner()!.getName()}`);
            }
        } catch (error) {
            if (error instanceof InvalidMoveException) {
                console.log(`Error: ${error.message}`);
            } else {
                throw error;
            }
        }
    }

    printBoard(): void {
        if (this.game) {
            this.game.getBoard().printBoard();
        }
    }

    printScoreBoard(): void {
        this.scoreboard.printScores();
    }
}