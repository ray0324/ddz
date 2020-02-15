const WebSocket = require("ws");
const Clients = require("./app/Clients");
const dispatch = require("./app/dispatch");

const wss = new WebSocket.Server({
  port: 8080,
  clientTracking: false,
});

// 用户id
var UID = 10001;

wss.on("connection", function connection(ws) {
  const uid = UID++;
  //创建新的连接
  Clients.set(uid, ws);
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
    dispatch(uid, message);
  });

  // console.log(wss.clients);

  // 广播在线用户
  for (let client of Clients.values()) {
    client.send(JSON.stringify([...Clients.keys()]));
  }
});
