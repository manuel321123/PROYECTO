const rutas = require("express").Router();
const {mostrarVentas, nuevaVenta, updateVentas, buscarPorId, borrarVenta, upEstatusVentas} = require("../DB/VentasBD");

rutas.get("/ventas", async (req, res) => {
    var ventasValidas = await mostrarVentas();
    res.json(ventasValidas);
});

rutas.get("/ventas/buscarPorId/:id", async (req, res) => {
    var ventaValida = await buscarPorId(req.params.id);
    res.json(ventaValida);
});

rutas.post("/ventas/nuevaVenta", async (req, res) => {
    var ventaNueva = await nuevaVenta(req.body);
    res.json(ventaNueva);
});

rutas.post("/ventas/updateVentas", async (req, res) => {
    var ventasUpdate = await updateVentas(req.body);
    res.json(ventasUpdate);
});

rutas.get("/ventas/upEstatusVentas/:id", async (req, res) => {
    var ventaUpdate = await upEstatusVentas(req.params.id);
    res.json(ventaUpdate);
});



module.exports = rutas;