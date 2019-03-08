const Poker = require('./poker');
const Player = require('./player');
const debug = require('debug')('ddz');
// 超时时间
const TIME_OUT = 30000;
// 房间玩家数量
const PLAYERS_NUM = 3;

class Room {
  constructor(roomId,uid,socket) {
    this.roomId = roomId;
    // 玩家
    this.players = [];
    // 当前玩家
    this.currentIndex = -1;
    // 倒计时
    this.timeoutId = null;
    // 扑克牌底牌
    this.remains = null;
    // 添加默认玩家
    this.addPlayer(uid,socket);
  }

  // 初始化
  init() {
    const poker = new Poker();
    this.currentIndex = this.getRandomIndex();
    const { delivers, remains} = poker.deliver();
    //为每位玩家分牌
    this.players.forEach((player,idx)=>{
      player.pokers = delivers[idx];
      debug(player.id,delivers[idx]);
      player.socket.send(JSON.stringify(player.pokers));
    });
    this.remains = remains;
    debug(remains);
    this.sendRemains();
  }

  // 发底牌
  sendRemains() {
    this.players[this.currentIndex].socket.send(JSON.stringify(this.remains));
    this.remains = null;
  }

  // 随机一个玩家首先叫地主
  getRandomIndex() {
    return Math.floor(Math.random() * PLAYERS_NUM);
  }

  // 获取下一个玩家
  getNextPlayer(){
    this.currentIndex = this.currentIndex++ % PLAYERS_NUM;
    return this.players[this.currentIndex];
  }

  // 广播所有玩家
  broadcast(msg) {
    this.players.forEach(player=>{
      player.socket.send(msg);
    });
  }

  // 添加玩家
  addPlayer(uid,socket) {
    // 房间已经满了 不能进入
    if(this.players.length > PLAYERS_NUM) return null;
    this.players.push(new Player(uid,socket));
    return this.players;
  }
}

module.exports = Room;