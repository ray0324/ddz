const Poker = require("./Poker");
const Player = require("./Player");
const uuid = require('uuid/v1');
const debug = require("debug")("ddz");

// 房间玩家数量
const PLAYERS_NUM = 3;

class Room {
  constructor(roomId) {
    // 房间号码
    this.roomId = roomId;
    // 玩家
    this.players = [];
    // 当前玩家
    this.cur = -1;
    // 地主
    this.landLoadIdx = -1;

    // 扑克牌底牌
    this.remains = [];

    // 积分器
    this.score = null;

  }

  // 初始化s
  init() {
    // 生成已经洗好的扑克
    const pokers = Poker.create();

    // 随机地主
    this.cur = this.getRandomIndex();

    //为每位玩家分牌
    this.players.forEach((player, idx) => {
      player.pokers = pokers.slice(idx * 17, (idx + 1) * 17);
    });

    // 三张底牌
    this.remains = pokers.slice(51, 54);

    debug(this.remains);

  }

  // 发底牌
  sendRemains() {
    this.landLoadIdx = this.cur;
    this.players[this.cur].pokers.push(...this.remains);
  }

  // 随机地主
  getRandomIndex() {
    return Math.floor(Math.random() * PLAYERS_NUM);
  }



  // 获取下一个玩家
  getNextPlayer() {
    this.cur = this.cur++ % PLAYERS_NUM;
    return this.players[this.cur];
  }

  // 广播所有玩家
  broadcast(msg) {
    this.players.forEach(player => {
      player.send(msg);
    });
  }

  // 添加玩家
  addPlayer(player) {
    // 房间已经满了 不能进入
    if (this.players.length > PLAYERS_NUM) return null;
    player.setRoom(this);
    this.players.push(player);
  }
}

module.exports = Room;
