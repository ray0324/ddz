const debug = require('debug')('ddz');
const uuid = require('uuid/v4');
const Room = require('./room');


class RoomList {
  constructor() {
    this.roomList = [];
  }

  // 创建房间
  newRoom(uid, socket) {
    const roomId = uuid();
    const room = new Room(roomId,uid,socket);
    this.roomList.push(room);
    debug(roomId,uid);
    return roomId;
  }

  // 进入房间
  jionRoom(uid,roomId,socket) {
    const room = this.findRoom(roomId);
    if(!room) return null;
    room.addPlayer(uid,socket);
    debug(roomId,uid);
    if(room.players.length == 3) {
      room.init();
    }
    return {
      roomId: room.roomId,
      players: room.players.map(player=>player.id)
    }
  }

  // 进入房间
  quitRoom(uid,roomId) {

  }

  // 列出房间信息
  listRoom() {
    return this.roomList.map(room=>{
      return {
        roomId: room.roomId,
        players: room.players.map(player=>player.id)
      }
    })
  }

  findRoom(roomId){
    return this.roomList.find(room=>room.roomId == roomId);
  }

  // 删除空房间
  removeRoom(){

  }
}

module.exports = RoomList;