//require('./../sockets/connection');

let gameModel={};

let colorGane="yellow";

let partidas=[];


/*se invoca con cada movimiento. Esta debe validar que el movimeinto sea válido y a la vez indicar donde se debe pintar la ficha.*/
gameModel.setPosc=(gameData,callback)=>{
    let fila= gameData.fila;
    let columna= gameData.columna;
    let tablero=gameData.tablero;
    let turno=gameData.turno;
    let color1=gameData.color1;
    let color2=gameData.color2;
    let nlinea=gameData.nlinea;

    let size=tablero.length;


    let ganadoraVertical;
    let ganadoraHorizontal;
    let ganadoraDiagonal;


    if((turno !== 0)&&(turno !==1)){ // solo le da un turno incial
        turno=0;
    }
    let color=turno===0? color1: color2;


    for(let i=tablero.length-1; i >= 0; i--){ // se debe buscar la fila mas abajo disponible
        if(tablero[0][columna].turno !== 2){
            callback(null, {turno: turno,tablero:tablero,color1:color1, color2:color2,nlinea:nlinea}); // regresa el tablero tal cual
            break;
        }else{
            if (tablero[i][columna].turno === 2) { // si esta disponible se regresa que se marque
                tablero[i][columna].turno = turno;
                tablero[i][columna].color = color;


                ganadoraVertical= vertical(size,nlinea,tablero);
                ganadoraHorizontal=horizontal(size,nlinea,tablero);
                //ganadoraDiagonal=diagonal(size,nlinea);

                if(ganadoraVertical.win==="true"){
                    tablero=resaltarColumnaGanadora(ganadoraVertical.filas, ganadoraVertical.columna,ganadoraVertical.tablero);
                }
                if(ganadoraHorizontal.win==="true"){
                    tablero=resaltarFilaGanadora(ganadoraHorizontal.fila, ganadoraHorizontal.columnas,ganadoraHorizontal.tablero);
                }
                /*if(ganadoraDiagonal.win==="true"){
                    resaltarDiagonalGanadora(ganadoraDiagonal.lista);
                }*/

                callback(null,{ turno: turno,tablero:tablero,color1:color1,color2:color2,nlinea:nlinea});
                break;
            }
        }
    }
    //vertical(size,nlinea);
};
//--------------------------------------------------- jugador automatico
jugadorAutomatico=function(tabl, turno,color){
    let n=tabl.length;
    let tab=tabl;

    for(let i=n-1; i>=0; i--){
        for(let j=n-1; j>=0;j--){
            if(tab[i][j].turno===2){
                tab[i][j].color= color;
                tab[i][j].turno= 1;
                return tab;
            }
        }
    }
};

gameModel.automatico=(gameData,callback)=>{
    let tab=gameData.tablero;
    let turno=gameData.turno;
    let color1=gameData.color1;
    let color2=gameData.color2;
    let color=turno===0? color1: color2;
    let nlinea=gameData.nlinea;

    let tabl=jugadorAutomatico(tab,turno,color);
    callback(null,{success:true,turno:turno, tablero: tabl, color1:color1, color2:color2 ,nlinea:nlinea});


};



/* funcion que se invoca al iniciar una partida. Permite conocer la configuracion del tablero para trabajar logicamente*/

gameModel.setConfig=(gameConfig,callback)=>{
    let size=gameConfig.size;
    let nlinea=gameConfig.nlinea;
    let color1=gameConfig.color1;
    let color2=gameConfig.color2;

    let tablero=[];

    if(nlinea > size){
        nlinea=size;
    }

    console.log("size  "+size + "   nilinea "+nlinea);
    for(let i=0;i < size; i++){
        let arreglo=[];
        for(let j=0; j < size;j++){
            arreglo.push({fila:i,columna: j, turno: 2, color: "black"});
        }
        tablero.push(arreglo);
    }

    callback(null,{success:true, tablero: tablero, color1:color1, color2:color2,nlinea:nlinea});

};


//-------------------recibe los parametros de una partida

gameModel.nuevaPartida=(gameConfig,callback)=>{

    let tam=gameConfig.size;
    let nl=gameConfig.nlinea;
    let cat=gameConfig.categoria;
    let cre=gameConfig.creador;

    let partida={"size": tam, "nlinea": nl, "categoria": cat, "creador": cre};

    partidas.push(partida);
    callback(null, {success:true, partidas: partidas});

};

gameModel.setPartida=(data,callback)=>{
    callback(null, {success:true, partidas: partidas});
};



// funciones para encontrar funciones ganadoras verticales-------------------------------------

vertical=function(size,n,tablero){ // saca las combinaciones verticales

    let lista=[];  // contiene sublistas de n elementos que forman una posible linea ganadora
    for(j=0; j<= size-n ; j++){
        let combinacion=[];
        for(let i=0; i<n; i++) {
            combinacion.push(i + j);
        }
        lista.push(combinacion);
    }

    for(let columna=0; columna< size; columna++){
        for(let i=0; i < lista.length; i++){ // por cada elemento de la lista verifico que sea una jugada ganadora
            if(combinacionGanadoraVertical(lista[i],columna,tablero)=== true){
                return {win: "true", filas: lista[i], columna: columna, tablero: tablero };
            }
        }
    }
    return {win: "false"}

};

combinacionGanadoraVertical=function(lista, columna,tablero){ // valida que la combinacion sea ganadora
    for (let i=0; i<lista.length;i++){
        if((tablero[lista[i]][columna].turno !== tablero[lista[0]][columna].turno)|| (tablero[lista[i]][columna].turno === 2)){
            return false;
        }
    }
    return true;
};

resaltarColumnaGanadora=function(filas, columna,tablero){

    for(let i=0; i<filas.length; i++){ // crea una estructura de pares [[f,c],[f,c],[f,c],[]...]
        tablero[filas[i]][columna].color=colorGane;
    }
    return tablero;
};

// funciones para encotrar las jugadas ganadoras horizontales---------------------------------------------------

horizontal=function(size,n,tablero){

    let lista=[];  // contiene sublistas de n elementos correspondientes a los
    for(j=0; j<= size-n ; j++){
        let combinacion=[];
        for(let i=0; i<n; i++) {
            combinacion.push(i + j);
        }
        lista.push(combinacion);
    }

    for(let fila=0; fila< size; fila++){
        for(let j=0; j < lista.length; j++){ // por cada elemento de la lista verifico que sea una jugada ganadora
            if(combinacionGanadoraHorizontal(fila,lista[j],tablero)=== true){
                return {win: "true", fila: fila, columnas: lista[j] ,tablero:tablero};
            }
        }
    }
    return {win: "false"}

};

combinacionGanadoraHorizontal=function(fila, lista,tablero){ // valida que la combinacion sea ganadora
    for (let i=0; i<lista.length;i++){
        if((tablero[fila][lista[i]].turno !== tablero[fila][lista[0]].turno)|| (tablero[fila][lista[i]].turno === 2)){
            return false;
        }
    }
    return true;
};

resaltarFilaGanadora=function(fila, columnas,tablero){

    for(let j=0; j<columnas.length; j++){
        tablero[fila][columnas[j]].color=colorGane;
    }
    return tablero;
};


/*
//diagonales----------------------------------------------------------------------------------------------------

diagonal=function(size,n){

    let lista=[];   // deben quedar todas las combinaciones diagonales validas
    for(let i=0; i< size ; i++){    //i=0,1,2,3
        for(let j=0; j<size; j++) { // j=0,1,2,3,4
            lista.push(desarrollar(i,j,size,n));
            lista.push(desarrollar2(i,j,size,n));
        }
    }


    for(let i=0;i<lista.length;i++){
        if(lista[i].length===size){
            console.log(lista[i]);
            if(diagonalGanadora(lista[i])=== true){
                return {win: "true", lista: lista[i] }
            }
        }
    }
    return {win: "false"}

};

diagonalGanadora=function(mat){ // recibe una diagonal [[f,c],[f,c],[f,c]....]
    for(let i=0; i<mat.length; i++){
        if((tablero[mat[i][0]][mat[i][1]].turno !== tablero[mat[0][0]][mat[0][1]].turno)||(tablero[mat[i][0]][mat[i][1]].turno)===2){
            return false;
        }
    }
    console.log("alguien gano");
    return true;
};

resaltarDiagonalGanadora=function(lista){
    console.log("alguien gano");
    for(let i=0; i < lista.length; i++){ // crea una estructura de pares [[f,c],[f,c],[f,c],[]...]
        tablero[lista[i][0]][lista[i][1]].color=colorGane;
    }
};

desarrollar=function(f,c,s,n){ // hace las combinaciones posibles diagonales izq-arriba a derecha-abajo
    let lista=[];

    let det=f > c? f:c;
    for(let i=0;i< s-det;i++){
        let e=[];
        e.push(f+i);
        e.push(c+i);
        lista.push(e);
        if(lista.length===n)break;
    }
    return lista;
};

desarrollar2=function(f,c,s,n){
    let lista=[];

    for(let i=0; i<= c; i++){ //fila ++   columna--   entre menor sea la fila mas conviene
        let e=[];
        if(f+i >= s){
            break;
        }
        e.push(f+i);
        e.push(c-i);
        lista.push(e);
        if(lista.length===n)break;
    }
    return lista;

};


*/

module.exports=gameModel;
