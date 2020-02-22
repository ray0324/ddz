class Player {
  constructor(id, socket) {
    // 当前玩家ID
    this.id = id;
    // 当前玩家所连接的SOCET
    this.socket = socket;
    // 当前玩家的角色 -1 未分配  0 农民 1 地主
    this.role = -1;
    // 当前玩家的牌
    this.pokers = [];
    // 当前玩家所在房间
    this.room = null;
    // 当前玩家在房间的座位号
    this.seatNo = -1;
  }

  dispatch(type, msg) {
    console.log(this.id, type, msg);
    // this.socket.send(msg);
  }

  // 叫地主
  callTheLandlord() {
    // 未轮到当前玩家
    if (this.room.cur !== this.seatNo) {
      console.log(`未轮到Player[${this.id}]`);
      return;
    }

    // 底牌已经发了 不能再叫了
    if (this.remains.length === 0) {
      console.log(`地主已经确认，不能再叫！`);
      return;
    };

    this.room.sendRemains();
  }

  // 不叫地主 或者 不要
  passTheLandLord() {
    if (this.room.cur !== this.seatNo) {
      console.log(`未轮到Player[${this.id}]`);
      return;
    }
    this.room.getNextPlayer('CALL_LAND_LORD');
  }

  setRoom(room) {
    this.room = room;
  }

  // 设置该玩家再房间的序号
  setSeatNo(index) {
    this.seatNo = index;
  }

  // 设置角色
  setRole(role) {
    this.role = role;
  }
}

module.exports = Player;
