const { log } = require("console");
const crypto=require("crypto");

function encriptarPassword(password) {
    const salt = crypto.randomBytes(32).toString("hex");
    //console.log(salt);
    const hash = crypto.scryptSync(password, salt, 10000, 64, "sha512").toString("hex");
    //console.log(hash);
    return {
        salt,
        hash
    }
}

function validarPassword(password, salt, hash) {
    //console.log(password);
    //console.log(salt+"\n");
    //console.log(hash);
    const hashEvaluar = crypto.scryptSync(password, salt, 10000, 64, "sha512").toString("hex");
    //Se pueden hacer comparaciones directas sin requerir de la funcion condicional (if, switch)
    //console.log(5==3);
    return hashEvaluar == hash;
}

function usuarioAutorizado(req, res, cb){
    // Lógica futura para actualizar un usuario
    var usuarioAutorizado=false;
    if(req.session.usuario) {
        console.log("Usuario Autorizado");
        usuarioAutorizado = true;
    }    

    return usuarioAutorizado;
}

function adminAutorizado(req, res, cb){
    // Lógica futura para verificar permisos de administrador
    var adminAutorizado=false;
    if(req.session.admin) {
        console.log("Admin Autorizado");
        adminAutorizado = true;
    }

    return adminAutorizado;
}

module.exports = {
    encriptarPassword,
    validarPassword,
    usuarioAutorizado,
    adminAutorizado
}

//validarPassword();
//encriptarPassword("abc");