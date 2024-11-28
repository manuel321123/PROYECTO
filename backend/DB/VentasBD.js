const {ventaDB, usuariosDB} = require("./Conexion");
const Venta = require("../class/Venta");
var {fechaHora} = require("../middlewares/fecha");
var {mostrarProducto, updateProductos, buscarPorIdProduct} = require("./ProductoBD");

function validar(venta){
    var validar = false;
    if(venta.idUsuario!=undefined&&venta.idProducto!=undefined) {
        validar = true;
    }
    return validar;
}

async function mostrarVentas() {
    const ventas = await ventaDB.get();
    ventasValidas = [];
    ventas.forEach(venta => {
        const venta1 = new Venta({id:venta.id, ...venta.data()});
        if(validar(venta1.datos)) {
            ventasValidas.push(venta1.datos);
        }
    });
    return ventasValidas;
}

async function buscarPorId(id) {
    var ventaValida;
    const venta = await ventaDB.doc(id).get();
    const venta1 = new Venta({id:venta.id, ...venta.data()});
    if(validar(venta1.datos)) {
        ventaValida = venta1.datos;
    }
    return ventaValida;
}

async function nuevaVenta(data) {
    data.fecha = fechaHora().fecha+", "+fechaHora().hora+" UTC-6";
    data.estatus="Vendido";
    const venta1 = await new Venta(data);
    var ventaValida={};
    var ventaGuardada=false;
    if(validar(venta1.datos)) {
        ventaValida= venta1.datos;
        await ventaDB.doc().set(ventaValida);
        ventaGuardada= true;
    }
    return ventaGuardada;
}

async function updateVentas(data) {
    data.fechaA = fechaHora().fecha+", "+fechaHora().hora+" UTC-6";
    var ventaAct=false;
    if(await buscarPorId(data.id)!=undefined) {
        ventaDB.doc(data.id).update({estatus:"Vendido"});
        ventaDB.doc(data.id).update({fecha:data.fechaA});
        ventaDB.doc(data.id).update({idUsuario:data.idUsuario});
        ventaDB.doc(data.id).update({idProducto:data.idProducto});
        ventaDB.doc(data.id).update({cantidad:data.cantidad});
        ventaDB.doc(data.id).update({total:data.total});
        ventaAct = true;
    }
    return ventaAct;
}

async function upEstatusVentas(id) {
    var ventaAct=false;
    if(await buscarPorId(id)!=undefined) {
        ventaDB.doc(id).update({estatus:"Cancelado"});
        ventaAct = true;
    }
    return ventaAct;
}

async function borrarVenta(id) {
    var ventaBorrada=false;
    if(await buscarPorId(id)!=undefined) {
        ventaDB.doc(id).delete();
        ventaBorrada = true;
    }
    return ventaBorrada;
}

module.exports = {
    mostrarVentas,
    nuevaVenta,
    updateVentas,
    buscarPorId,
    upEstatusVentas,
    borrarVenta
}