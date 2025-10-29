import { BoardEntity } from "./entities/boardEntity";
import { Dice } from "./entities/dice";
import { Ladder } from "./entities/ladder";
import { Snake } from "./entities/snake";
import { Game } from "./game";

class SnakeAndLadderDemo {
    static main(): void {
        const boardEntities: BoardEntity[] = [
            new Snake(17, 7), new Snake(54, 34),
            new Snake(62, 19), new Snake(98, 79),
            new Ladder(3, 38), new Ladder(24, 33),
            new Ladder(42, 93), new Ladder(72, 84)
        ];

        const players: string[] = ["Alice", "Bob", "Charlie"];

        const game = Game.builder()
            .setBoard(100, boardEntities)
            .setPlayers(players)
            .setDice(new Dice(1, 6))
            .build();

        game.play();
    }
}

// Run the demo
SnakeAndLadderDemo.main();