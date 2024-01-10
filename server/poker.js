import readline from "readline";
import { evaluateHand } from "../utils/pokerUtils.js";
class Poker {
  #shuffleCount = 3;
  #handSize = 5;
  #deck = [];
  #hand = [];
  #handRank = "";
  #pot = 0;
  players = [];
  currentPlayerIndex = 0;
  playerActions = ["check", "bet", "raise", "call", "fold"];
  communityCards = [];

  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  constructor() {
    this.actions = ["check", "bet", "raise", "call", "fold"];
    this.round = ["Pre Flop", "Flop", "Turn", "River"];
    this.deck = [];
    this.suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
    this.ranks = [
      "Ace",
      "King",
      "Queen",
      "Jack",
      "Ten",
      "Nine",
      "Eight",
      "Seven",
      "Six",
      "Five",
      "Four",
      "Three",
      "Two",
    ];

    this.handRanks = {
      1: "High Card",
      2: "One Pair",
      3: "Two Pair",
      4: "Three of a Kind",
      5: "Straight",
      6: "Flush",
      7: "Full House",
      8: "Four of a Kind",
      9: "Straight Flush",
      10: "Royal Flush",
    };
    this.deck = this.buildDeck();
  }

  addPlayer(player) {
    this.players.push(player);
    console.log(`${player.name} has joined the game.`);
  }

  buildDeck() {
    const deck = [];
    for (let suit of this.suits) {
      for (let rank of this.ranks) {
        deck.push(`${rank} of ${suit}`);
      }
    }
    return deck;
  }

  shuffleDeck(shuffleCount) {
    for (let i = 0; i < shuffleCount; i++) {
      for (let i = this.deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
      }
    }
  }

  dealHands(players) {
    this.shuffleDeck(this.#shuffleCount);
    for (let player of players) {
      player.hand = this.deck.splice(0, 2);
    }
  }

  async getPlayerDecision(player) {
    return new Promise((resolve) => {
      this.rl.question(
        `${player.name}, do you want to (1) Check, (2) Bet, (3) Raise, (4) Call, or (5) Fold? `,
        async (answer) => {
          if (answer.trim() === "2") {
            console.log(`${player.name} chose ${this.actions[answer]}`);
            const betAmount = await this.getBetAmount(player);
            player.chips -= betAmount;
            resolve({ action: "Bet", amount: betAmount });
          } else {
            resolve({ action: this.actions[answer - 1], amount: 0 });
          }
        }
      );
    });
  }

  async getBetAmount(player) {
    return new Promise((resolve) => {
      this.rl.question(
        `Enter the bet amount for ${player.name}: `,
        (amount) => {
          resolve(parseInt(amount.trim()));
        }
      );
    });
  }

  dealCommunityCards(roundIndex) {
    const cardsToDeal = roundIndex === 0 ? 3 : 1;
    this.communityCards = this.communityCards.concat(
      this.deck.splice(0, cardsToDeal)
    );
  }

  findWinner(players) {
    players.sort((a, b) => b.handRank - a.handRank);

    const potentialWinners = [players[0]];

    // Find potential winners with the same hand rank
    for (let i = 1; i < players.length; i++) {
      if (players[i].handRank === players[0].handRank) {
        potentialWinners.push(players[i]);
      } else {
        break;
      }
    }

    // Handle tiebreaker if there are multiple potential winners
    if (potentialWinners.length > 1) {
      return this.resolveTiebreaker(potentialWinners);
    }

    return potentialWinners[0];
  }

  resolveTiebreaker(players) {
    // Assume that players have the same hand rank (e.g., Two Pair)
    const highCards = players.map((player) => player.getHighCard());

    const winnerIndex = highCards.reduce(
      (winnerIndex, card, currentIndex, array) => {
        const winnerCard = array[winnerIndex];

        // Compare card ranks
        if (
          this.ranks.indexOf(card.split(" ")[0]) >
          this.ranks.indexOf(winnerCard.split(" ")[0])
        ) {
          return currentIndex;
        } else {
          return winnerIndex;
        }
      },
      0
    );

    return players[winnerIndex];
  }

  async play() {
    this.dealHands(this.players);
    for (let roundIndex = 0; roundIndex < this.round.length; roundIndex++) {
      console.log(`\n-----  ${this.round[roundIndex]}  -----`);
      if (roundIndex > 0) {
        this.dealCommunityCards(roundIndex - 1);
        console.log(`Community Cards: ${this.communityCards.join(", ")}`);
      }

      for (let i = 0; i < this.players.length; i++) {
        console.log(`\n-----  ${this.players[i].name}'s Turn  -----`);
        console.log(`Community Cards: ${this.communityCards.join(", ")}`);
        console.log(`Player's Hand: ${this.players[i].hand.join(", ")}`);

        const currentPlayer = this.players[i];
        const decision = await this.getPlayerDecision(currentPlayer);
      }
      for (const player of this.players) {
        const handRank = evaluateHand(player, this.communityCards);
        console.log(`${player.name} has: ${this.handRanks[handRank]}`);
      }
    }

    const winner = this.findWinner(this.players);
    console.log(
      `\n${winner.name} wins with ${this.handRanks[winner.handRank]}!`
    );

    console.log(this.players);
    this.rl.close();
  }
}

export default Poker;
