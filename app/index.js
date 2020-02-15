const WebSocket = require('ws');
const http = require('http');

const connections = require('./sockets');
const dispatch = require('./dispatch');

// 用户id
var UID = 10000;


const server = http.createServer();
const webSocketServer = new WebSocket.Server({ noServer: true });

function heartbeat() {
  this.isAlive = true;
}

function noop() {}

function handleConnect(ws, uid) {
  const deprecated = connections.get(uid);
  // 用户已有链接 先断掉链接
  if (deprecated) deprecated.terminate();
  //创建新的连接
  connections.set(uid, ws);
  // 返回用户列表
  for (let socket of connections.values()) {
    socket.send(JSON.stringify([...connections.keys()]));
  }
  // 处理业务逻辑
  ws.on('message', msg => dispatch(msg, uid, ws));
  // 心跳包回应
  ws.on('pong', heartbeat);
  // 关闭链接
  ws.on('close', () => connections.delete(uid));
}

function handleUpgrade(request, socket, head) {
  try {

    webSocketServer.handleUpgrade(request, socket, head, ws =>
      webSocketServer.emit('connection', ws, UID++),
    );
  } catch (e) {
    socket.destroy();
  }
}

webSocketServer.on('connection', handleConnect);


server.on('upgrade', handleUpgrade);
server.listen(3000);
