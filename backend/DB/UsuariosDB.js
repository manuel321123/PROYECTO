const {usuariosDB} = require("./Conexion");
const Usuario=require("../class/Usuario");
const {validarPassword, encriptarPassword}=require("../middlewares/funcionesPassword");

function validarUser(usuario) {
    var valido=false;
    if (usuario.nombre!=undefined&&usuario.usuario!=undefined&&usuario.password!=undefined) {
        valido=true;
    }
    return valido;
}

async function mostrarUsuarios() {
    const usuarios = await usuariosDB.get();
    usuariosValidos=[];
    usuarios.forEach(usuario => {
        const usuario1 = new Usuario({id: usuario.id,...usuario.data()});
        if (validarUser(usuario1.datos)) {
            usuariosValidos.push(usuario1.datos);
        }
    });
    return usuariosValidos;
}

async function buscarPorId(id){
    var usuarioValido;
    //En el putno doc vienen los id, con esto filtramos el
    const usuario=await usuariosDB.doc(id).get();
    const newusario=new Usuario({id:usuario.id,...usuario.data()});
    if(validarUser(newusario.datos)) {
        usuarioValido=newusario.datos;
    }
    //console.log(usuarioValido);
    return usuarioValido;
}

async function login(usuario, password, req) {
    //Cuando se busca con cualquier dato que no sea id, se utiliza el where("campo","operador",valor)
    const usuarioEncontrado = await usuariosDB.where("usuario","==",usuario).get();
    var usuarioV={
        usuario:"anonimo",
        tipoUsuario:"sin acceso",
    };
    if(usuarioEncontrado.size>0){
        usuarioEncontrado.forEach(element => {
            //console.log(element.data());
            const passwordValido=validarPassword(password,element.data().salt, element.data().password);
            if(passwordValido){
                usuarioV.usuario=element.data().usuario;
                if (element.data().tipoUsuario=="usuario") {
                    req.session.usuario=usuarioV.usuario;
                    usuarioV.tipoUsuario="usuario";
                }else if(element.data().tipoUsuario=="admin"){
                    req.session.admin=usuarioV.usuario;
                    usuarioV.tipoUsuario="admin";
                }
            }
        });
    }
    return usuarioV;
}

function getSesionUsuario(req) {
    var activo=false;
    if (req.session.usuario!=undefined||req.session.admin!=undefined){
        activo=true;
    }
    return activo;
}

function getSesionAdmin(req) {
    var activo=false;
    if (req.session.admin!=undefined){
        activo=true;
    }
    return activo;
}

async function nuevoUsuario(data){//aqui llega el password
    //console.log("asdhiuahdfouia _______--------");
    //console.log(data);
    
    const {hash, salt} = encriptarPassword(data.password);
    data.password=hash;
    data.salt=salt;
    data.tipousuario="usuario";
    const usuario1 = await new Usuario(data);
    //console.log(usuario1.datos);
    
    var usuarioValido={};
    var usuarioGuardado=false;
    if(validarUser(usuario1.datos)) {
        usuarioValido=usuario1.datos;

        await usuariosDB.doc().set(usuarioValido);
        usuarioGuardado=true;
    }
    //console.log(usuarioValido);
    return usuarioGuardado;
}

async function updateUsuarios(data) {
    var usuariosAct=false;
    console.log(data);
    if(await buscarPorId(data.id)!=undefined) {
        usuariosDB.doc(data.id).update({nombre:""+data.nombre});
        usuariosDB.doc(data.id).update({usuario:""+data.usuario});
        usuariosAct = true;
    }
    return usuariosAct;
}

async function borrarUsuario(id) {
    var usuarioBorrado=false;
    if (await buscarPorId(id)!=undefined) {
        usuariosDB.doc(id).delete();
        usuarioBorrado=true;
    }
    return usuarioBorrado;
}

module.exports = {
    mostrarUsuarios,
    nuevoUsuario,
    updateUsuarios,
    borrarUsuario,
    buscarPorId,
    login,
    getSesionUsuario,
    getSesionAdmin
}