const POKERS = [
  100,101,102,103,104,105,106,107,108,109,110,111,112,
  200,201,202,203,204,205,206,207,208,209,210,211,212,
  300,301,302,303,304,305,306,307,308,309,310,311,312,
  400,401,402,404,404,405,406,407,408,409,410,411,412,
  520,521
];

const SUIT = {
  1: 'SPADES', // 黑桃♠
  2: 'HEARTS', // 红桃♥
  3: 'CLUBS',  //梅花♣
  4: 'DIAMONDS', // 方块♦
  5: 'joker', // 王
}

class Poker {
  constructor(){
    this.pokers = this.getpokers()
  }

  getpokers() {
    return [...POKERS];
  }

  // 洗牌
  shuffle(){
    var len = this.pokers.length, i,temp;
    while(len>0){
      i = Math.floor(Math.random() * len--);
      temp = this.pokers[i];
      this.pokers[i] = this.pokers[len];
      this.pokers[len] = temp;
    }
  }

  // 发牌
  deliver() {
    this.shuffle();
    const delivers = [
      this.pokers.slice(0,17),
      this.pokers.slice(17,34),
      this.pokers.slice(34,51),
    ];
    const remains = this.pokers.slice(51);
    return {
      delivers, // 发出的牌
      remains // 底牌
    };
  }
}


module.exports = Poker;