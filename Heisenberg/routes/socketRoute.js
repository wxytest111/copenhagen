const WebSocket = require('ws');
var wss;

const connect = function(server){
    wss = new WebSocket.Server({server})
    wss.on('connection', function connection(ws, req) {
        console.log('connect successfully!');
    });
}
const sendMsg = function(data){
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

module.exports = {
    connect:connect,
    sendMsg:sendMsg
}