const WebSocket = require('ws');
const http =  require('http');
const url = require('url');
const jwt = require('jwt-simple');
const mongoose = require('mongoose');
const conf = require('./conf');
const app = require('./app');

const RoomList = require('./roomlist');

const roomList = new RoomList();

const connections = new Map();

// link db
mongoose.connect(conf.MONGODB_HOST,{ useNewUrlParser: true, useCreateIndex: true });

const server = http.createServer(app.callback());
const webSocketServer = new WebSocket.Server({ noServer: true });

function heartbeat() {
  // console.log('heartbeat');
  this.isAlive = true;
}

function noop(){}

function handleConnect(ws, uid) {

  const deprecated = connections.get(uid);
  // 用户已有链接 先断掉链接
  if(deprecated) deprecated.terminate();
  //创建新的连接
  connections.set(uid, ws);
  // 返回用户列表
  ws.send(JSON.stringify([...connections.keys()]));

  ws.on('message', msg => {
    console.log(msg);
    var roomId;
    if(msg ==='NEWROOM') {
      roomId = roomList.newRoom(uid,ws);
    }
    connections.forEach(function(socket, key) {
      console.log(key)
      if(key!==uid) socket.send(roomId);
    });
  });

  ws.on('pong', heartbeat);

  // 关闭链接
  ws.on('close',()=>connections.delete(uid))
}


function handleUpgrade(request, socket, head) {
  try {
    const { query } = url.parse(request.url);
    const token = new URLSearchParams(query).get("token");
    const user = jwt.decode(token, conf.APP_SECRET);
    webSocketServer.handleUpgrade(request, socket, head, ws => webSocketServer.emit('connection', ws, user.sub));
  } catch(e){
    socket.destroy();
  }
}

webSocketServer.on('connection', handleConnect);

// const interval = setInterval(function ping() {
//   webSocketServer.clients.forEach(function each(ws) {
//     if (ws.isAlive === false) return ws.terminate();

//     ws.isAlive = false;
//     ws.ping(noop);
//   });
// }, 5000);


server.on('upgrade', handleUpgrade);
server.listen(3000);

