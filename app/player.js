class Player {
  constructor(id, socket) {
    this.id = id;
    this.socket = socket;
    this.role = 0;
    this.pokers = [];
  }

  send(msg) {
    console.log(this.id, msg);
    // this.socket.send(msg);
  }

  setRoom(room) {
    this.room = room;
  }
  

}

module.exports = Player;
