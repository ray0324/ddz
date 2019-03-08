class Player {
  constructor(id,socket) {
    this.id = id;
    this.socket =  socket;
    this.pokers = [];
  }
}

module.exports = Player;