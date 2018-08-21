
let gameModel={};
let tablero=[];


/*se invoca con cada movimiento. Esta debe validar que el movimeinto sea válido y a la vez indicar donde se debe pintar la ficha.*/

gameModel.setPosc=(gameData,callback)=>{
    let fila= gameData.fila;
    let columna= gameData.columna;
    let turno=gameData.turno;

    for(let i=tablero.length-1; i >= 0; i--){ // se debe buscar la fila mas abajo disponible
        if(tablero[0][columna].turno !== 2){
            callback(null, {success: false, msg: "la casilla no esta disponible"});
            break;
        }else{
            if (tablero[i][columna].turno === 2) { // si esta disponible se regresa que se marque
                tablero[i][columna].turno = turno;
                callback(null, {fila: i, columna: columna, turno: turno});
                break;
            }
        }
    }
};
/* funcion que se invoca al iniciar una partida. Permite conocer la configuracion del tablero para trabajar logicamente*/

gameModel.setConfig=(gameConfig,callback)=>{
    for(let i=0;i < gameConfig.size; i++){
        let arreglo=[];
        for(let j=0; j < gameConfig.size;j++){
            arreglo.push({fila:i,columna: j, turno: 2 });
        }
        tablero.push(arreglo);
    }
    if(gameConfig.size < gameConfig.nlinea){
        callback(null,{success:false, msg:"numero de fichas en linea superior al tamaño del tablero"});
    }else{
        callback(null,{success:true, tablero: tablero}); // este no debe regresar nada, solo un succes true
    }
};


module.exports=gameModel;
