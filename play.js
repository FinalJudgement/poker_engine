import { Poker, Player } from "./index.mjs";

const pokerGame = new Poker();

const player1 = new Player("Carlos", 1000);
const player2 = new Player("Dan", 1000);

pokerGame.addPlayer(player1);
pokerGame.addPlayer(player2);

pokerGame.play();
