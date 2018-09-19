const game= require('../models/game'); // para acceder a los metodos
module.exports=function (app) {

    app.post('/game',function (req,res) {
        const  gameData={ // datos que recibo del juego
            fila: req.body.fila,
            columna: req.body.columna,
            tablero:req.body.tablero,
            turno: req.body.turno,
            color1:req.body.color1,
            color2:req.body.color2,
            nlinea:req.body.nlinea
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

    // retorna las partidas

    app.post('/partidas',function (req,res) {
        game.setPartida(req,(err,data)=>{
            if(data){
                res.json(data) // datos que regreso al juego
            }
        })
    });

    app.post('/automatico',function (req,res) {
        const  gameConfig={
            tablero: req.body.tablero,
            turno:req.body.turno,
            color1:req.body.color1,
            color2:req.body.color2,
            nlinea:req.body.nlinea
        };

        game.automatico(gameConfig,(err,data)=>{
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


};