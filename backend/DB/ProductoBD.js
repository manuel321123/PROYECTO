const {productoDB} = require("./Conexion");
const Producto = require("../class/Producto");

function validar(producto){
    var validar = false;
    if (producto.nombre != undefined && producto.cantidad != undefined && producto.precio != undefined) {
        validar = true;
    }
    return validar;
}
async function mostrarProducto(){
    const productos = await productoDB.get();
    productosValidos = [];
    productos.forEach(producto => {
        const producto1 = new Producto({id:producto.id, ...producto.data()});
        if(validar(producto1.datos)){
            productosValidos.push(producto1.datos);
        }
    });
    return productosValidos;
}
async function buscarPorIdProduct(id) {
    var productoValidado;
    const producto = await productoDB.doc(id).get();
    const producto1 = new Producto({id:producto.id, ...producto.data()});
    if (validar(producto1.datos)) {
        productoValidado = producto1.datos;
    }
    return productoValidado;
}
async function nuevoProducto(data) {
    const producto1 = await new Producto(data);
    var productoValidado = {};
    var productSave = false;
    if(validar(producto1.datos)){
        productoValidado = producto1.datos;
        await productoDB.doc().set(productoValidado);
        productSave = true;
    }
    return productSave;
}
async function updateProductos(data) {
    var productoAct=false;
    if(await buscarPorId(data.id)!=undefined) {
        productoDB.doc(data.id).update({nombre:data.nombre});
        productoDB.doc(data.id).update({cantidad:data.cantidad});
        productoDB.doc(data.id).update({precio:data.precio});
        productoAct = true;
    }
    return productoAct;
}
async function borrarProducto(id) {
    var productoErrease = true;
    if(await buscarPorId(id) != undefined){
        productoDB.doc(id).delete();
    }
    return productoErrease;
}

module.exports ={
    mostrarProducto,
    nuevoProducto,
    borrarProducto,
    updateProductos,
    buscarPorIdProduct
}