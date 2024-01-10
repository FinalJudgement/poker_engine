class Player {
  constructor(name, chips) {
    this.name = name;
    this.hand = [];
    this.chips = chips;
  }
  introduce() {
    console.log(`Hi I am ${this.name}, I'm a ${this.type}`);
  }

  getHighCard() {
    const rankOrder = [
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Jack",
      "Queen",
      "King",
      "Ace",
    ];

    const highCard = this.hand.reduce((currentHighCard, card) => {
      const cardRank = card.split(" ")[0];
      const currentHighCardRank = currentHighCard.split(" ")[0];

      // Compare card ranks
      if (
        rankOrder.indexOf(cardRank) > rankOrder.indexOf(currentHighCardRank)
      ) {
        return card;
      } else {
        return currentHighCard;
      }
    }, this.hand[0]);

    return highCard;
  }
}

export default Player;
