const WebSocket = require('ws');
const http =  require('http');
const url = require('url');
const jwt = require('jwt-simple');
const mongoose = require('mongoose');
const conf = require('./conf');
const app = require('./app');

const connections = require('./connections');
const handleMsg =  require('./handleMsg');

// 用户id
var UID = 10000;

// link db
mongoose.connect(conf.MONGODB_HOST,{ useNewUrlParser: true, useCreateIndex: true });

const server = http.createServer(app.callback());
const webSocketServer = new WebSocket.Server({ noServer: true });

function heartbeat() {
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
  for (let socket of connections.values()) {
    socket.send(JSON.stringify([...connections.keys()]));
  }
  // 处理业务逻辑
  ws.on('message', msg => handleMsg(msg,uid,ws));
  // 心跳包回应
  ws.on('pong', heartbeat);
  // 关闭链接
  ws.on('close',()=>connections.delete(uid));
}


function handleUpgrade(request, socket, head) {
  try {
    // const { query } = url.parse(request.url);
    // const token = new URLSearchParams(query).get("token");
    // const user = jwt.decode(token, conf.APP_SECRET);

    webSocketServer.handleUpgrade(request, socket, head, ws => webSocketServer.emit('connection', ws, UID++));

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

