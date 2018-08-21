const pg=require('pg');

var conString="postgres://postgres:12345@localhost/Nlinea";
var client = new pg.Client(conString);
client.connect(); //cliente conectado a la base de datos


let userModel={};

userModel.getUsers=(callback)=>{
    if(client){
        client.query('select * from usuarios',(err,row)=>{
            if(err){
                throw err;
            }else{
                callback(null,row.rows);
            }
        })
    }
};

userModel.insertUser=(userData,callback)=>{
    if(client){
        client.query("insert into usuarios (nickname,correo,categoria,color) values ('"+userData.nickname+"','"+userData.correo+"',"+userData.categoria+",'"+userData.color +"')",
            (err,result)=>{
                if(err){
                    throw err;
                }else{
                    callback(null,{
                        'insertId':result.insertId
                    });
                }
            })
    }
};


module.exports=userModel;
