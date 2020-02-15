const Poker = require("../app/Poker");

const poker = Poker.create();


console.log(poker);

const v = poker.map(p => {
  return Poker.parse(p);
});

console.log(v);
