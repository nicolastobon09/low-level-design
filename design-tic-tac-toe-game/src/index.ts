import { Player } from "./entities/player";
import { Sym } from "./enums/symbol";
import { TicTacToeSystem } from "./ticTacToeSystem";

// Demo class
class TicTacToeDemo {
    static main(): void {
        const system = TicTacToeSystem.getInstance();

        const alice = new Player("Alice", Sym.X);
        const bob = new Player("Bob", Sym.O);

        // --- GAME 1: Alice wins ---
        console.log("--- GAME 1: Alice (X) vs. Bob (O) ---");
        system.createGame(alice, bob);
        system.printBoard();

        system.makeMove(alice, 0, 0);
        system.makeMove(bob, 1, 0);
        system.makeMove(alice, 0, 1);
        system.makeMove(bob, 1, 1);
        system.makeMove(alice, 0, 2); // Alice wins, scoreboard is notified
        console.log("----------------------------------------\n");

        // --- GAME 2: Bob wins ---
        console.log("--- GAME 2: Alice (X) vs. Bob (O) ---");
        system.createGame(alice, bob); // A new game instance
        system.printBoard();

        system.makeMove(alice, 0, 0);
        system.makeMove(bob, 1, 0);
        system.makeMove(alice, 0, 1);
        system.makeMove(bob, 1, 1);
        system.makeMove(alice, 2, 2);
        system.makeMove(bob, 1, 2); // Bob wins, scoreboard is notified
        console.log("----------------------------------------\n");

        // --- GAME 3: A Draw ---
        console.log("--- GAME 3: Alice (X) vs. Bob (O) - Draw ---");
        system.createGame(alice, bob);
        system.printBoard();

        system.makeMove(alice, 0, 0);
        system.makeMove(bob, 0, 1);
        system.makeMove(alice, 0, 2);
        system.makeMove(bob, 1, 1);
        system.makeMove(alice, 1, 0);
        system.makeMove(bob, 1, 2);
        system.makeMove(alice, 2, 1);
        system.makeMove(bob, 2, 0);
        system.makeMove(alice, 2, 2); // Draw, scoreboard is not notified of a winner
        console.log("----------------------------------------\n");

        // --- Final Scoreboard ---
        system.printScoreBoard();
    }
}

// Run the demo
TicTacToeDemo.main();