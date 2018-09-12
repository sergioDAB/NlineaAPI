const game= require('../models/game'); // para acceder a los metodos
//const io = require('socket.io')(game);


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
        //ws.send(message);
        sendAll("nueva conexion");
    });
   
    //ws.send("nueva Conexion"); // envia mensaje a el mismo
    //sendAll("nueva conexion");
});

function sendAll(message){
    for (let j=0; j < CLIENTS.length; j++) {
        console.log('FOR : ', message);
        CLIENTS[j].send(message);
    }
}



module.exports=function (app) {

    /* escucha cuando venga un mensaje del navegador cliente
    io.on('connection', function (socket) {
        console.log("alguien se ha conectado con socekts");
    });*/


    app.post('/game',function (req,res) {
        const  gameData={ // datos que recibo del juego
            fila: req.body.fila,
            columna: req.body.columna,
            turno: req.body.turno
        };

        game.setPosc(gameData,(err,data)=>{
            if(data){
                res.json(data) // datos que regreso al juego

            }else{
                res.status(500).json({
                    success:false,
                    msg: 'Error'
                })
            }
        })
    });

    app.post('/config',function (req,res) {
        const  gameConfig={
            size: req.body.size,
            nlinea: req.body.nlinea,
            color1: req.body.color1,
            color2:req.body.color2
        };

        game.setConfig(gameConfig,(err,data)=>{
            if(data){
                res.json(data)

            }else{
                res.status(500).json({
                    success:false,
                    msg: 'Error'
                })
            }
        })
    });

    app.post('/nueva',function (req,res) {
        const  gameConfig={
            size: req.body.size,
            nlinea: req.body.nlinea,
            categoria: req.body.categoria,
            creador: req.body.creador
        };

        game.nuevaPartida(gameConfig,(err,data)=>{
            if(data){
                res.json(data)

            }else{
                res.status(500).json({
                    success:false,
                    msg: 'Error'
                })
            }
        })
    });

    // consulta el estado y variables para el manejo de las seciones y partidas

    app.post('/view',function (req,res) {
        const  gameData={ // datos que recibo del juego
            usuario: req.body.usuario,
        };

        game.setView(gameData,(err,data)=>{
            if(data){
                res.json(data) // datos que regreso al juego

            }else{
                res.status(500).json({
                    success:false,
                    msg: 'Error'
                })
            }
        })
    });

};