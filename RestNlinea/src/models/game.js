

let gameModel={};
let tablero=[];
let size;
let nlinea;
let color1;
let color2;
let colorGane="yellow";

let partidas=[];

let view= 'parametros';

// retorna la vista del juego

gameModel.setView=(gameData,callback)=>{
  let usuario= gameData.usuario;
  if(usuario=== 'sergio'){
      callback(null,{ view: view});
  }else{
      callback(null,{view:view})
  }
};


/*se invoca con cada movimiento. Esta debe validar que el movimeinto sea válido y a la vez indicar donde se debe pintar la ficha.*/
gameModel.setPosc=(gameData,callback)=>{
    let fila= gameData.fila;
    let columna= gameData.columna;
    let turno=gameData.turno;

    let ganadoraVertical;
    let ganadoraHorizontal;
    let ganadoraDiagonal;

    if((turno !== 0)&&(turno !==1)){ // solo le da un turno incial
        turno=0;
    }
    let color=turno===0? color1: color2;


    for(let i=tablero.length-1; i >= 0; i--){ // se debe buscar la fila mas abajo disponible
        if(tablero[0][columna].turno !== 2){
            callback(null, {
                turno: turno,tablero:tablero});
            break;
        }else{
            if (tablero[i][columna].turno === 2) { // si esta disponible se regresa que se marque
                tablero[i][columna].turno = turno;
                tablero[i][columna].color = color;

                console.log("recibo t: "+turno);
                turno=jugadorAutomatico(size,turno,color);
                console.log(" envio: "+turno);

                ganadoraVertical= vertical(size,nlinea);
                ganadoraHorizontal=horizontal(size,nlinea);
                //ganadoraDiagonal=diagonal(size,nlinea);

                if(ganadoraVertical.win==="true"){
                    resaltarColumnaGanadora(ganadoraVertical.filas, ganadoraVertical.columna);
                }
                if(ganadoraHorizontal.win==="true"){
                    resaltarFilaGanadora(ganadoraHorizontal.fila, ganadoraHorizontal.columnas);
                }
                /*if(ganadoraDiagonal.win==="true"){
                    resaltarDiagonalGanadora(ganadoraDiagonal.lista);
                }*/
                callback(null,{ turno: turno,tablero:tablero});
                break;
            }
        }
    }
    //vertical(size,nlinea);
};
/* funcion que se invoca al iniciar una partida. Permite conocer la configuracion del tablero para trabajar logicamente*/

gameModel.setConfig=(gameConfig,callback)=>{
    view= 'tablero';
    size=gameConfig.size;
    nlinea=gameConfig.nlinea;
    color1=gameConfig.color1;
    color2=gameConfig.color2;

    tablero=[];

    for(let i=0;i < gameConfig.size; i++){
        let arreglo=[];
        for(let j=0; j < gameConfig.size;j++){
            arreglo.push({fila:i,columna: j, turno: 2, color: "black"});
        }
        tablero.push(arreglo);
    }
    if(gameConfig.size < gameConfig.nlinea){
        callback(null,{success:false, msg:"numero de fichas en linea superior al tamaño del tablero"});
    }else{
        callback(null,{success:true, tablero: tablero}); // este no debe regresar nada, solo un succes true
    }
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

//--------------------------------------------------- jugador automatico


jugadorAutomatico=function(n, turno,color){

    let t = turno === 0? 1: 0; // para cambiar el turno
    let c = color===color1? color2: color1;

    for(let i=n-1; i>=0; i--){
        for(let j=n-1; j>=0;j--){
            if(tablero[i][j].turno===2){
                tablero[i][j].color= c;
                tablero[i][j].turno= t;
                return t;
            }
        }

    }
};

// funciones para encontrar funciones ganadoras verticales-------------------------------------

vertical=function(size,n){ // saca las combinaciones verticales

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
            if(combinacionGanadoraVertical(lista[i],columna)=== true){
                return {win: "true", filas: lista[i], columna: columna };
            }
        }
    }
    return {win: "false"}

};

combinacionGanadoraVertical=function(lista, columna){ // valida que la combinacion sea ganadora
    for (let i=0; i<lista.length;i++){
        if((tablero[lista[i]][columna].turno !== tablero[lista[0]][columna].turno)|| (tablero[lista[i]][columna].turno === 2)){
            return false;
        }
    }
    return true;
};

resaltarColumnaGanadora=function(filas, columna){

    for(let i=0; i<filas.length; i++){ // crea una estructura de pares [[f,c],[f,c],[f,c],[]...]
        tablero[filas[i]][columna].color=colorGane;
    }

};

// funciones para encotrar las jugadas ganadoras horizontales---------------------------------------------------

horizontal=function(size,n){

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
            if(combinacionGanadoraHorizontal(fila,lista[j])=== true){
                return {win: "true", fila: fila, columnas: lista[j] };
            }
        }
    }
    return {win: "false"}

};

combinacionGanadoraHorizontal=function(fila, lista){ // valida que la combinacion sea ganadora
    for (let i=0; i<lista.length;i++){
        if((tablero[fila][lista[i]].turno !== tablero[fila][lista[0]].turno)|| (tablero[fila][lista[i]].turno === 2)){
            return false;
        }
    }
    return true;
};

resaltarFilaGanadora=function(fila, columnas){

    for(let j=0; j<columnas.length; j++){
        tablero[fila][columnas[j]].color=colorGane;
    }
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
