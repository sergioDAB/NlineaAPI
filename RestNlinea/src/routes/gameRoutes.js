const game= require('../models/game'); // para acceder a los metodos

module.exports=function (app) {

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
};