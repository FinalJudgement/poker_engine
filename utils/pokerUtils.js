const evaluateHand = (player, communityCards) => {
  const allCards = [...player.hand, ...communityCards];
  const ranksCount = {};
  const suitsCount = {};

  for (const card of allCards) {
    const [rank, suit] = card.split(" of ");
    ranksCount[rank] = (ranksCount[rank] || 0) + 1;
    suitsCount[suit] = (suitsCount[suit] || 0) + 1;
  }

  if (hasRoyalFlush(allCards)) {
    player.handRank = 10; // Royal Flush
  } else if (hasStraightFlush(allCards)) {
    player.handRank = 9; // Straight Flush
  } else if (hasFourOfAKind(ranksCount)) {
    player.handRank = 8;
  } else if (hasFullHouse(ranksCount)) {
    player.handRank = 7; // Full House
  } else if (hasFlush(suitsCount)) {
    player.handRank = 6; // Flush
  } else if (hasStraight(allCards)) {
    player.handRank = 5; // Straight
  } else if (hasThreeOfAKind(ranksCount)) {
    player.handRank = 4; // Three of a Kind
  } else if (hasTwoPair(ranksCount)) {
    player.handRank = 3; // Two Pair
  } else if (hasOnePair(ranksCount)) {
    player.handRank = 2; // One Pair
  } else {
    player.handRank = 1; // High Card
  }

  return player.handRank;
};

const hasRoyalFlush = (cards) => {
  const royalFlushRanks = ["Ace", "King", "Queen", "Jack", "Ten"];
  //check each suit
  for (const suit of ["Hearts", "Spades", "Clubs", "Diamonds"]) {
    const royalFlushSuit = royalFlushRanks.map((rank) => `${rank} of ${suit}`);

    // check if the players hand and community cards have the royal flush
    if (royalFlushSuit.every((card) => cards.includes(card))) {
      return true;
    }
  }
  return false;
  // You need to check for both the player's hand and the community cards
};

const hasStraightFlush = (cards) => {
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

  const getRank = (card) => card.split(" ")[0];

  const sortedCards = cards.sort((a, b) => {
    return rankOrder.indexOf(getRank(a)) - rankOrder.indexOf(getRank(b));
  });

  const straightFlushCandidate = [];
  for (let i = 0; i < sortedCards.length - 4; i++) {
    straightFlushCandidate.push(sortedCards.slice(i, i + 5));

    const isStraightFlush = straightFlushCandidate[i].every(
      (card, index) =>
        index === 0 ||
        rankOrder.indexOf(getRank(card)) ===
          rankOrder.indexOf(getRank(straightFlushCandidate[i][index - 1])) + 1
    );

    if (isStraightFlush) {
      return true;
    }
  }

  return false;
};

const hasFourOfAKind = (ranksCount) => {
  for (const rank in ranksCount) {
    if (ranksCount[rank] === 4) {
      return true; // Found four cards of the same rank
    }
  }
  return false; // No four of a kind found
};

const hasFullHouse = (ranksCount) => {
  let hasThreeOfAKind = false;
  let hasPair = false;

  for (const rank in ranksCount) {
    if (ranksCount[rank] >= 3) {
      hasThreeOfAKind = true;
    } else if (ranksCount[rank] >= 2) {
      hasPair = true;
    }
  }

  return hasThreeOfAKind && hasPair;
};

const hasFlush = (suitsCount) => {
  for (const suit in suitsCount) {
    if (suitsCount[suit] >= 5) {
      return true;
    }
  }

  return false;
};

const hasStraight = (cards) => {
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

  // Create a set of unique ranks in the hand
  const uniqueRanks = new Set(cards.map((card) => card.split(" ")[0]));

  // Check for the presence of five consecutive ranks
  let consecutiveCount = 0;
  for (let i = 0; i < rankOrder.length; i++) {
    if (uniqueRanks.has(rankOrder[i])) {
      consecutiveCount++;
    } else {
      consecutiveCount = 0;
    }

    if (consecutiveCount === 5) {
      return true;
    }
  }

  return false;
};

const hasThreeOfAKind = (ranksCount) => {
  for (const rank in ranksCount) {
    if (ranksCount[rank] === 3) {
      return true; // Found four cards of the same rank
    }
  }
  return false; // No four of a kind found
};

const hasTwoPair = (ranksCount) => {
  let pairCount = 0;

  for (const rank in ranksCount) {
    if (ranksCount[rank] === 2) {
      pairCount++;
    }

    if (pairCount === 2) {
      return true; // Two pairs found
    }
  }

  return false;
};

const hasOnePair = (ranksCount) => {
  for (const rank in ranksCount) {
    if (ranksCount[rank] === 2) {
      return true; // Found one pair
    }
  }
  return false; // No pairs
};

export { evaluateHand };
