
const RoomList = require('./roomlist');
const connections = require('./connections');

const roomList = new RoomList();

module.exports = function handleMsg(msg,uid,socket){

  if(msg ==='NEWROOM') {
    roomList.newRoom(uid,socket);
    const rooms = roomList.listRoom();
    connections.forEach(function(socket, key) {
      if(key!==uid) socket.send(JSON.stringify(rooms));
    });
  }

  if(msg === 'JOINROOM') {
    const roomId = roomList.roomList[0].roomId;
    roomList.jionRoom(uid,roomId,socket);
  }
}
