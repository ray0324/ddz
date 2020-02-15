const RoomList = require('./RoomList');
const Clients = require('./Clients');

const roomList = new RoomList();

module.exports = function dispatch(uid, msg) {
  if (msg === 'NEWROOM') {
    roomList.newRoom(uid);
    const rooms = roomList.listRoom();
    Clients.forEach(function(client, key) {
      if (key !== uid) client.send(JSON.stringify(rooms));
    });
  }

  if (msg === 'JOINROOM') {
    const roomId = roomList.roomList[0].roomId;
    roomList.jionRoom(uid, roomId, client);
  }
};
