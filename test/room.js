const Room = require("../app/Room");
const Player = require("../app/Player");
const uuid = require("uuid/v1");

const room = new Room(uuid());

const p1 = new Player(1001, null);

const p2 = new Player(1002, null);

const p3 = new Player(1003, null);

room.addPlayer(p1);
room.addPlayer(p2);
room.addPlayer(p3);

room.init();


// room.broadcast();


console.log(room);

// 随机指定一个玩家为地主 开始叫地主
// room.randomLandlord();

console.log(p1);
console.log(p2);
console.log(p3);
