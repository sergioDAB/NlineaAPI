
let gameModel={};
let tablero=[];

gameModel.getPosc=(callback)=>{
    callback(null,{fila: 5, columna: 5});
};


/*se invoca con cada movimiento. Esta debe validar que el movimeinto sea válido y a la vez indicar donde se debe pintar la ficha.*/
gameModel.setPosc=(gameData,callback)=>{
    for(i in tablero){
        if(i.fila===gameData.fila && i.columna===gameData.columna){
            if(i.turno===2){ // si esta disponible se regresa que se marque en esa pocicon
                i.turno=gameData.turno;
                callback(null,{fila: i.fila, columna:i.columna});
            }
        }
    }
    if(gameData.fila===0 && gameData.columna===0){
        callback(null,{fila:5, columna:3,turno:1, ganadora: true});
    }else{
        callback(null,{fila:5, columna:3});
    }

};
/* funcion que se invoca al iniciar una partida. Permite conocer la configuracion del tablero para trabajar logicamente*/

gameModel.setConfig=(gameConfig,callback)=>{
    for(let i=0;i<= gameConfig.size; i++){
        for(let j=0; j<=gameConfig.size; j++){
            tablero.push({fila:i,columan: j, turno: 2 });
        }
    }

    if(gameConfig.size < gameConfig.nlinea){
        callback(null,{success:false, msg:"numero de fichas en linea superior al tamaño del tablero"});
    }else{
        callback(null,{success:true, tablero: tablero}); // este no debe regresar nada, solo un succes true
    }

};

module.exports=gameModel;
