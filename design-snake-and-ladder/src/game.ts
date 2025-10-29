import { Board } from "./entities/board";
import { BoardEntity } from "./entities/boardEntity";
import { Dice } from "./entities/dice";
import { Player } from "./entities/player";
import { GameStatus } from "./enums/gameStatus";

// Queue implementation for TypeScript
class Queue<T> {
    private items: T[] = [];

    enqueue(item: T): void {
        this.items.push(item);
    }

    dequeue(): T | undefined {
        return this.items.shift();
    }

    size(): number {
        return this.items.length;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

// 4.6 Game Engine
export class Game {
    private readonly board: Board;
    private readonly players: Queue<Player>;
    private readonly dice: Dice;
    private status: GameStatus;
    private winner: Player | null;

    constructor(builder: GameBuilder) {
        this.board = builder.board!;
        this.players = new Queue<Player>();

        // Copy players from builder to our queue
        for (const player of builder.players!) {
            this.players.enqueue(player);
        }

        this.dice = builder.dice!;
        this.status = GameStatus.NOT_STARTED;
        this.winner = null;
    }

    play(): void {
        if (this.players.size() < 2) {
            console.log("Cannot start game. At least 2 players are required.");
            return;
        }

        this.status = GameStatus.RUNNING;
        console.log("Game started!");

        while (this.status === GameStatus.RUNNING) {
            const currentPlayer = this.players.dequeue();
            if (!currentPlayer) break;

            this.takeTurn(currentPlayer);

            // If the game is not finished and the player didn't roll a 6, add them back to the queue
            if (this.status === GameStatus.RUNNING) {
                this.players.enqueue(currentPlayer);
            }
        }

        console.log("Game Finished!");
        if (this.winner !== null) {
            console.log(`The winner is ${this.winner.getName()}!`);
        }
    }

    private takeTurn(player: Player): void {
        const roll = this.dice.roll();
        console.log(`\n${player.getName()}'s turn. Rolled a ${roll}.`);

        const currentPosition = player.getPosition();
        const nextPosition = currentPosition + roll;

        if (nextPosition > this.board.getSize()) {
            console.log(`Oops, ${player.getName()} needs to land exactly on ${this.board.getSize()}. Turn skipped.`);
            return;
        }

        if (nextPosition === this.board.getSize()) {
            player.setPosition(nextPosition);
            this.winner = player;
            this.status = GameStatus.FINISHED;
            console.log(`Hooray! ${player.getName()} reached the final square ${this.board.getSize()} and won!`);
            return;
        }

        const finalPosition = this.board.getFinalPosition(nextPosition);

        if (finalPosition > nextPosition) { // Ladder
            console.log(`Wow! ${player.getName()} found a ladder 🪜 at ${nextPosition} and climbed to ${finalPosition}.`);
        } else if (finalPosition < nextPosition) { // Snake
            console.log(`Oh no! ${player.getName()} was bitten by a snake 🐍 at ${nextPosition} and slid down to ${finalPosition}.`);
        } else {
            console.log(`${player.getName()} moved from ${currentPosition} to ${finalPosition}.`);
        }

        player.setPosition(finalPosition);

        if (roll === 6) {
            console.log(`${player.getName()} rolled a 6 and gets another turn!`);
            this.takeTurn(player);
        }
    }

    // Static method to create Builder
    static builder(): GameBuilder {
        return new GameBuilder();
    }
}

// Builder class
class GameBuilder {
    board?: Board;
    players?: Player[];
    dice?: Dice;

    setBoard(boardSize: number, boardEntities: BoardEntity[]): GameBuilder {
        this.board = new Board(boardSize, boardEntities);
        return this;
    }

    setPlayers(playerNames: string[]): GameBuilder {
        this.players = [];
        for (const playerName of playerNames) {
            this.players.push(new Player(playerName));
        }
        return this;
    }

    setDice(dice: Dice): GameBuilder {
        this.dice = dice;
        return this;
    }

    build(): Game {
        if (!this.board || !this.players || !this.dice) {
            throw new Error("Board, Players, and Dice must be set.");
        }
        return new Game(this);
    }
}