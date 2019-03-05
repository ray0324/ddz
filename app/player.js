class Player {
  constructor(uid,socket) {
    this.uid = uid;
    this.socket =  socket;
    this.pokers = [];
  }
}


module.exports = Player;