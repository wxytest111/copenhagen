const Socketio = require("socket.io");
function WS(server) {
  this.socketio = new Socketio(server);
}
// 房间用户名单
var roomInfo = {};
WS.prototype.listenConnection = function () {
  if (socketio) {
    console.log('socket connect ..................')
    socketio.on("connect", (socket) => {
      // ws客户端的请求店铺ID
      var roomID = socket.handshake.query.shop_id;   // 获取房间ID
      var user = socket.id;
      // 将用户加入房间名单中
      if (!roomInfo[roomID]) {
        roomInfo[roomID] = [];
      }
      roomInfo[roomID].push(user);
      socket.join(roomID,() => {
        console.log(`${user} client joins ${roomID} room`);
      });
    
      socket.on("disconnect", () => {
        // 从房间名单中移除
        var index = roomInfo[roomID].indexOf(user);
        if (index !== -1) {
          roomInfo[roomID].splice(index, 1);
        }

        socket.leave(roomID);    // 退出房间
        console.log(user + 'client leaves ' + roomID + ' room');
      })

    })
  }
};

WS.prototype.sendNew = function (msg) {
  if (socketio) {
    // console.log('roomInfo----------',roomInfo)
    // 验证如果用户不在房间内则不给发送
    // if (roomInfo[roomID].indexOf(user) === -1) {  
    //   return false;
    // }
    
    switch (msg.type) {
      case "add":
     
      if(roomInfo[msg.message.data.shop_id] && roomInfo[msg.message.data.shop_id].length > 0){
          socketio.to(msg.message.data.shop_id).emit("new", msg);
        }
        break;
      case "alarm":
        socketio.emit("alarm", msg);
        break;
      case "delete":
        socketio.emit("leave", msg);
        break;
          
        }
  }
};

module.exports = WS