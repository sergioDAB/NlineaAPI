const users= require('../models/user'); // para acceder a los metodos



module.exports=function (app) {

    app.get('/users',function (req,res) {
        users.getUsers((err,data)=>{
            res.json(data);
        });
    });

    app.post('/users',function (req,res) {
        const  userData={
            nickname: req.body.nickname,
            correo: req.body.correo,
            categoria: req.body.categoria,
            color: req.body.color
        };

        users.insertUser(userData,(err,data)=>{
            if(data){
                res.json({success:true})

            }else{
                res.status(500).json({
                    success:false,
                    msg: 'Error'
                })
            }
        })
    });




};