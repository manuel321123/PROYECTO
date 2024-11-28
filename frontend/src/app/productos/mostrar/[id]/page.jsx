"use client"
import axios from "axios";
async function guardarProducto(e) {
    e.preventDefault();
    console.log("Función guardadr usuario");
    const url = "http://localhost:3000/producto/updateProducto";
    const datos = {
        id:document.getElementById("id").value,
        nombre:document.getElementById("nombre").value,
        precio:document.getElementById("precio").value,
        cantidad:document.getElementById("cantidad").value,
    }
    const respuesta = await axios.post(url,datos);
    console.log(respuesta);
    location.replace("/productos/mostrar")
}
export default async function Nuevo({params}) {
    var url = await fetch(`http://localhost:3000/producto/buscarPorId/${params.id}`);
    if(url.ok) {
        console.log(url);
        var producto = await url.json();
        return (
            <div className="m-0 row justify-content-center">
                <form className="text-center col-6 mt-5" action="" onSubmit={guardarProducto}>
                    <div className="card">
                        <div className="card-header">
                            <h1>Editar producto</h1>
                        </div>
                        <div className="card-body">
                            <input type="text" className="form-control mb-3" style={{height:"50px"}} id="id" value={producto.id} placeholder="ID"/>
                            <input type="text" className="form-control mb-3" style={{height:"50px"}} id="nombre" defaultValue={producto.nombre} placeholder="Nombre" autoFocus/>
                            <input type="text" className="form-control mb-3" style={{height:"50px"}} id="precio" defaultValue={producto.precio} placeholder="Precio"/>
                            <input type="text" className="form-control" style={{height:"50px"}} id="cantidad" defaultValue={producto.cantidad} placeholder="Cantidad"/>
                        </div>
                        <div className="card-footer">
                            <button style={{height:"50px"}} className="btn btn-primary col w-100">Guardar cambios</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
};