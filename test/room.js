const Room = require("../app/Room");
const Player = require("../app/Player");
const uuid = require('uuid/v1');

const room = new Room(uuid());

const p1 = new Player(1001, null);

const p2 = new Player(1002, null);

const p3 = new Player(1003, null);

room.addPlayer(p1);
room.addPlayer(p2);
room.addPlayer(p3);

room.init();

console.log(room);

room.sendRemains();

console.log(room);

