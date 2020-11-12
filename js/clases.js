class Usuario {
    constructor(pNombre,pApellido,pMail,pCel,pClave,pRol){
        this.nombre=pNombre;
        this.apellido=pApellido;
        this.mail=pMail;
        this.cel=pCel;
        this.clave=pClave;
        this.rol=pRol; 
    }
}
let ultimoCodigoInmueble=1;

class Inmueble {
    constructor(pTitulo,pCiudad,pDescripcion,pPrecio,pFoto1,pFoto2,pFoto3,pPropietario){
        this.titulo=pTitulo;
        this.ciudad=pCiudad;
        this.descripcion=pDescripcion;
        this.precio=pPrecio;
        this.foto1=pFoto1;
        this.foto2=pFoto2;
        this.foto3=pFoto3;
        this.listaCalificacion=[];
        this.listaComentarios=[];
        this.habilitado=true;
        this.codigoInmueble=ultimoCodigoInmueble;
        this.propietario=pPropietario;
        ultimoCodigoInmueble++;
    }
}
