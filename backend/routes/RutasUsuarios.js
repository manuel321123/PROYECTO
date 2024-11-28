var rutas = require("express").Router();
var {mostrarUsuarios,borrarUsuario,updateUsuarios,buscarPorId,nuevoUsuario, login, getSesionUsuario, getSesionAdmin} = require("../DB/UsuariosDB");
//Aqui solo pedimos la funcion del router sin llamar a todo express
//var {Router} = require("express");

rutas.get("/",async (req,res)=>{
    //res.send("Hoal estas en la raiz");
    var usuariosValidos = await mostrarUsuarios();
    //console.log(usuariosValidos);
    res.json(usuariosValidos);
});

rutas.get("/buscarPorId/:id",async (req,res)=>{
    var usuarioValido = await buscarPorId(req.params.id);
    res.json(usuarioValido);
});

rutas.post("/nuevoUsuario",async(req,res)=>{
    var usuarioGuardado = await nuevoUsuario(req.body);
    res.json(usuarioGuardado);
});

rutas.post("/updateUsuario",async(req,res)=>{
    console.log(req.body);
    var usuarioGuardado = await updateUsuarios(req.body);
    res.json(usuarioGuardado);
});

rutas.delete("/borrarUsuario/:id",async (req,res)=>{
    var usuariBorrado = await borrarUsuario(req.params.id);
    res.json(usuariBorrado);
});

rutas.post("/login", async(req, res) => {
    const usuarioCorrecto = await login(req.body.usuario,req.body.password,req);
    console.log("Login ------");
    console.log(usuarioCorrecto.usuario);
    console.log(usuarioCorrecto.password);
    res.json(usuarioCorrecto);
});

rutas.get("/getSesionUsuario", (req, res)=>{
    console.log("getSessionUsuario--------");
    console.log();
    
    res.json(getSesionUsuario(req));
});

rutas.get("/getSesionadmin", (req, res)=>{
    res.json(getSesionAdmin(req));
});

module.exports = rutas;