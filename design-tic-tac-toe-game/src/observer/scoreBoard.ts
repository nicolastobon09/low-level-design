import { Game } from "../entities/game";
import { GameObserver } from "./gameObserver";

export class Scoreboard implements GameObserver {
    private readonly scores: Map<string, number>;

    constructor() {
        this.scores = new Map<string, number>();
    }

    update(game: Game): void {
        // The scoreboard only cares about finished games with a winner
        if (game.getWinner() !== null) {
            const winnerName = game.getWinner()!.getName();
            const currentScore = this.scores.get(winnerName) || 0;
            this.scores.set(winnerName, currentScore + 1);
            console.log(`[Scoreboard] ${winnerName} wins! Their new score is ${this.scores.get(winnerName)}.`);
        }
    }

    printScores(): void {
        console.log("\n--- Overall Scoreboard ---");
        if (this.scores.size === 0) {
            console.log("No games with a winner have been played yet.");
            return;
        }
        this.scores.forEach((score, playerName) => {
            console.log(`Player: ${playerName.padEnd(10)} | Wins: ${score}`);
        });
        console.log("--------------------------\n");
    }
}