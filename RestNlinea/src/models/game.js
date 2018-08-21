
let gameModel={};
let tablero=[];


/*se invoca con cada movimiento. Esta debe validar que el movimeinto sea válido y a la vez indicar donde se debe pintar la ficha.*/
gameModel.setPosc=(gameData,callback)=>{
    let fila= gameData.fila;
    let columna= gameData.columna;
    let turno=gameData.turno;
    for(let i=0; i< tablero.length; i++){
        if(tablero[i].fila===fila && tablero[i].columna===columna) {
            if (tablero[i].turno === 2) { // si esta disponible se regresa que se marque en esa pocicon
                tablero[i].turno = turno;
                callback(null, {fila: fila, columna: columna, turno: turno});
                break;
            } else {
                callback(null, {success: false, msg: "la casilla no esta disponible"});
                break;
            }
        }
    }
    callback(null, {success:false, msg: "no se encontro la ficha"});


};
/* funcion que se invoca al iniciar una partida. Permite conocer la configuracion del tablero para trabajar logicamente*/

gameModel.setConfig=(gameConfig,callback)=>{
    for(let i=0;i<= gameConfig.size; i++){
        for(let j=0; j<=gameConfig.size; j++){
            tablero.push({fila:i,columna: j, turno: 2 });
        }
    }

    if(gameConfig.size < gameConfig.nlinea){
        callback(null,{success:false, msg:"numero de fichas en linea superior al tamaño del tablero"});
    }else{
        callback(null,{success:true, tablero: tablero}); // este no debe regresar nada, solo un succes true
    }

};

module.exports=gameModel;
