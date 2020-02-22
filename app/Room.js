const Poker = require("./Poker");
const Player = require("./Player");
const uuid = require("uuid/v1");
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
    // 扑克牌底牌
    this.remains = [];

    // 积分器
    this.score = null;
  }

  // 初始化s
  init() {
    // 生成已经洗好的扑克
    const pokers = Poker.create();

    //为每位玩家分牌
    this.players.forEach((player, idx) => {
      player.pokers = pokers.slice(idx * 17, (idx + 1) * 17);
    });

    // 三张底牌
    this.remains = pokers.slice(51, 54);

    // 随机地主
    this.dispatchLandlord();

    debug(this.remains);
  }

  // 发底牌 并设置角色
  sendRemains() {
    //  底牌已经发出
    if (this.remains.length === 0) return;

    // 发底牌
    this.players[this.cur].pokers.push(...this.remains);
    this.remains = [];

    // 确立用户角色
    this.players.forEach((player, idx) => {
      if (idx !== this.cur) {
        // 农民
        player.setRole(0);
      } else {
        // 地主
        player.setRole(1);
      }
    });
  }

  // 获取下一个玩家
  getNextPlayer(type) {
    if (type === "CALL_LAND_LORD") {
      const next = this.cur + 1;
      this.cur = next % 3;
      this.broadcast("CALL_LAND_LORD", { index: this.cur });
    }
  }

  // 广播所有玩家
  broadcast(type, msg) {
    this.players.forEach(player => {
      player.dispatch(type, msg);
    });
  }

  // 随机地主
  dispatchLandlord() {
    const index = Math.floor(Math.random() * PLAYERS_NUM);
    this.cur = index;
    console.log(this.cur);
    this.broadcast("CALL_LAND_LORD", { index });
  }

  // 添加玩家
  addPlayer(player) {
    // 房间已经满了 不能进入
    if (this.players.length >= PLAYERS_NUM) return null;
    player.setRoom(this);
    player.setSeatNo(this.players.length);
    this.players.push(player);
  }
}

module.exports = Room;
