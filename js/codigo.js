window.addEventListener("load",inicio);

function inicio (){
    precargarDatos();
    ocultarTodo();
    mostrarTablaInmuebles();
    

    document.querySelector("#mnuIngresar").addEventListener("click",mostrarIngresar);
    document.querySelector("#btnLogin").addEventListener("click",login);
    document.querySelector("#mnuLogoutAdmin").addEventListener("click",logout);
    document.querySelector("#mnuLogoutHuesped").addEventListener("click",logout);
    document.querySelector("#mnuLogoutAnfitrion").addEventListener("click",logout);
    document.querySelector("#mnuRegistro").addEventListener("click",mostrarRegistro);
    document.querySelector("#btnAltaHuesped").addEventListener("click",registroUsuarios);
    document.querySelector("#mnuAddInmuebles").addEventListener("click",mostrarRegistroInmueble);
    document.querySelector("#btnRegistroInmueble").addEventListener("click",registroInmueble);
    document.querySelector("#btnMoneda").addEventListener("click",seleccionarMoneda);
    document.querySelector("#btnBuscar").addEventListener("click",inputBusqueda);
    document.querySelector("#mnuAltaAnfitrion").addEventListener("click",mostrarAltaAnfitrion);
    document.querySelector("#btnAltaAnfitrion").addEventListener("click",registroAnfitrion);
    document.querySelector("#btnCotizacion").addEventListener("click",ingresarCotizacion);
    document.querySelector("#homeVisitante").addEventListener("click",vistaHome);
    document.querySelector("#homeHuesped").addEventListener("click",vistaHome);
    document.querySelector("#homeAnfitrion").addEventListener("click",vistaHome);
    document.querySelector("#homeAdmin").addEventListener("click",vistaHome);
 


      

}
//variables y listas globales
let listaUsuarios=[];
let usuarioLogueado=null;
let listaInmuebles=[];
let cotizacion=43;
let monedaElegida=1;
let listaInmueblesAnfitrion=[];
let listaInmueblesBusqueda=[];
let inmuebleSeleccionado=null; 






//FUNCIONES DE INTERFAZ DE USUARIO

function ocultarTodo(){
    document.querySelector("#login").style.display="none";
    document.querySelector("#menuAdmin").style.display="none";
    document.querySelector("#menuHuesped").style.display="none";
    document.querySelector("#menuAnfitrion").style.display="none";
    document.querySelector("#anfitrionContenido").style.display="none";
    document.querySelector("#registroHuesped").style.display="none";
    document.querySelector("#huespedContenido").style.display = "none";
    document.querySelector("#adminContenido").style.display = "none";
    document.querySelector("#agregarInmueble").style.display = "none";
    document.querySelector("#cabezalFuncionalidades").style.display="none";
    document.querySelector("#altaAnfitrion").style.display="none";


}
function mostrarIngresar(){
    ocultarTodo();
    document.querySelector("#visitanteContenido").style.display = "none";
    document.querySelector("#login").style.display="block";

}
function login (){
        let usuario = document.querySelector("#txtUsuario").value;
        let pass = document.querySelector("#txtPass").value;

        if (!existeUsuario(usuario)){
            document.querySelector("#mensajesLogin").innerHTML = "Usuario no existente";
        }
        else 
        {
            let unUsuario = buscarUsuario(usuario);
            
            if (unUsuario.clave == pass){
            // Guardar el usaurio logueado
            usuarioLogueado = unUsuario;
                //verificar el rol
            vistaHome();


            //vaciar cajitas 
            document.querySelector("#txtUsuario").value= "";
            document.querySelector("#txtPass").value= "";
            document.querySelector("#mensajesLogin").innerHTML= ""

             // Ocultar el login                
            document.querySelector("#login").style.display = "none";

            }
            else {
                document.querySelector("#mensajesLogin").innerHTML = "La clave es incorrecta";
            }           
        }

}
function vistaHome(){
    ocultarTodo();
    //verificar el rol

    if (usuarioLogueado!=null){
        switch (usuarioLogueado.rol) { 
            case 1: {
                // Es un administrador
                document.querySelector("#menuVisitante").style.display = "none";
                document.querySelector("#menuAdmin").style.display = "block";
                document.querySelector("#contenido").style.display="block";
                document.querySelector("#adminContenido").style.display = "block";
                document.querySelector("#visitanteContenido").style.display = "none";
                break;
            }
            case 2: {
                // Es un usuario huesped
                document.querySelector("#menuVisitante").style.display = "none";
                document.querySelector("#menuHuesped").style.display = "block";
                document.querySelector("#contenido").style.display="block";
                mostrarTablaInmuebles();
                document.querySelector("#visitanteContenido").style.display = "block"; 
                //El contenido de ambos usuarios el mismo. La única diferencia es el ver más y ya está configurado en la función
                break;
            }      
            case 3: {
                // Es un usuario anfitrion
                document.querySelector("#menuVisitante").style.display = "none";
                document.querySelector("#menuAnfitrion").style.display = "block";
                document.querySelector("#contenido").style.display="block";
                document.querySelector("#anfitrionContenido").style.display = "block";
                document.querySelector("#visitanteContenido").style.display = "none";
                mostrarTablaInmueblesAnfitrion();
                break;
            }
        }
    }else 
    {
        // Es un usuario visitante
        document.querySelector("#menuVisitante").style.display = "block";
        document.querySelector("#contenido").style.display="block";
        mostrarTablaInmuebles();
        document.querySelector("#visitanteContenido").style.display = "block"; 
    }
                    
}



function logout(){
    cerrarSesion();
    ocultarTodo();
    document.querySelector("#menuVisitante").style.display = "block";
    document.querySelector("#visitanteContenido").style.display = "block";
    mostrarTablaInmuebles();

}

function mostrarRegistro(){
    ocultarTodo();
    document.querySelector("#registroHuesped").style.display="block";
    document.querySelector("#visitanteContenido").style.display="none";

}

function registroUsuarios(){
    let mail=document.querySelector("#mailAlta").value;
    let nombre=document.querySelector("#nombreAlta").value;
    let apellido=document.querySelector("#apellidoAlta").value;
    let cel=document.querySelector("#celAlta").value;
    let pass=document.querySelector("#passAlta").value;
    let pass2=document.querySelector("#pass2Alta").value;
    let mensaje="";

    if(validarRegistro(mail,cel,pass,pass2)){
        if(agregarUsuario(nombre,apellido,mail,cel,pass,2)){
            mensaje="<strong>¡Usuario agregado exitosamente!</strong>";
            // limpiar cajas
            document.querySelector("#mailAlta").value="";
            document.querySelector("#nombreAlta").value="";
            document.querySelector("#apellidoAlta").value="";
            document.querySelector("#celAlta").value="";
            document.querySelector("#passAlta").value="";
            document.querySelector("#pass2Alta").value="";
        } else
        {
            mensaje="El usuario ya existe";
        }
        
    } else
    {
        if (!validarCamposVacios(mail,nombre,apellido,cel,pass,pass2)){
            mensaje+="Los campos no pueden estar vacíos";
        }
    
        if (!validarMail(mail)){
            mensaje+="Correo con formato incorrecto <br>";
        }
    
        if (!validarCel(cel)){
            mensaje+="El celular debe contener sólo números y su largo debe ser de 8 caracteres <br>";
        }
    
        if(!validarPass(pass,pass2)){
            mensaje+="La contraseña debe tener un formato válido <br>";
        }
    }
    document.querySelector("#mensajesRegistrarse").innerHTML=mensaje;

}
function mostrarRegistroInmueble(){
    ocultarTodo();
    document.querySelector("#menuAnfitrion").style.display="block";
    document.querySelector("#agregarInmueble").style.display="block";
}

function registroInmueble (){
    let titulo=document.querySelector("#tituloInmueble").value;
    let ciudad=document.querySelector("#ciudadInmueble").value;
    let descripcion=document.querySelector("#descripcionInmueble").value;
    let precio=Number(document.querySelector("#precioInmueble").value);
    let foto1=document.querySelector("#foto1Inmueble").value;
    let foto2=document.querySelector("#foto2Inmueble").value;
    let foto3=document.querySelector("#foto3Inmueble").value;
    let mensaje="";

    if(agregarInmueble(titulo,ciudad,descripcion,precio,foto1,foto2,foto3)){
        mensaje="El inmueble se ha agregado exitosamente";
        // limpia cajas
        document.querySelector("#tituloInmueble").value="";
        document.querySelector("#ciudadInmueble").value="";
        document.querySelector("#descripcionInmueble").value="";
        document.querySelector("#precioInmueble").value="";
        document.querySelector("#foto1Inmueble").value="";
        document.querySelector("#foto2Inmueble").value="";
        document.querySelector("#foto3Inmueble").value="";

    }else
    {
        mensaje="Ningún campo puede estar vacío";
    }
    document.querySelector("#mensajesRegistroInmueble").innerHTML=mensaje;
}
function mostrarTablaInmuebles(){
    document.querySelector("#cabezalFuncionalidades").style.display="block";
    let textoTabla="";

    listaInmuebles.sort(comparadorPrecio);

    for (let pos=0; pos<listaInmuebles.length;pos++){
        let dolares="USD";
        let pesos='$U';
        let unInmueble=listaInmuebles[pos];

        let sumaCalificaciones=0;
        
        for (let cal=0; cal<unInmueble.listaCalificacion.length;cal++){
            let unaCalificacion=unInmueble.listaCalificacion[cal];
            sumaCalificaciones+=unaCalificacion;
        }
        if (unInmueble.listaCalificacion.length!=0){
            let promedioCalificaciones=sumaCalificaciones/unInmueble.listaCalificacion.length;
        }else 
        {
            promedioCalificaciones="Sin calificar"
        }
    

        textoTabla+="<div><table class='tablaInmueble'>";
        textoTabla+="<tr>";
        textoTabla+="<td class='tdFoto'><img class='fotoInmueble' src='imagenes/"+ unInmueble.foto1+"'</td>";
        textoTabla+="<td> <h2>"+unInmueble.titulo+"</h2><h4>";

        if (monedaElegida==1){
            textoTabla+=pesos+ unInmueble.precio;
        }
        else
        {
            textoTabla+=dolares+ Math.round(unInmueble.precio/cotizacion);
        }

        textoTabla+=" por noche.</h4>";
        textoTabla+="<p class='textosInmueble'><strong>"+unInmueble.ciudad+"</strong></p>";
        textoTabla+="<p class='textosInmueble'><strong>Calificación: </strong>"+promedioCalificaciones+"</p>";
        textoTabla+="<p class='textosInmueble'><strong>Descripción:</strong> "+unInmueble.descripcion + "</p>";
        
        if (usuarioLogueado!=null){
            textoTabla +="<input id='t"+pos+"' type='button' value='Ver más...'>";
        }      
        textoTabla+="</td></tr></table>";    
        textoTabla+="<hr></div>"; 
    }
    document.querySelector("#tablaInmuebles").innerHTML=textoTabla; 


       // Asginar el evento clic dinamicamente a los botones
       if (usuarioLogueado!=null){
            for (let id=0;id<listaInmuebles.length;id++) {
                    document.querySelector("#t"+id).addEventListener("click", verMas);
            }
        }
        
  

}
function verMas(){
    let elementoHTML=this;
    let pos=Number(elementoHTML.id.substring(1));
    let unInmueble=listaInmuebles[pos];
    inmuebleSeleccionado=listaInmuebles[pos];//Cambiar parametros
    mostrarVerMas(unInmueble);

}

function mostrarVerMas(unInmueble){
    let HTMLVerMas="";
    
    HTMLVerMas+="<table><tr>";
    HTMLVerMas+="<td><img width='50px' src='imagenes/flecha_izq.jpg'></td>";
    HTMLVerMas+="<td><img class='fotoInmueble' src='imagenes/"+ unInmueble.foto1 +"'</td>";
    HTMLVerMas+="<td><img width='50px' src='imagenes/flecha_der.jpg'></td></tr></table>";

    HTMLVerMas+="<table>";
    HTMLVerMas+="<tr><td>Titulo:" + unInmueble.titulo + "</td><tr>";
    HTMLVerMas+="<tr><td>Ciudad:" + unInmueble.ciudad + "</td><tr>";
    HTMLVerMas+="<tr><td>Descripcion:" + unInmueble.descripcion + "</td><tr>";
    HTMLVerMas+="<tr><td>Precio por noche:" + unInmueble.precio + "</td><tr>";
    HTMLVerMas+="<tr><td>Calificacion:" + unInmueble.calificacion + "</td><tr>";
    HTMLVerMas+="</table>";

    
    HTMLVerMas+="<label for='cantNoches'>Ingrese la cantidad de noche</label>"
    HTMLVerMas+="<input type= 'number' id='cantNoches'>" 
    HTMLVerMas+="<input type= 'button' id='btnCantNoches' value='solicitar'><br>" 
    
    HTMLVerMas+="<div id='precioFinal'></div>"

    document.querySelector("#verMas").innerHTML=HTMLVerMas;
    document.querySelector("#tablaInmuebles").style.display = "none";

    document.querySelector("#btnCantNoches").addEventListener("click",mostrarPrecioFinal);

}


function verPrecioReserva(unInmueble){
    let valido=true
    let noches = Number (document.querySelector("#cantNoches").value);
    if (noches<=0){
    valido=false
    }
    let precio =  unInmueble.precio ;
    let resultado = noches*precio ;
    
   
    
    return resultado ;

}

function mostrarPrecioFinal() {
    let HTMLprecioFinal="";
    let textoMoneda="";
    let precioFinal=verPrecioReserva(inmuebleSeleccionado);

    if (monedaElegida==1){
        textoMoneda="$U";
    }
    if (monedaElegida==2){
        textoMoneda="USD";
    }
   
    HTMLprecioFinal+="<p>El precio de la reserva es de: "+textoMoneda+precioFinal+"</p>";
    HTMLprecioFinal+="<input type='button' id='btnConfirmarReserva' value='Confirmar'>";
    HTMLprecioFinal+="<div id='mensajeReserva'></div>";
    document.querySelector("#precioFinal").innerHTML=HTMLprecioFinal;
    
    document.querySelector("#btnConfirmarReserva").addEventListener("click",mensajeReserva);

}

function mensajeReserva(){
    let mensaje= "";
    
    if (validoCantNoches){
    mensaje="Su reserva se ha realizado con exito";

    }
    else {
        mensaje="Debe ingresar un numero valido";
    }
}




function comparadorPrecio(objeto1,objeto2){
//dado dos objetos, el sort va a devolver cuál está antes 
// El comparador SIEMPRE retorna un número entero
let resultado=0;
//si resultado < 0, esto significa que Objeto 1 debe estar antes que objeto 2
// si resultado es > 0, significa que Objeto 1 debe estar después que objeto 2 
// si resultado es = 0, están en el mismo lugar respecto al orden

    if (objeto1.precio<objeto2.precio){
        resultado=-1;
    }else 
    {
        if (objeto1.precio>objeto2.precio){
            resultado=1;
        }
    }
return resultado;
}
function comparadorCalificacion(objeto1,objeto2){
    //dado dos objetos, el sort va a devolver cuál está antes 
    // El comparador SIEMPRE retorna un número entero
    let resultado=0;
    //si resultado < 0, esto significa que Objeto 1 debe estar antes que objeto 2
    // si resultado es > 0, significa que Objeto 1 debe estar después que objeto 2 
    // si resultado es = 0, están en el mismo lugar respecto al orden
    
        if (objeto1.calificacion<objeto2.calificacion){
            resultado=-1;
        }else 
        {
            if (objeto1.calificacion>objeto2.calificacion){
                resultado=1;
            }
        }
    return resultado;
    }

function seleccionarMoneda(){
    let moneda=Number(document.querySelector("#txtMoneda").value);

    if (moneda==1){
        monedaElegida=moneda;
    }
    if (moneda==2){
        monedaElegida=moneda;
    }
    mostrarTablaInmuebles();
}


function mostrarTablaInmueblesAnfitrion(){
    let textoTabla="";
    generarListaInmueblesAnfitrion();

    for (let pos=0; pos<listaInmueblesAnfitrion.length;pos++){
        let pesos='$U';
        let unInmueble=listaInmueblesAnfitrion[pos];
        let textoBoton="";


        if(unInmueble.habilitado){
            textoBoton="Deshabilitar";
        }else 
        {
            textoBoton="Habilitar";
        }

        textoTabla+="<table class='tablaInmueble'>";
        textoTabla+="<tr>";
        textoTabla+="<td class='tdFoto'><img class='fotoInmueble' src='imagenes/"+ unInmueble.foto1+"'</td>";
        textoTabla+="<td> <h2>"+unInmueble.titulo+"</h2><h4>";

        textoTabla+=pesos+ unInmueble.precio;

        textoTabla+=" por noche.</h4>";
        textoTabla+="<p class='textosInmueble'><strong>"+unInmueble.ciudad+"</strong></p>";
        textoTabla+="<p class='textosInmueble'><strong>Calificación:</strong>"+unInmueble.listaCalificacion+"</p>";
        textoTabla+="<p class='textosInmueble'><strong>Descripción:</strong> "+unInmueble.descripcion + "</p>";
        
    
            textoTabla+="<input type='button' id='j"+pos+"value='"+textoBoton+"'></td></tr>";


        
        textoTabla+="</table>";    
        textoTabla+="<hr>"; 
    }
    document.querySelector("#tablaInmueblesAnfitrion").innerHTML=textoTabla; 


}


function habilitarDeshabilitar(){
    let elementoHTML=this;
    let pos=Number(elementoHTML.id.substring(1));

    let unInmueble=listaInmuebles[pos];

    if (unInmueble.habilitado){
        unInmueble.habilitado=false;
        elementoHTML.value="Habilitar"
    }else 
    {
    unInmueble.habilitado=true;
    elementoHTML.value="Deshabilitar"
    }
}
function inputBusqueda(){
    let texto=document.querySelector("#txtBuscar").value;

    buscarInmueble(texto);
}
function mostrarAltaAnfitrion(){
    document.querySelector("#altaAnfitrion").style.display="block";
    document.querySelector("#adminContenido").style.display = "none";

}
function registroAnfitrion (){
    let mail=document.querySelector("#mailAltaAnfitrion").value;
    let nombre=document.querySelector("#nombreAltaAnfitrion").value;
    let apellido=document.querySelector("#apellidoAltaAnfitrion").value;
    let cel=document.querySelector("#celAltaAnfitrion").value;
    let pass=document.querySelector("#passAltaAnfitrion").value;
    let pass2=document.querySelector("#pass2AltaAnfitrion").value;
    let mensaje="";

    if(validarRegistro(mail,cel,pass,pass2)){
        if(agregarUsuario(nombre,apellido,mail,cel,pass,3)){
            mensaje="<strong>¡Usuario agregado exitosamente!</strong>";
            // limpiar cajas
            document.querySelector("#mailAltaAnfitrion").value="";
            document.querySelector("#nombreAltaAnfitrion").value="";
            document.querySelector("#apellidoAltaAnfitrion").value="";
            document.querySelector("#celAltaAnfitrion").value="";
            document.querySelector("#passAltaAnfitrion").value="";
            document.querySelector("#pass2AltaAnfitrion").value="";
        } else
        {
            mensaje="El usuario ya existe";
        }
        
    } else
    {
        if (!validarCamposVacios(mail,nombre,apellido,cel,pass,pass2)){
            mensaje+="Los campos no pueden estar vacíos";
        }
    
        if (!validarMail(mail)){
            mensaje+="Correo con formato incorrecto <br>";
        }
    
        if (!validarCel(cel)){
            mensaje+="El celular debe contener sólo números y su largo debe ser de 8 caracteres <br>";
        }
    
        if(!validarPass(pass,pass2)){
            mensaje+="La contraseña debe tener un formato válido <br>";
        }
    }
    document.querySelector("#mensajesAltaAnfitrion").innerHTML=mensaje;
}
function ingresarCotizacion(){
    let valor=Number(document.querySelector("#txtCotizacion").value);

    cotizacion=valor;
    document.querySelector("#txtCotizacion").value="";
 
    document.querySelector("#mensajesCotizacion").innerHTML="<strong>¡Cotización ingresada con éxito!</strong>";

}











//FUNCIONES DE LÓGICA

function precargarDatos(){
    agregarUsuario("Carlos","Romano","admin","099333444","1234",1);
    agregarUsuario("Florencia","Romano","huesped","099333444","1234",2);
    agregarUsuario("Cecilia","Romano","anfitrion","099333444","1234",3);
    agregarUsuario("Olivia","Romano","olivia","099333444","1234",2);
    agregarUsuario("María","Romano","maria","099333444","1234",1);

    //HAY QUE QUITARLES LA KEY DE PROPIETARIO ACÁ Y EN LA CLASES.JS
    agregarInmueble("Casa en la playa","Montevideo","blaslk sldkfd sldkf ","500","foto1.jpg","foto2.jpg","foto3.jpg",usuarioLogueado)
    agregarInmueble("Casa en el campo","Maldonado","blaslk sldkfd sldkf ","700","foto4.jpg","foto5.jpg","foto6.jpg",usuarioLogueado)
    agregarInmueble("Casa en el río","Rocha","Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ","800","foto7.jpg","foto8.jpg","foto9.jpg")
}

function agregarUsuario(pNombre,pApellido,pMail,pCel,pClave,pRol){
    let ok=false;

    let unUsuario= new Usuario(pNombre,pApellido,pMail,pCel,pClave,pRol)
    if (!existeUsuario(pMail)){
        listaUsuarios.push(unUsuario);
        ok=true;
    }
    return ok;
}
function existeUsuario(pMail){
    let existe=false;
    for (let pos=0; pos<listaUsuarios.length;pos++){
        if (listaUsuarios[pos].mail==pMail){
            existe=true;
        }
    }
    return existe;
}
function buscarUsuario(pMail){
    let unUsuario=null;
    for (let pos=0; pos<listaUsuarios.length;pos++){
        if (listaUsuarios[pos].mail==pMail){
            unUsuario=listaUsuarios[pos];
        }
    }
    return unUsuario;
}

function agregarInmueble(pTitulo,pCiudad,pDescripcion,pPrecio,pFoto1,pFoto2,pFoto3){
    let ok=false;
    let foto1=pFoto1.substring((pFoto1.lastIndexOf("\\"))+1);
    let foto2=pFoto2.substring((pFoto2.lastIndexOf("\\"))+1);
    let foto3=pFoto3.substring((pFoto3.lastIndexOf("\\"))+1);

    let unInmueble= new Inmueble(pTitulo,pCiudad,pDescripcion,pPrecio,foto1,foto2,foto3);
    if (validaInmueble(pTitulo,pCiudad,pDescripcion,pPrecio,foto1,foto2,foto3)){
        listaInmuebles.push(unInmueble);
        ok=true;
    }
    return ok;
}
function validaInmueble(pTitulo,pCiudad,pDescripcion,pPrecio,pFoto1,pFoto2,pFoto3){
    let valida=true;

    if (pTitulo=="" || pCiudad=="" || pDescripcion=="" || pPrecio=="" || pFoto1=="" || pFoto2=="" || pFoto3==""){
        valida=false;
    }
    return valida;
}


function cerrarSesion(){
    usuarioLogueado=null;

}

function validarRegistro(pMail,pCel,pPass,pPass2){
    let valido=false;

    if (validarMail(pMail)&& validarCel(pCel)&& validarPass(pPass,pPass2)){
        valido=true;
    }
return valido;
}


function validarMail(pMail){
    let valida=false;
    if(pMail.includes("@") && pMail.includes(".")){
        valida=true;
    }
    return valida;
}
function validarCel(pCel){
    let valida=false;

    if (pCel.length==8 && !isNaN(pCel)){
        valida=true;
    }
return valida;
}
function validarPass(pPass,pPass2){
    let valida=false;

    if (pPass.length>=6){
        let alfanumerico=true;
        let mayus=0;
        let minus=0;

        for (let pos=0; pos<pPass.length && alfanumerico;pos++){
                  //chequea que la letra sea mayúscula
            if (pPass.charCodeAt(pos)>=65 && pPass.charCodeAt(pos)<=90){ 
                mayus++;
            }
            if (pPass.charCodeAt(pos)>=97 && pPass.charCodeAt(pos)<=122){
                minus++;
            }

            // lo primero que chequea son los números de la tabla               ahora chequea las mayúsculas
            if (((pPass.charCodeAt(pos))>=48 && (pPass.charCodeAt(pos))<=57) || ((pPass.charCodeAt(pos))>=65 && (pPass.charCodeAt(pos))<=90) || ((pPass.charCodeAt(pos))>=97 && (pPass.charCodeAt(pos))<=122)){
            
            } else
            {
                alfanumerico=false;
            }
        }
        if (mayus>0 && minus>0 && alfanumerico){
            if (pPass==pPass2){
            valida=true;
            }
        }
    }
return valida;
}
function validarCamposVacios(pMail,pNombre,pApellido,pCel,pPass,pPass2){
    let valida=true;

    if (pMail=="" || pNombre=="" || pApellido=="" || pCel=="" || pPass=="" || pPass2==""){
        valida=false;
    }
    return valida;
}

function generarListaInmueblesAnfitrion(){
    for (let pos=0;pos<listaInmuebles.length;pos++){
        let unInmueble=listaInmuebles[pos];
        if (listaInmuebles[pos].propietario==usuarioLogueado){
            listaInmueblesAnfitrion.push(unInmueble);
        }   
    }
}
function buscarInmueble(texto){
    let unInmueble="";
    let encontrado=false;

    for (let pos=0; pos<listaInmuebles.length;pos++){
        unInmueble=listaInmuebles[pos];
        if (listaInmuebles[pos].titulo.includes(texto) ||  listaInmuebles[pos].ciudad.includes(texto) ||  listaInmuebles[pos].descripcion.includes(texto)  ){
            listaInmueblesBusqueda.push(unInmueble);
            encontrado=true;
        }
    }
    return encontrado
}






