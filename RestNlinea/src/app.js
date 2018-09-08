const express=require('express');
const app=express();

/*
var server = require('http').Server(app);
var io = require(socket.io)(serve);


io.connect('connection',function (socket) {
    console.log("conexion con el scket");
});

*/
const morgan=require('morgan');
const bodyParser=require('body-parser');

app.set('port',process.env.PORT || 3001);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.listen(app.get('port'),()=>{
    console.log("running on port 3001");

});

require('./routes/userRoute')(app);
require('./routes/gameRoutes')(app);

/*
* create table usuarios(
	nickname varchar(30),
	correo varchar (30),
	categoria int ,
	color varchar(30)
);
* */