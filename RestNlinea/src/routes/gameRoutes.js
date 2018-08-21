const game= require('../models/game'); // para acceder a los metodos

module.exports=function (app) {

    app.get('/game',function (req,res) {
        game.getPosc((err,data)=>{
            res.json(data);
        });
    });

    app.post('/game',function (req,res) {
        const  gameData={
            fila: req.body.fila,
            columna: req.body.columna,
            turno: req.body.turno,
            ganadora: req.body.ganadora
        };

        game.setPosc(gameData,(err,data)=>{
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

    app.post('/config',function (req,res) {
        const  gameConfig={
            size: req.body.size,
            nlinea: req.body.nlinea
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