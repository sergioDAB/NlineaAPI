
let CLIENTS=[];
let id;

const WebSocketServer = require('ws').Server;
wss= new WebSocketServer({port:3002});

wss.on('connection',function connection(ws) {
    id = Math.random();
    CLIENTS[id] = ws;
    CLIENTS.push(ws);

    ws.on('message',function incoming(message) {
        console.log("recibido  :"+ message);
        if(message==="pc"){
            ws.send("id: "+ id);
        }
        else if(message==="partida"){
            sendAll("nueva partida");
        }

    });
});

function sendAll(message){
    for (let j=0; j < CLIENTS.length; j++) {
        console.log('FOR : ', message);
        CLIENTS[j].send(message);
    }
}

