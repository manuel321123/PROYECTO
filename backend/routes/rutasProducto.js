var rutas = require("express").Router();
var {mostrarProducto, nuevoProducto, borrarProducto, updateProductos, buscarPorIdProduct} = require("../DB/ProductoBD");

rutas.get("/productos",async (req, res)=>{
    var productosValidados = await mostrarProducto();
    res.json(productosValidados);
});

rutas.get("/producto/buscarPorId/:id", async (req, res)=>{
    var productoValido = await buscarPorIdProduct(req.params.id);
    res.json(productoValido);
});

rutas.post("/producto/nuevoProducto", async (req, res)=>{
    var saveProduct = await nuevoProducto(req.body);
    res.json(saveProduct);
});

rutas.post("/producto/updateProducto", async (req, res)=>{
    var saveProduct = await updateProductos(req.body);
    res.json(saveProduct);
});

rutas.delete("/producto/borrarProducto/:id", async(req, res)=>{
    var ereaseProduct = await borrarProducto(req.params.id);
    res.json(ereaseProduct);
});

module.exports = rutas;