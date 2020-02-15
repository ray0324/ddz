In this game, there are 13 types of combination that can be played:

// 1.  Single card - ranking from three (low) up to red joker (high) as explained
//     above
// 2.  Pair - two cards of the same rank, from three (low) up to two (high)
// 3.  Triplet - three cards of the same rank
// 4.  Triplet with an attached card - a triplet with any single card added, for
//     example 6-6-6-8. These rank according to the rank of the triplet - so for
//     example 9-9-9-3 beats 8-8-8-A.
// 5.  Triplet with an attached pair - a triplet with a pair added, like a full
//     house in poker, the ranking being determined by the rank of the triplet
//     for example Q-Q-Q-6-6 beats 10-10-10-K-K.
// 6.  Sequence - at least five cards of consecutive rank, from 3 up to ace -
//     for example 8-9-10-J-Q. Twos and jokers cannot be used.
// 7.  Sequence of pairs - at least three pairs of consecutive ranks, from 3 to A.
//     Twos and jokers cannot be used. For example 10-10-J-J-Q-Q-K-K.
// 8.  Sequence of triplets - at least  two triplets of consecutive ranks from
//     3 up to A. For example 4-4-4-5-5-5.
// 9.  Sequence of triplets with attached cards - an extra card is added to
//     each triplet. For example 7-7-7-8-8-8-3-6. The attached cards must be
//     different from all the triplets and from each other. Although triplets of
//     2 cannot be included, a 2 or a joker or one of each can be attached,
//     but not both jokers.
// 10. Sequence of triplets with attached pairs - an extra pair is attached to
//     each triplet. Only the triplets have to be in sequence - for example 
//     8-8-8-9-9-9-4-4-J-J. The pairs must be different in rank from each
//     other and from all the triplets. Although triplets of twos cannot be
//     included, twos can be attached. Note that attached single cards and
//     attached pairs cannot be mixed - for example 3-3-3-4-4-4-6-7-7 is not valid.
// 11. Bomb - four cards of the same rank. A bomb can beat everything except a
//     rocket, and a higher ranked bomb can beat a lower ranked one.
// 12. Rocket - a pair of jokers. It is the highest combination and beats
//     everything else, including bombs.
// 13. Quadplex set - there are two types: a quad with two single cards of
//     different ranks attached, such as 6-6-6-6-8-9, or a quad with two pairs
//     of different ranks attached, such as J-J-J-J-9-9-Q-Q. Twos and jokers
//     can be attached, but you cannot use both jokers in one quadplex set.
//     Quadplex sets are ranked according to the rank of the quad. Note that
//     a quadplex set can only beat a lower quadplex set of the same type,
//     and cannot beat any other type of combination. Also a quadplex set
//     can be beaten by a bomb made of lower ranked cards.


const MAPPERS = {
  0: "3",
  1: "4",
  2: "5",
  3: "6",
  4: "7",
  5: "8",
  6: "9",
  7: "10",
  8: "J",
  9: "Q",
  10: "K",
  11: "A",
  12: "2",
  20: "BLACK JOKER",
  21: "RED JOKER"
};

// 花色
const SUIT = {
  1: "SPADES", // 黑桃♠
  2: "HEARTS", // 红桃♥
  3: "CLUBS", //梅花♣
  4: "DIAMONDS", // 方块♦
  5: "JOKER" // 王
};

// 牌型
const CARD_TYPE = {
  SINGLE: '1', // 单张 - e.g 6
  PAIR: '2', // 对子 - e.g A-A
  TRIPLET:'3', // 三张 - e.g Q-Q-Q
  TRIPLET_WITH_SINGLE: '4', // 三带一 - e.g J-J-J-8
  TRIPLET_WITH_PAIR: '5', // 三带一对 - e.g 9-9-9-7-7
  SEQUENCE: '6', // 顺子 - e.g 2-4-5-6-7
  SEQUENCE_OF_PAIRS: '7', // 连对 - e.g 3-3-4-4-5-5
  SEQUENCE_OF_TRIPLETS:'8', //  飞机 - e.g 7-7-7-8-8-8
  SEQUENCE_OF_TRIPLETS_WITH_SINGLE:'9', // 飞机带单牌 - e.g 7-7-7-8-8-8-9-J
  SEQUENCE_OF_TRIPLETS_WITH_PAIRS:'10', // 飞机带对子 - e.g 7-7-7-8-8-8-J-J-Q-Q
  QUADPLEX: '11', // 四带二 - e.g 9-9-9-9-3-7
  QUADPLEX_WITH_PAIRs: '12', // 四带两对 - e.g 9-9-9-9-7-7-4-4
  BOMB: '13', // 炸弹 - e.g K-K-K-K
  ROCKET: '14', // 火箭 - e.g JOKER-JOKER
}


// 创建扑克牌并洗牌
function create() {
  const pokers = [];
  // 52张扑克牌
  for (let i = 0; i < 13; i++) {
    pokers.push(100 + i, 200 + i, 300 + i, 400 + i);
  }
  // 大小王
  pokers.push(520, 521);
  shuffle(pokers);
  return pokers;
}

// 洗牌
function shuffle(pokers) {
  var len = pokers.length,
    i,
    temp;
  while (len > 0) {
    i = Math.floor(Math.random() * len--);
    temp = pokers[i];
    pokers[i] = pokers[len];
    pokers[len] = temp;
  }
}

// 解析扑克牌
function parse(p) {
  // 花色
  const s = SUIT[Math.floor(p / 100)];
  // 点数
  const v = p % 100;
  // 牌面
  const t = MAPPERS[v];
  return { s, v, t };
}

// 扑克排序
function sort(pokers) {

}

module.exports = {
  create,
  parse
};
