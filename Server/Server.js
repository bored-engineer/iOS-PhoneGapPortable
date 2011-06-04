require('./autoreleasepool');
var iOS = require('./node-iOS');
var ws = require('./websocket-server');

var server = ws.createServer();

var permissions = {};

// Handle WebSocket Requests
server.addListener("connection", function(conn){
    console.log(conn);
    permissions[conn.id] = {};
    conn.addListener("message", function(message){
        var Data = JSON.parse(message);
        if(Data['req'] == undefined){
        }else{
            console.log(Data['req']);
        }
    });
});

server.listen(8000);