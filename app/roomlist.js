const uuid = require('uuid/v4');
const Room = require('./room');


class RoomList {
  constructor() {
    this.roomList = [];
  }
  // 创建房间
  newRoom(uid,socket) {
    const roomId = uuid();
    const room = new Room(roomId,uid,socket);
    this.roomList.push(room);
    return roomId;
  }

  // 进入房间
  jionRoom(uid,roomId) {

  }

  // 进入房间
  quitRoom(uid,roomId) {

  }

  // 删除空房间
  removeRoom(){

  }
}

module.exports = RoomList;