import { Poker, Player } from "./index.mjs";

const pokerGame = new Poker();

const player1 = new Player("Carlos", 1000);
const player2 = new Player("Dan", 1000);

pokerGame.addPlayer(player1);
pokerGame.addPlayer(player2);

pokerGame.play();

const froyoFlavors = [
  "Vanilla",
  "Vanilla",
  "Strawberry",
  "Chocolate",
  "Pecan",
  "Pecan",
];

const orders = {};
orders.vanilla = "yummy";
orders.strawberry = 2;
orders.strawberry++;

for (let i = 0; i < froyoFlavors.length; i++) {
  if (!orders["Vanilla"]) {
    orders["Vanilla"] = 1;
  } else {
    orders["Vanilla"]++;
  }
}

const carlosObject = {
  name: "Carlos",
  favoriteFlavor: "Strawberry",
};

carlosObject.age = 33;
carlosObject.age++;

// carlosObject.name = "Jeffery";
// carlosObject.favoriteFlavor = "chocolate"; // Cannot Do dot notation

// console.log(carlosObject);

// carlosObject["favoriteFlavor"] = "chocolate"; // Bracket Notation
